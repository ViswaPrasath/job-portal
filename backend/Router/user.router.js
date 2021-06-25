const express = require('express')
const multer = require('multer')
const router = express.Router()
const userControl = require('../Controller/user.controller')

const { verifyAccessToken } = require('../helper/jwt_helper')
const path = require('path')
const fs = require('fs')

const FILE_TYPE = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/pdf": ".pdf"
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './cvFiles')
    },
    filename: (req, file, cb) => {
        let ext = FILE_TYPE[file.mimetype]
        let name = file.originalname.split(' ').join('_')
        let filename = name.split('.')[0]

        cb(null, filename + '-' + Date.now() + ext)
    }
})

let cvUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    }
})

router.post('/signUp', userControl.signUpController)

router.post('/login', userControl.loginController)

router.post('/signUp/uploadCV', cvUpload.single('cv'), userControl.uploadCV)

router.get('/singlecandidate/:id', userControl.fetchUser)

router.post('/apply', verifyAccessToken, (req, res, next) => {
    res.send({
        message: "Applied Successfully!!!"
    })
})

router.get('/download/cv/:file', (req, res, next) => {
    console.log(req.params.file)
    const path1 = path.join(__dirname, '/../cvFiles/')
    console.log(path1)
    const file = path1 + req.params.file
    if (fs.existsSync(file)) {
        res.sendFile(file)
    } else {
        res.status(404).json({
            message: "File not found!!!"
        })
    }
})

router.post('/updateProfile/:id', userControl.updateProfile)
router.get('/getJob', userControl.getJob)
router.get('/getSingleJob', userControl.getSingleJob)
router.post('/apply4Job', userControl.apply4Job)
router.get('/getUsers', userControl.getUsers)

module.exports = router