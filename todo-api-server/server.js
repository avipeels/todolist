require('dotenv').config();
const express = require('express');
const path = require('path');
var morgan = require('morgan')

// create "middleware"

const app = express();
const bodyParser = require('body-parser');
var logger = morgan('combined');

const port = 3000;

// const todoListController = require('./controllers/todoListController');

const todoListRepository = require('./repository/todoListRepository');

// Configuring body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(logger);

app.get('/todolist', function (req, res) {
    res.send('getting list of todos')
})

app.get('/todolist/:todolistId', async function (req, res) {
    const todolistId = req.params.todolistId;

    console.debug(`getting todolist for key: ${todolistId}`);

    // Probably should try/catch and return a proper error code at this level
    try {
        const todolist = await todoListRepository.findById(todolistId);
        res.send(todolist);
    } catch (error) {
        res.statusCode = 400;
        res.send(error);
        // res.send("Something went wrong with the request");
    }
})

// error handler
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({
            error: err,
        });
        return;
    }

    next();
});

app.listen(port, () => console.log(`Couchify Server listening on port ${port}!`));