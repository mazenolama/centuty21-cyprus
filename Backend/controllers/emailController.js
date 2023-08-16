const valit = require('valit');
const nodemailer = require('nodemailer');
const {body, validationResult} = require('express-validator');
const Email = require('../models/Email');

const emailSchema = { 
    from: valit.createField(valit.string,{required: true, min:3, max:50}),
    name: valit.createField(valit.string,{required: true, min:3, max:20}),
    phone_number: valit.createField(valit.string,{required: true, min:9, max:11}),
    message: valit.createField(valit.string,{required: true, min:3, max:200}),
}

// Email Transporter
const transporter = nodemailer.createTransport({
    host:'sandbox.smtp.mailtrap.io',
    port: 465,
    secure: false,
    auth: {
        user: '4d7e536313e3fe',
        pass: '7888fa5535d9f6'
    }
});

//Valiedate Email
exports.validateEmail = [
    body('from').trim().isEmail().withMessage('Invalid Email').normalizeEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            const errorMsg = errors.array()[0].msg;
            return res.status(400).json({message: errorMsg});
        }
        next();
    }
]

exports.sendEmail = async (req, res, next) => {
    let {from, name, phone_number, message} = emailData = req.body;

    const errors = valit.validate(emailData, emailSchema)
    if(Object.keys(errors).length > 0 ) {
        const errorMsg = errors[Object.keys(errors)[0]];
        return res.status(400).send({message: errorMsg})
    }

    const maailOptions = {
        from:  `${name} <${from}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: 'New Email Sent',
        html: `
            <h3>${message}</h3>
            <p>Best Regrads</p>
            <p>${name}</p>
            <p>${phone_number}</p>
        `
    }

    transporter.sendMail(maailOptions, (err, info) => {
        if(err){
            console.log(err);
            return res.status(500).json({result:'fail', message: 'Fail To Send Email'});
        }
        else{
            next();
        }
    })
    
}

exports.saveEmail = async (req, res) => {
    let emailData = {from, name, phone_number, message} = req.body;
    emailData.to = process.env.EMAIL_RECEIVER;
    try{
        const newEmail = new Email(emailData);
        await newEmail.save();
        return res.status(200).json({result:'success', message: 'Email Saved Successfully'});
    }
    catch(err){
        return res.status(401).json({result:'fail', message: 'Fail To Save Email'});
    }
}