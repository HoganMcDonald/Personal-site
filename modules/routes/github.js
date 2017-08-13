//requires
const router = require('express').Router(),
  request = require('request'),
  rpn = require('request-promise-native');

router.get('/', (req, res) => {
  res.send('success');
});


//exports
module.exports = router;
