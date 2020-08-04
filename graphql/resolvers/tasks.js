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
      return allTasks.map( task => transformFields(task));
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
      creator.createdTask.push(newTask);
      await creator.save();
      return createdTask;
    } catch (err) {
      throw err;
    }
  },

  filterTasksBy: async args => {
    try {
      const allTasks = await Task.find({ category: args.filter.toLowerCase() });
      return allTasks.map( task => transformFields(task));
    } catch (err) {
      throw err;
    }
  },

  updateTask: async (args, req) => {
    if (!req.isAuth) {throw new Error( "Login to update a task!" )};
    const updatedFields = {
      title: args.updateTaskInput.title,
      description: args.updateTaskInput.description,
      date: new Date(args.updateTaskInput.date),
      category: args.updateTaskInput.category
    }
    try {
      const updatedTask = await Task.findOneAndUpdate( {_id: args.updateTaskInput._id}, updatedFields, {
        new: true,
        useFindAndModify: false
      });
      return transformFields(updatedTask);
    } catch (err) {
      throw err;
    }
  },

  deleteTask: async (args, req) => {
    if (!req.isAuth) {throw new Error( "Login to delete a task!" )};
    try {
      const taskToBeDeleted = await (await Task.findById(args.taskId)).populate('description');
      const result = transformFields(taskToBeDeleted);
      await Task.deleteOne( { _id: args.taskId } );
      return result;
    } catch (err) {
      throw err;
    }
  }

};