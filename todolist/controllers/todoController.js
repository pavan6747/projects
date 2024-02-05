// controllers/todoController.js

const Todo = require('../models/todoModel'); // Assuming the model file is in the parent directory

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTodoById = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTodo = async (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input. Title and completed are required.' });
  }

  try {
    const newTodo = await Todo.create({
      title,
      completed,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTodoById = async (req, res) => {
  const todoId = req.params.id;
  const { title, completed } = req.body;

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input. Title and completed are required.' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTodoById = async (req, res) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
