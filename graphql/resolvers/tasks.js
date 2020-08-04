/**
 * Getting all the dependecies
 */
const User = require('../../models/User');
const Task = require('../../models/Task');
const { transformFields } = require('./helper');

module.exports = {

  getAllTasks: async () => {
    try {
      const allTasks = await Task.find();
      return allTasks.map( task => {
        return transformFields(task);
      });
    } catch (err) { 
      throw err;
    };
  },

  createTask: async (args, req) => {
    // Check authenticated
    if (!req.isAuth) {throw new Error( "Login to create a task!" )};
    let createdTask;
    const newTask = new Task({
      title: args.taskInput.title,
      description: args.taskInput.description,
      date: new Date(args.taskInput.date),
      category: args.taskInput.category,
      creator: req.userId
    });
    try {
      const result = await newTask.save();
      createdTask = transformFields(result);
      const creator = await User.findById(req.userId);
      if (!creator) { throw new Error ("Cannot create task because user not found"); };
      creator.createTask.push(newTask);
      await creator.save();
    } catch (err) {
      throw err;
    }
  },

  filterTasksBy: async () => {
    try {
      
    } catch (err) {
      
    }
  },

  updateTask: async () => {
    try {
      
    } catch (err) {
      
    }
  },

  deleteTask: async () => {
    try {
      
    } catch (err) {
      
    }
  }


};