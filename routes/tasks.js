const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();
const { 
    tasksPost,
    tasksPut } = require('../controllers/tasks');

router.post('/', tasksPost );

// router.put('/:id',tasksPut );



module.exports = router;