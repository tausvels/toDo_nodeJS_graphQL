/**
 * Getting all the dependecies
 */
const User = require('../../models/User');
const Task = require('../../models/Task');

/**
 * The helper functions
 */

const taskFieldCondition = async taskIds => {
  try {
    const tasks = await Task.find( { _id: { $in: taskIds } });
    return tasks.map( task => {
      return transformFields(task);
    });
  } catch (err) {
    throw err;
  }
};

 const userFieldCondition = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdTask: taskFieldCondition.bind(this, user._doc.createdTask)
    }
  } catch (err) {
    
  }
 }

 const transformFields = argObj => {
   return {
     ...argObj._doc,
     _id: argObj.id,
     date: new Date(argObj._doc.date).toLocaleDateString(),
     creator: userFieldCondition.bind(this, argObj.creator)
   }
 }

module.exports = {
  transformFields
};