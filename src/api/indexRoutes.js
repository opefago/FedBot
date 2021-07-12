const router = require('express').Router();

router.use('/graduates', require('./fgc_people/routes'));

router.get('/health', (req, res) => {
  res.send('OK!')
})

module.exports = router;