const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/jobSeeker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected...");
    }).catch((err) => {
        console.log("Database not connected...");
        console.log("message :" + err.message);
    });
}