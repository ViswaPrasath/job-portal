const mongoose = require('mongoose');

const companyTypeSchema = mongoose.Schema({
    type: { type: String, required: true }
})

module.exports = mongoose.model("company_types", companyTypeSchema);