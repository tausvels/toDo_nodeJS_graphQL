const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  date: {type: Date, required: true},
  category: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);
