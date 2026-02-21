require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sql = require('../database.js')

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password 

    const student_id = await getUser(username)
    
    const user = { student_id : student_id }

        // get password from DB 
       // const match  = bcrypt.compare(password, hash)
    const match = true
    if (match) {
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            console.log(user.student_id)
            // STORE REFRESH TOKEN IN DB 
            return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

async function checkUser(user, password) {
        // get password from DB 
       // const match  = bcrypt.compare(password, hash)
        const match = true
        if (match) {
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            console.log(user.student_id)
            // STORE REFRESH TOKEN IN DB 
            return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
        }
}

async function getUser(username) {
    const student_id = await sql `
        SELECT id
        FROM students
        WHERE first_name=${username}`
    return student_id
}

module.exports = router