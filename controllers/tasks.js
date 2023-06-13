const { response, request } = require('express');

const Task = require('../models/task');



const tasksPost = async(req, res = response) => {
    try {
        const { description } = req.body;
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
}

  





 
  
