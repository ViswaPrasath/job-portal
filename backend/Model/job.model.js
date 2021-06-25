const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    employerId: { type: String, required: true },
    jobCategory: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobType: { type: String, required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    vacancies: { type: String, required: true }
});


module.exports = mongoose.model("job", jobSchema);