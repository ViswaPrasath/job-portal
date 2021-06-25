const bcrypt = require('bcrypt')
const createError = require('http-errors')

const userModel = require('../Model/user.model')
const jobModel = require('../Model/job.model')
const employerModel = require('../Model/employer.model')
const mail = require('../helper/mailer')

var multer = require('multer')
var cvUpload = multer().single('cv')

exports.signUpController = (req, res, next) => {
    console.log(req.body)
    let user;
    if (!req.body.password) return next(new createError.UnprocessableEntity())

    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        user = new userModel({
            name: req.body.name,
            password: hashedPassword,
            DOB: req.body.DOB,
            jobTitle: req.body.jobTitle,
            gender: req.body.gender,
            description: req.body.description,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            education: req.body.education,
            skill: req.body.skill,
            socialLinks: req.body.socialLinks,
            cv: null
        });

        user.save().then((result) => {
            res.status(200).json({
                userId: result._id,
                message: "Account Created!!!"
            })
        }).catch(err => {
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
    })
}

exports.uploadCV = (req, res, next) => {

    const userid = req.query.userId;
    let url = req.protocol + '://' + req.get('host');

    if (req.file) {
        url += '/cvFiles/' + req.file.filename;
        userModel.findByIdAndUpdate(userid, { cv: url }, { new: true, useFindAndModify: false }).then(result => {
            res.status(200).json({
                status: 200,
                message: "File Uploaded!!!"
            });
        }).catch(err => {
            res.status(504).json({
                status: 500,
                message: "Bad Request!!!"
            })
        });
    } else {
        res.status(422).json({
            status: 422,
            message: "file not found"
        })
    }

}

exports.loginController = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    userModel.findOne({ "email": username }).then(result => {

        if (!result) return res.status(401).json({
            message: "Invalid User"
        })

        const userId = result._id

        bcrypt.compare(password, result.password).then(result => {
            return res.status(200).json({
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
}

exports.fetchUser = (req, res, next) => {
    userModel.findById({ _id: req.params.id }).then(result => {
        const { name, DOB, jobTitle, gender, description, email, phoneNo, address, education, skill, socialLinks, cv } = result
        let edu = []
        for (let index = 0; index < education.length; index++) {
            const title = education[index].title;

            let institute = '';
            if (education[index].institute)
                institute = education[index].institute
            else
                institute = ""

            const degree = education[index].degree;
            const year = education[index].year;

            const data = {
                title,
                institute,
                degree,
                year
            }
            edu.push(data)
        }

        let skills = []
        for (let index = 0; index < skill.length; index++) {
            const technology = skill[index].technology
            const percentage = skill[index].percentage
            const data = {
                technology,
                percentage
            }
            skills.push(data)
        }

        const data = {
            name,
            DOB,
            jobTitle,
            gender,
            description,
            email,
            phoneNo,
            address,
            education: edu,
            skill: skills,
            socialLinks,
            cv
        }
        res.status(200).json({
            data
        })
    }).catch(err => {
        res.status(401).json({
            message: "user not found!!!"
        })
    })

}

exports.updateProfile = (req, res, next) => {
    // console.log(req.params.id)
    // console.log(req.body)
    userModel.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            DOB: req.body.DOB,
            jobTitle: req.body.jobTitle,
            gender: req.body.gender,
            description: req.body.description,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            education: req.body.education,
            skill: req.body.skill,
            socialLinks: req.body.socialLinks
        }
    }, {
        useFindAndModify: false,
        new: true
    }, (err, doc, response) => {
        if (err) {
            return res.status(400).json({
                message: "Something went wrong...Try again"
            })
        }
        if (doc) {
            res.status(200).json({
                message: "Profile Updated"
            })
        }

    })

}

exports.getJob = (req, res, next) => {
    const pageSize = +req.query.jobPerPage;
    const page = +req.query.currentPage;
    const jobQuery = jobModel.find();
    let fetchedPost;
    if (pageSize && page) {
        jobQuery.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
    }
    jobQuery.find()
        .then(documents => {
            fetchedPost = documents;
            return jobModel.estimatedDocumentCount();
        })
        .then(count => {
            res.status(200).json({
                message: "Job sent successfully",
                jobs: fetchedPost,
                maxPost: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong, try again"
            })
        });
}

exports.getSingleJob = (req, res, next) => {
    const userId = req.query.candidateId;
    const jobId = req.query.jobId;

    jobModel.findById(jobId).then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(400).json({
            message: "Oops...Something went wrong!!!"
        })
    })
}

exports.apply4Job = async(req, res, next) => {
    const employerId = req.body.employerId
    const userId = req.body.userId
    const jobId = req.body.jobId
    let employerEmail
    let userEmail
    let message
    let education
    let skill

    await employerModel.findById(employerId).then(result => {
        const employerEmail = result.officalEmail;
    }).catch(err => {
        return res.status(400).json({
            "message": "Oops...Something went wrong"
        })
    })

    await userModel.findById(userId).then(result => {
        userEmail = result.email
        education = result.education
        skill = result.skill
        message = `<strong>Name :</strong> ${result.name}<br>` +
            `<strong>Gender : </strong>${result.gender}<br>` +
            `<strong>Email : </strong>${result.email}<br>` +
            `<strong>Phone No : </strong> ${result.phoneNo}<br>` +
            `<strong>Address : </strong> ${result.address}<br>` +
            `<strong>Description : </strong> ${result.description}<br>` +
            `<hr><br><h1>Education</h1><br>`
        education.forEach(element => {
            message += `<strong>Title : </strong> ${element.title}<br> 
                        <strong>Institute : </strong> ${element.institute}<br> 
                        <strong>Degree : </strong> ${element.degree}<br> 
                        <strong>Year : </strong> ${element.year}<br>`
        })
        message += `<hr><br><h1>Skill</h1><br>`
        skill.forEach(ele => {
            message += `<strong>Technology : </strong> ${ele.technology}<br> 
            <strong>Level : </strong> ${ele.percentage}<br>`
        })
        message += `<br><hr><h1> Social Links </h1>` +
            `<strong>Facebook :</strong> ${result.socialLinks.facebook}<br>` +
            `<strong>Linked In :</strong> ${result.socialLinks.linkedIn}<br>` +
            `<strong>Instagram :</strong> ${result.socialLinks.instagram}<br>`
        message += `<a href=${result.cv}> DownLoad CV </a>`
    }).catch(err => {
        return res.status(400).json({
            "message": "Oops...Something went wrong"
        })
    })

    mail.sendMail("viswathedev@gmail.com", "viswaprasath10@gmail.com", message);
    // return res.status(200).json({
    //     employerId,
    //     userId,
    //     jobId
    // });
}



exports.getUsers = (req, res, next) => {
    userModel.find({}).then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(400).json({
            message: "Oops..something went wrong!!!"
        })
    })
}