const mongoose = require('mongoose')

module.exports = () => {
    const url = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
    mongoose.connect(url)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Not Connected", err))
}