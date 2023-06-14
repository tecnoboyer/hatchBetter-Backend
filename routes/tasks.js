const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();
const { 
    tasksPost,
    tasksGet,
    tasksDelete,
    tasksPut } = require('../controllers/tasks');

router.post('/', tasksPost );
router.get('/', tasksGet );
router.delete('/', tasksDelete );
router.put('/', tasksPut );




// router.put('/:id',tasksPut );



module.exports = router;