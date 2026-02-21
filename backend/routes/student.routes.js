require('dotenv').config()
const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlware/auth.middleware.js')
router.use(express.json())

const sql = require('../database.js')


// RETURN STUDENTS CHIP COUNT
router.get('/chips', authenticateToken, async (req, res) => {
    // GET STUDENTS CHIP COUNT FROM DB
    const student_id = req.student_id
    console.log(student_id)
    const chipCount = await getChipCount(student_id)
    return res.send({chipCount})
})

// SQL QUERY TO GET STUDENTS CHIP COUNT FROM DB
async function getChipCount(student_id) {
    const chipField = await sql `
        SELECT COALESCE(SUM(amount), 0) AS total_chips
        FROM chip_ledger
        WHERE student_id=${student_id}`
    const chipCount = chipField[0]["total_chips"]
    return chipCount
}

// SQL QUERY TO GET STUDENTS NAME 
async function getStudent(student_id) {
    const name = await sql `
        SELECT first_name
        FROM students
        WHERE id=${student_id}`
    const first_name = name[0]['first_name']
    return first_name
}

module.exports = router