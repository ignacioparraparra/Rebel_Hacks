require('dotenv').config()
const express = require('express')
const router = express.Router()

router.use(express.json())

const sql = require('../database.js')

// RETURN STUDENTS CHIP COUNT
router.get('/chips/:student_id', async (req, res) => {
    // GET STUDENTS CHIP COUNT FROM DB
    const {student_id} = req.params
    const chipCount = await getChipCount(student_id)
    return res.send({chipCount})
})

// CREATE CHIP TRANSACTION
router.post('/chips/:school_id/:student_id', async (req, res) => {
    const {school_id, student_id} = req.params
    const amount = req.body.amount

    await createChipTransaction(student_id, school_id, amount)

    return res.sendStatus(200)
})

router.get('/leaderboard/:school_id', async (req, res) => {
    try {
        const {school_id} = req.params

        const leaderboard = await getLeaderboard(school_id)

        const cleaned = leaderboard.map(student => ({
            ...student,
            total_chips: Number(student.total_chips)
        }))

        res.status(200).json(cleaned)

    } catch (err) {
        console.error(err)
        res.status(500).json({error:"Server error"})
    }
})

// SQL QUERY TO GET STUDENT LEADERBOARD
async function getLeaderboard(school_id) {
    const leaderboard = await sql `
        SELECT
            s.first_name,
            s.last_name,
            COALESCE(SUM(cl.amount), 0) AS total_chips
        FROM students s
        LEFT JOIN chip_ledger cl
            ON cl.student_id = s.id
        WHERE s.school_id = ${school_id}
        GROUP BY s.id
        ORDER BY total_chips DESC`
    return leaderboard
}

// SQL QUERY TO GET STUDENTS CHIP COUNT FROM DB
async function getChipCount(student_id) {
    const chipField = await sql `
        SELECT COALESCE(SUM(amount), 0) AS total_chips
        FROM chip_ledger
        WHERE student_id=${student_id}`
    const chipCount = chipField[0]["total_chips"]
    return chipCount
}

// SQL INSERTION TO CREATE CHIP TRANSACTION
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