const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  date: {type: Date, required: true},
  category: String,
}, {
  timestamps: true
});

module.exports = mongoose.Model("Task", taskSchema);