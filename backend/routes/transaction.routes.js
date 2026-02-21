require("dotenv").config();
const express = require("express");
const router = express.Router();

router.use(express.json());

const sql = require("../database.js");
const SCHOOL_ID = 2;

// CREATE CHIP TRANSACTION
router.post("/chips/:student_id", async (req, res) => {
  const { student_id } = req.params;
  const { amount } = req.body;

  try {
    const db_id = await sql`
      SELECT id FROM students
      WHERE student_id = ${student_id} AND school_id = ${SCHOOL_ID}`;

    if (!db_id.length)
      return res.status(404).json({ message: "Student not found" });

    await createChipTransaction(db_id[0].id, SCHOOL_ID, amount);
    return res.status(200).json({ chips_added: amount });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Transaction failed" });
  }
});



// GET ALL TRANSACTIONS FOR A SPECIFIC STUDENT
router.get("/chips/:student_id", async (req, res) => {
  const { student_id } = req.params;

  try {
    const transactions = await getStudentTransactions(student_id);
    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

async function createChipTransaction(student_id, school_id, amount) {
  await sql`
        INSERT INTO chip_ledger (
            student_id,
            school_id,
            amount)
            VALUES (
            ${student_id},
            ${school_id},
            ${amount})`;
}

async function getStudentTransactions(student_id) {
  const transactions = await sql`
        SELECT
            id,
            student_id,
            school_id,
            amount,
            event_type,
            event_date
        FROM chip_ledger
        WHERE student_id = ${student_id}
        ORDER BY event_date DESC`;
  return transactions;
}

module.exports = {
  router,
  createChipTransaction,
  getStudentTransactions,
};
