const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('../DB/db')
const userRoute = require('./controller/authUser')

connectDB()

require('dotenv').config({
    path: '../DB/config.env'    
})

const app = express()
const port = 5001;
app.use(express.json())
app.use(cors())
app.use("/api/user", userRoute)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
}

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV}`)
    console.log(`Up and Running on port ${port} - This is User service`);
})