//requires
const router = require('express').Router(),
  path = require('path');

//route
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/assets/resume.pdf'));
});

module.exports = router;
