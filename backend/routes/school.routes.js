require('dotenv').config()
const express = require('express')
const router = express.Router()
const multer = require("multer");
const {parse} = require("csv-parse/sync");
const fs = require("fs");
const { createChipTransaction: createChipTransaction } = require('./transaction.routes.js')

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

// UPLOAD CLASS DATA, student id, first_name, last_name, school_id, grade
router.post('/:school_id/roster', upload.single("roster"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.')
        }

        const csvText = fs.readFileSync(req.file.path, "utf-8")
        const records = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        })

        let inserted = 0;


        for (const row of records) {
            const student_id = Number(row.student_id)
            const first_name = String(row.first_name || "").trim()
            const last_name = String(row.last_name || "").trim()
            const grade = Number(row.grade)
            const school_id = Number(row.school_id)

            const username = `${first_name}${last_name}${student_id}`.toLowerCase()

            await createStudent(student_id, first_name, last_name, school_id, grade, username)
            inserted++
        }

        return res.json({ message: "Roster Processed", inserted })
    } catch (err) {
        return res.status(500).json({err:`Server error ${err}`})
    }
})

// UPLOAD ATTENDANCE DATA 
router.post('/:school_id/attendance', upload.single("roster"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send('No file uploaded.')
        }

        const csvText = fs.readFileSync(req.file.path, "utf-8")
        const records = parse(csvText, {
            columns: true,
            skip_empty_lines: true
        })

        let chipsAwarded = 0

        for (const row of records) {
            if (row.attendance === "present") {

                const id = await sql `
                    SELECT id
                    FROM students
                    WHERE student_id=${row.student_id}
                    `
                const cleaned_id = id[0]['id']
                const school_id = Number(row.school_id)
                await createChipTransaction(
                    cleaned_id,
                    school_id,
                    1
                )

                chipsAwarded += 1
            }
        }
        
        res.json({
            message: "Attendance Processed",
            total_chips_awarded: chipsAwarded
        })

    } catch (err) {
        return res.status(500).json({err:`Server error ${err}`})
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
    const leaderboard = await sql`
        SELECT
            first_name,
            last_name,
            total_chips,
            DENSE_RANK() OVER (ORDER BY total_chips DESC) AS rank
        FROM (
            SELECT
                s.id,
                s.first_name,
                s.last_name,
                COALESCE(SUM(cl.amount), 0) AS total_chips
            FROM students s
            LEFT JOIN chip_ledger cl
                ON cl.student_id = s.id
            WHERE s.school_id = ${school_id}
            GROUP BY s.id
        ) ranked
        ORDER BY total_chips DESC
    `
    return leaderboard
}

async function enrollSchool(school_name) {
    await sql ` 
        INSERT INTO schools (
            name)
            VALUES (
            ${school_name})`
}

async function createStudent(student_id, first_name, last_name, school_id, grade, username) {
    await sql `
        INSERT INTO students (
            student_id,
            first_name,
            last_name,
            grade,
            school_id,
            username)
            VALUES (
            ${student_id}, ${first_name}, ${last_name}, ${grade}, ${school_id}, ${username})`
}

module.exports = router