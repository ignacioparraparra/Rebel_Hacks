require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    const username = username
    const password = password 
    
    const user = { name : username }

    async function checkUser(user, password) {
        // get password from DB 
        const match  = bcrypt.compare(password, hash)

        if (match) {
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            // STORE REFRESH TOKEN IN DB 
        }
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}

module.exports = router