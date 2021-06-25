const employerModel = require('../Model/employer.model')
const jobModel = require('../Model/job.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

// const mailer = require('../helper/mailer');

// const { authenticator, totp } = require('otplib');

// const secret = "Iamtheadmin";

// const otp = totp.generate(secret);

// const isValid = totp.check(otp, secret);

module.exports = {
    "signUpController": (req, res, next) => {

        let employer;

        bcrypt.hash(req.body.employerPassword, 10).then((result) => {
            employer = new employerModel({
                companyName: req.body.companyName,
                officalEmail: req.body.officalEmail,
                employerPassword: result,
                mobileNo: req.body.mobileNo,
                contactPersonName: req.body.contactPersonName,
                companyType: req.body.companyType,
                pincode: req.body.pincode,
                GSTIN: req.body.GSTIN
            });

            employer.save().then(result => {
                // console.log(result);
                res.status(200).json({
                    id: result._id,
                    message: "Account created"
                });
            }).catch(err => {
                // console.log(err);
                if (err.name == 'ValidationError') {
                    res.status(422).json({
                        message: "Account already exist!!!"
                    });
                } else {
                    res.status(400).json({
                        message: "Oops...Something went wrong!!!"
                    });
                }
            });

        }).catch((err) => {
            res.status(400).json({
                message: "Oops..Something went wrong!!!"
            });
        });
    },
    "loginController": async(req, res, next) => {

        const username = req.body.username;
        const password = req.body.password;

        employerModel.findOne({ "officalEmail": username }).then(result => {

            if (!result) return res.status(401).json({
                message: "Invalid User"
            })

            const userId = result._id

            bcrypt.compare(password, result.employerPassword).then(result => {
                return res.status(200).json({
                    "message": "Authorized User",
                    userId
                });
            }).catch(err => {
                return res.status(400).json({
                    message: "Invalid password!!!"
                });

            });
        }).catch(err => {
            return res.status(401).json({
                message: "Account not exist!!!"
            });
        });
    },
    "fetchEmployer": (req, res, next) => {
        const id = req.params.id
        employerModel.findById({ _id: id }).then(result => {

            const { companyName, officalEmail, mobileNo, contactPersonName, companyType, pincode, GSTIN } = result
            const data = {
                companyName,
                officalEmail,
                mobileNo,
                contactPersonName,
                companyType,
                pincode,
                GSTIN
            }
            res.status(200).json({
                data
            })
        }).catch(err => {
            res.status(404).json({
                message: "Details Found!!!"
            })
        })
    },
    "updateEmployer": (req, res, next) => {
        const id = req.params.id
        console.log(id)
        console.log(req.body)
        employerModel.findByIdAndUpdate(id, {
            $set: {
                companyName: req.body.companyName,
                officalEmail: req.body.officalEmail,
                employerPassword: req.body.employerPassword,
                mobileNo: req.body.mobileNo,
                contactPersonName: req.body.contactPersonName,
                companyType: req.body.companyType,
                pincode: req.body.pincode,
                GSTIN: req.body.GSTIN
            }
        }, {
            useFindAndModify: false,
            new: true
        }, (err, doc, response) => {
            if (err) {
                return res.status(400).json({
                    message: "Profile update failed...Try again"
                })
            }

            if (doc) {
                res.status(200).json({
                    message: "Profile Updated!!!"
                })
            }

        })
    },
    "addJobPost": (req, res, next) => {
        const companyName = req.body.companyName
        const employerId = req.body.employerId
        const jobCategory = req.body.jobCategory
        const jobDescription = req.body.jobDescription
        const jobTitle = req.body.jobTitle
        const jobType = req.body.jobType
        const location = req.body.location
        const vacancies = req.body.vacancies
        const salary = req.body.salary

        const job = new jobModel({
            companyName: companyName,
            employerId: employerId,
            jobCategory: jobCategory,
            jobDescription: jobDescription,
            jobTitle: jobTitle,
            jobType: jobType,
            salary: salary,
            location: location,
            vacancies: vacancies
        });

        job.save().then(result => {
            console.log(result)
            res.status(200).json({
                message: "Job Posted...",
                result
            });
        }).catch(err => {
            res.status(400).json({
                message: "Something went wrong..."
            });
        })
    },
    "fetchJob": (req, res, next) => {
        const employerId = req.query.employerId
        jobModel.find({ employerId: employerId }).then(data => {
            const result = {
                id: data._id,
                companyName: data.companyName,
                employerId: data.employerId,
                jobCategory: data.jobCategory,
                jobDescription: data.jobDescription,
                jobTitle: data.jobTitle,
                jobType: data.jobType,
                location: data.location,
                salary: data.salary,
                vacancies: data.vacancies
            };

            res.status(200).json({
                data
            });
        }).catch(err => {
            res.status(400).json({
                message: "Something went wrong"
            })
        })
    },
    "updateJob": (req, res, next) => {
        const id = req.body.id
        const companyName = req.body.companyName
        const employerId = req.body.empId
        const jobCategory = req.body.jobCategory
        const jobDescription = req.body.jobDescription
        const jobTitle = req.body.jobTitle
        const jobType = req.body.jobType
        const location = req.body.location
        const vacancies = req.body.vacancies
        const salary = req.body.salary

        jobModel.findOneAndUpdate({ _id: id }, {
            $set: {
                companyName: companyName,
                employerId: employerId,
                jobCategory: jobCategory,
                jobDescription: jobDescription,
                jobTitle: jobTitle,
                jobType: jobType,
                salary: salary,
                location: location,
                vacancies: vacancies
            }
        }).then(result => {
            res.status(200).json({
                result,
                message: "Updated Successfully"
            })
        }).catch(err => {
            res.status(400).json({
                message: "Something went wrong!!!"
            })
        })
    },
    "deleteJob": (req, res, next) => {
        const id = req.body.id
        console.log(id)
        const employerId = req.body.empId
        jobModel.deleteOne({ _id: id }).then(result => {
            res.status(200).json({
                result,
                message: "Deleted Successfully"
            })
        }).catch(err => {
            res.status(400).json({
                message: "Oops..Something went wrong!!!"
            })
        })
    },
    "getDetails": (req, res, next) => {
        employerModel.find({}).then(result => {
            res.status(200).json({
                result
            })
        }).catch(err => {
            res.status(400).json({
                message: "Oops...Something went wrong!!!"
            })
        })
    }
}