require('dotenv').config()
const jwt = require('jsonwebtoken')
/*
Takes Bearer Token from header and verifies if JWT is valid.
If valid, attach user details to req and go to next
*/
function authenticateToken(req, res, next) {
    // get Bearer : token from request header and store in token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    // We have a token, verify if valid
    // takes a callback with a error and the object we serialized
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.student_id = decoded.student_id
        next()
    } catch (err) {
        return res.status(403)
    }
}

module.exports = { authenticateToken }