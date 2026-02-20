const express = require('express')
const app = express()

const authRoutes = require('./routes/auth.routes.js')
const studentRoutes = require('./routes/students.routes.js')
const teacherRoutes = require('./routes.teachers.routes.js')

app.use('/auth', authRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)

app.listen(7777, (err) => {
    if (err) return console.log('server failed')
    console.log("Server listening on port 7777")
})