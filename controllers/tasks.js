const { response, request } = require('express');
const Task = require('../models/task');
const task = require('../models/task');
const { io } = require('../config/server');

const tasksPost = async(req, res = response,io) => {
    try {
      console.dir( io); 
        
        // io.emit('message', 'New task created');
        console.log('new post in progress...')
        const { description, status} = req.body;
        const task = new Task({ description, status });
        const per_done=await task.save();
        console.log(per_done);

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
      .sort({ updatedAt: -1 }) 
      .sort({ description: 1 }) 
      .limit(10) 
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

const tasksPut = async(req, res = response,io) => {
  try {
      // io.emit('message', 'Task updated');

      const {_id,status} =req.body

      Task.findByIdAndUpdate(
        {_id:_id},
        { status: !Boolean(status) },
        { new: true } // This option returns the updated document instead of the original one
      )
        .then(updatedTask => {
          if (updatedTask) {
            console.log('Task updated:', updatedTask);
            console.log('*   *   *');
          } else {
            console.log('Task not found');
          }
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });

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

module.exports = {
    tasksPost,
    tasksGet,
    tasksDelete,
    tasksPut,


}



