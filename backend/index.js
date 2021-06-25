const express = require('express')
const app = express() // inisitalized express

const cors = require('cors')
app.use(cors()) // enable cross-origin request 

const http = require('http')
const server = http.createServer(app) // created server instance

const dotenv = require('dotenv')
const multer = require('multer')

const userRouter = require('./Router/user.router') // importing user route 
const employerRouter = require('./Router/employer.route')
const adminRoute = require('./Router/admin.route')

const companyTypeModel = require('./Model/company_type.model')
require('./intiDB')() // database connection 
dotenv.config() // initialize env variable in .env file

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000

app.use('/user', userRouter) // handling user route
app.use('/employer', employerRouter)
app.get('/company_type', (req, res, next) => {
    companyTypeModel.find().then((result) => {
        let companyType = result
        res.status(200).json({
            type: companyType
        })
    }).catch(err => {
        res.status(400).json({
            message: "Something went Wrong!!!"
        })
    })
})

app.use('/admin', adminRoute)

app.use((err, req, res, next) => {

    const status = err.status || 500
    const message = err.message || "Internal Server Error"

    res.status(status).json({
        message
    })
})
server.listen(port, () => {
    console.log(`Server started at ${port}`)
})