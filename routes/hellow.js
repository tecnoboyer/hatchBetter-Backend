const { Router } = require('express');
const {hellow} = require ('../controllers/hellow')

const router = Router();

router.get('/', hellow )



module.exports = router;

