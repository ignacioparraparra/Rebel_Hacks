const express = require('express')
const app = express()

app.listen(7777, (err) => {
    if (err) return console.log('server failed')
    console.log("Server listening on port 7777")
})