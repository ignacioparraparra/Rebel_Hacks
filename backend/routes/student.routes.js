require("dotenv").config();
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlware/auth.middleware.js");
router.use(express.json());

const sql = require("../database.js");

// RETURN STUDENTS CHIP COUNT
router.get("/chips", authenticateToken, async (req, res) => {
  // GET STUDENTS CHIP COUNT FROM DB
  const student_id = req.student_id;
  const chipCount = await getChipCount(student_id);
  return res.send(chipCount);
});

// RETURN STUDENT DETAILS
router.get("/info", authenticateToken, async (req, res) => {
  try {
    const student_id = req.student_id;
    const student_info = await getStudent(student_id);
    return res.status(200).json(student_info);
  } catch (err) {
    return res.status(500);
  }
});

// SQL QUERY TO GET STUDENTS CHIP COUNT FROM DB
async function getChipCount(student_id) {
  const chipField = await sql`
        SELECT
            cl.student_id,
            COALESCE(SUM(CASE WHEN cl.amount > 0 THEN cl.amount ELSE 0 END), 0) AS lifetime_chips_earned,
            COALESCE(SUM(CASE WHEN cl.amount < 0 THEN -cl.amount ELSE 0 END), 0) AS lifetime_chips_spent,
            COALESCE(SUM(cl.amount), 0) AS current_balance
            FROM chip_ledger cl
            WHERE cl.student_id = ${student_id}
            GROUP BY cl.student_id`;
  const chipCount = chipField[0];
  return chipCount;
}

// SQL QUERY TO GET STUDENT + RANK
async function getStudent(student_id) {
  const result = await sql`
        SELECT
            id AS student_id,  -- add this
            first_name,
            last_name,
            school_id,
            grade,
            total_chips,
            rank
        FROM (
            SELECT
                s.id,
                s.first_name,
                s.last_name,
                s.school_id,
                s.grade,
                COALESCE(SUM(cl.amount), 0) AS total_chips,
                DENSE_RANK() OVER (
                    PARTITION BY s.school_id
                    ORDER BY COALESCE(SUM(cl.amount), 0) DESC
                ) AS rank
            FROM students s
            LEFT JOIN chip_ledger cl
                ON cl.student_id = s.id
            GROUP BY s.id
        ) ranked
        WHERE id = ${student_id}
    `;
  return result[0];
}

module.exports = router;
