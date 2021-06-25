const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employerSchema = mongoose.Schema({
    companyName: { type: String, require: true },
    officalEmail: { type: String, require: true, unique: true },
    employerPassword: { type: String, require: true },
    mobileNo: { type: String, require: true },
    contactPersonName: { type: String, require: true },
    companyType: { type: String, require: true },
    pincode: { type: String, require: true },
    GSTIN: { type: String }
});

employerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('employers', employerSchema);