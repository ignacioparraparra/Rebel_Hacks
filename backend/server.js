const express = require('express')
const app = express()

const authRoutes = require('./routes/auth.routes.js')
const studentRoutes = require('./routes/student.routes.js')
const schoolRoutes = require('./routes/school.routes.js')
const transactionRoutes = require('./routes/transaction.routes.js')

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/student', studentRoutes)
app.use('/school', schoolRoutes)
app.use('/transaction', transactionRoutes)

app.listen(7777, (err) => {
    if (err) return console.log('server failed')
    console.log("Server listening on port 7777")
})