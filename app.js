require('dotenv').config();

// Initialize Express
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// ConnectDB
const connectDB = require('./db/connect')

const productsRouter = require('./routes/products');

// Error handler middleware
const errorHandlerMiddleware = async(err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong' });
}

const notfoundHandlerMiddleware = (req, res) => res.status(404).send("Route not found");


// express json middleware
app.use(express.json());
app.use(cors());

//app routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});


app.use('/api/v1/products', productsRouter);

app.use(errorHandlerMiddleware);
app.use(notfoundHandlerMiddleware);

const port = process.env.PORT || 4000;

//  Start function

const start = async() => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server started on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();