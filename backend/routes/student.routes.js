require('dotenv').config()
const express = require('express')
const router = express.Router()

router.use(express.json())

const sql = require('../database.js')

// RETURN CHIP COUNT
router.get('/chips/:id', async (req, res) => {
    // GET STUDENTS CHIP COUNT FROM DB
    const user_id = req.params
    const chipCount = await getChipCount(user_id)
    return res.send({chipCount})
})

// DEDUCT CHIPS 
router.get('/chips', (req, res) => {
    const chipDeduction = req.body.chipDeduction

    // GET CHIP COUNT FROM DB 
    // SUBTRACT CHIP COUNT FROM CHIP DEDUCTION

    // RETURN SUCCESS 
})

async function getChipCount(student_id) {
    const chipField = await sql `
        SELECT COALESCE(SUM(amount), 0) AS total_chips
        FROM chip_ledger
        WHERE student_id=${student_id}`
    const chipCount = chipField[0]["total_chips"]
    return chipCount
}

async function getStudent(student_id) {
    const name = await sql `
        SELECT first_name
        FROM students
        WHERE id=${student_id}`
    const first_name = name[0]['first_name']
    return first_name
}

module.exports = router