const router = require('express').Router();

const controller = require('./controllers');

router.get('/', controller.getAllData);

module.exports = router;

