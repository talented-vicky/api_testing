const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')

require('dotenv').config()
const db_url = process.env.db_url
const port_no = process.env.port_no

const cntrlRoute = require('./routes/controls');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


app.use(cntrlRoute)

mongoose.connect(db_url)
    .then( conn => {
        console.log("Connected to MongoDB")
        app.listen(port_no)
    })
    .catch( err => console.log(err))

    // "start": "node app.js",
    // "start:dev": "nodemon app.js"