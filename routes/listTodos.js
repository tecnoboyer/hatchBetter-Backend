const { Router } = require('express');
const { hellow } = require('./hellow');

const router = Router();

router.get('/', hellow )



module.exports = router;