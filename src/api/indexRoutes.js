const router = require('express').Router();

router.use('/graduates', require('./fgc_people/routes'));

app.get('/health', (req, res) => {
  res.send('OK!')
})

module.exports = router;