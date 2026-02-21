require('dotenv').config()
const express = require('express')
const router = express.Router()

router.use(express.json())

const sql = require('../database.js')

// CREATE CHIP TRANSACTION
router.post('/chips/:school_id/:student_id', async (req, res) => {
    const {school_id, student_id} = req.params
    const amount = req.body.amount

    await createChipTransaction(student_id, school_id, amount)

    return res.sendStatus(200)
})

async function createChipTransaction(student_id, school_id, amount) {
    await sql `
        INSERT INTO chip_ledger (
            student_id,
            school_id,
            amount)
            VALUES (
            ${student_id},
            ${school_id},
            ${amount})`
}

module.exports = router