const adminModel = require('../Model/admin.model')

module.exports = {
    "loginController": (req, res, next) => {
        console.log(req.body.username, req.body.password)
        adminModel.find({ username: req.body.username, password: req.body.password }).then(result => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                result,
                message: "Successfull login"
            })
        }).catch(err => {
            res.status(400).json({
                err,
                message: "Successfull login"
            })
        })
    }
}