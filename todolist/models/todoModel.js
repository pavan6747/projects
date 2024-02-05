// models/todoModel.js

const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
