const mongoose = require('mongoose');
const uniqueValidators = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    DOB: { type: String, require: true },
    jobTitle: { type: String, require: true },
    gender: { type: String, require: true },
    description: { type: String },
    email: { type: String, require: true, unique: true },
    phoneNo: { type: String, require: true },
    address: { type: String, require: true },
    education: [{
        title: { type: String, require: true },
        institute: { type: String, require: true },
        degree: { type: String, require: true },
        year: { type: String, require: true }
    }],
    skill: [{
        technology: { type: String, require: true },
        percentage: { type: Number, require: true }
    }],
    socialLinks: {
        facebook: { type: String, require: true },
        linkedIn: { type: String, require: true },
        instagram: { type: String, require: true }
    },
    cv: { type: String }
});

userSchema.plugin(uniqueValidators);

module.exports = mongoose.model('user', userSchema);