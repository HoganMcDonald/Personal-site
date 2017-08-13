//requires
const router = require('express').Router(),
  request = require('request'),
  rpn = require('request-promise-native');

// sends requested repos
router.get('/', (req, res) => {
  const reqRepos = req.headers.requested_repos.split(',');
  let reposToSend = [];
  // http options
  const options = {
    url: 'https://api.github.com/users/hoganmcdonald/repos',
    headers: {
      'Authorization': 'token ' + process.env.GITHUB_AUTH_TOKEN,
      'User-Agent': 'request'
    }
  }; // end http options
  rpn(options).then(response => {
    let repos = JSON.parse(response);
    for (var i = 0; i < repos.length; i++) {
      if (reqRepos.includes(repos[i].name)) {
        reposToSend.push(repos[i])
      }
      if (i === repos.length -1) {
        res.send(reposToSend);
      }
    }
  });
}); // end get requested repos


//exports
module.exports = router;
