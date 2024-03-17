require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnect')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT

// Connect to mongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors('https://e-commerce-web-store-server.onrender.com'));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
    res.json('Welcome ! Mohammed Bari web store')
});

app.use('/register', require('./routes/registerAdmin'));
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refreshToken'))
app.use('/logout', require('./routes/logout'))
app.use('/password', require('./routes/password'))
app.use('/account', require('./routes/account'))
app.use('/products', require('./routes/product'))
app.use('/orders', require('./routes/order'))

app.all('*', (req, res) => {
    res.status(404).json({ "error": "404 Not Found" })
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})