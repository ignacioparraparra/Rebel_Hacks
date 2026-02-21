require('dotenv').config()
const express = require('express')
const router = express.Router()
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });
router.use(express.json())

const sql = require('../database.js')

// CREATE SCHOOL ACCOUNT
router.post('/enroll/account', async (req, res) => {
    try {
        const school_name = req.body.school_name

        await enrollSchool(school_name)

        res.status(200).json(`${school_name} enrolled!`)
    } catch (err) {
        if (err.code === '23505') {
            console.error(err)
            return res.status(500).json({Error: "School already exists"})
        }
        console.error(err)
        res.status(500).json({error:"Server error"})
    }
})

// UPLOAD CLASS DATA, first_name, last_name, school_id, grade
router.post('/:school_id/roster', upload.single("roster"), async (req, res) => {
    try {
        const results = []

        fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(results);
            res.status(200).json({message: "File processed", rows: results.length})
        })
    } catch (err) {
        return res.status(500).json({err:"Server error"})
    }
})


// RETURN SCHOOL LEADERBOARD
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

async function enrollSchool(school_name) {
    await sql ` 
        INSERT INTO schools (
            name)
            VALUES (
            ${school_name})`
}

module.exports = router