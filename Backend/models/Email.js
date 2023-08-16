const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    from: {required: true, type: String},
    to: {required: true, type: String},
    name: {required: true, type: String},
    phone_number: {required: true, type: String},
    message: {required: true, type: String},
    },
    {timestamps: true}
);

module.exports = Email = mongoose.model('email', emailSchema);