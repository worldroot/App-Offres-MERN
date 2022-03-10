const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./db/db')
let path = require('path');
const bodyParser = require('body-parser')
const authRoute = require('./controller/authUser')
const userRoute = require('./controller/user-service')
require('dotenv').config()
connectDB()

let app = express()
const port = process.env.PORT_USER_MS;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/access", authRoute)
app.use("/api/user", userRoute)

// Route to be tested
app.get('/test', (req, res) => {
    return res.status(200).json('Testing user-ms');
});

//404
app.use((res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../../Frontend/client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend/client", "build", "index.html"));
    });
}

let server =  app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is User service`);
})

module.exports  = server;