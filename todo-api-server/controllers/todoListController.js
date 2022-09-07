const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const todoListRepository = require('../repository/todoListRepository');

// Configuring body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/todolist/:todolistId', async function (req, res) {
  const todolistId = req.params.todolistId;

  console.debug(`getting todolist for key: ${todolistId}`);

  // Probably should try/catch and return a proper error code at this level
  try {
    const todolist = await todoListRepository.findById(todolistId);
    res.send(todolist);
  } catch (error) {
      res.statusCode = 400;
      res.send("Something went wrong with the request");
  }
});