const { response, request } = require('express');

const Task = require('../models/task');
const task = require('../models/task');

const tasksPost = async(req, res = response) => {
    try {
        const { description, status} = req.body;
        const task = new Task({ description, status });
        await task.save();

        res.status(200).json({ message: 'Request processed successfully' });
      } catch (error) {
        // Handling of Mongoose validation error
        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map((err) => err.message);
          return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Task unloaded, check client request ' });
      }

}

const tasksGet = async (req, res = response) => {
  try {
    const falseStatusTasks = await task.find({ status: false }).sort({ description: 1 }).exec(); //Are the ToDo
    const trueStatusTasks = await task.find({ status: true }) //Are the Done ones
      .sort({ description: 1 }) 
      .limit(5) 
      .exec();
    const tasks = [...falseStatusTasks, ...trueStatusTasks];
    res.status(200).json({ tasks });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: 'Task retrieval failed, check database connection' });
  }
};

const tasksDelete = async(req, res = response) => {
    try {
        console.log('tasksDelete');
        const taskfletch = await task.deleteMany();
        res.status(200).json({ message: 'Delete compleated' });
      } catch (error) {
        // Handling of Mongoose validation error
        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map((err) => err.message);
          return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Delete cracked, check database connection' });
      }
}

module.exports = {
    tasksPost,
    tasksGet,
    tasksDelete

}



