app.service('gitHubService', function($http) {
  let vm = this;

  vm.getRepos = function(repos) {
    return $http({
      url: '/github',
      method: 'GET',
      headers: {
        'requested_repos': repos
      }
    }).then(response => {
      return response.data;
    });
  }

});

// gitHubService.$inject = ['$http']
