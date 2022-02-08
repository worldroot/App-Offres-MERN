const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./db/db')
const bodyParser = require('body-parser')
const authRoute = require('./controller/authUser')
const userRoute = require('./controller/user-service')
require('dotenv').config()
connectDB()

const app = express()
const port = process.env.PORT_USER_MS;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/access", authRoute)
app.use("/api/user", userRoute)

//404
app.use((res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is User service`);
})