//requires
const router = require('express').Router(),
  path = require('path');

//route
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

module.exports = router;
