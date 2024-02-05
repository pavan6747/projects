// routes/todoRoutes.js

const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

// Define a route to get all todos
router.get('/todos', todoController.getAllTodos);

// Define a route to get a specific todo by ID
router.get('/todos/:id', todoController.getTodoById);

// Define a route to create a new todo
router.post('/todos', todoController.createTodo);

// Define a route to update a todo by ID
router.put('/todos/:id', todoController.updateTodoById);

// Define a route to delete a todo by ID
router.delete('/todos/:id', todoController.deleteTodoById);

module.exports = router;
