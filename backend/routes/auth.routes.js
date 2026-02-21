require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sql = require('../database.js')

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password 
    let match = false
    const hash = await getHash(username)
    if (password === hash) {
        match = true
    }

        // get password from DB 
       // const match  = bcrypt.compare(password, hash)
    if (match) {
            const student_id = await getUser(username)
            const user = { student_id : student_id }
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            // STORE REFRESH TOKEN IN DB 
            return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken})
    }

    return res.status(404).send("Invalid Credentials")
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}

async function getUser(username) {
    const student_id = await sql `
        SELECT id
        FROM students
        WHERE username=${username}`
    const clean_id = student_id[0]['id']
    console.log(clean_id) 
    return clean_id
}

async function getHash(username) {
    const hash = await sql `
        SELECT password
        FROM students
        WHERE username=${username}`
    const cleaned_hash = hash[0]['password']
    return cleaned_hash
}

module.exports = router