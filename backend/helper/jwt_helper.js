const JWT = require('jsonwebtoken')

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(new Error('Bad Request!!!'))
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const accessToken = bearerToken[1]

        const accessSecret = process.env.ACCESS_TOKEN_SECRET
        JWT.verify(accessToken, accessSecret, (err, payload) => {
            if (err) {
                return next(new Error('Invalid Token'))
            }
            req.payload = payload
            next()
        });
    }

}