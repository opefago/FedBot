const router = require('express').Router();

router.use('/graduates', require('./fgc_people/routes'));

module.exports = router;