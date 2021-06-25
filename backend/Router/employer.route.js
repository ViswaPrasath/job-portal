const express = require('express')
const router = express.Router()
const employerController = require('../Controller/employer.controller')

router.post('/signUp', employerController.signUpController)

router.post('/login', employerController.loginController)

router.get('/singleemployer/:id', employerController.fetchEmployer)

router.post('/updateProfile/:id', employerController.updateEmployer)

router.post('/addJobPost', employerController.addJobPost)

router.get('/fetchJob', employerController.fetchJob)

router.post('/updateJob', employerController.updateJob)

router.post('/deleteJob', employerController.deleteJob)

router.get('/getDetails', employerController.getDetails)

module.exports = router;