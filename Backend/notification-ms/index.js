const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./db/db')
const bodyParser = require('body-parser')
const notifRoute = require('./controller/notification-service')

require('dotenv').config()
connectDB()

const app = express()
const port = process.env.PORT_NOTIF_MS;

app.use(morgan('dev'))
app.use(express.json({limit: '50mb'}));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/notif", notifRoute)

//404
app.use((res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is Notification service`);
})