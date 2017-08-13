app.service('gitHubService', function($http) {
  let vm = this;

  vm.getRepos = function() {
    return $http.get('/github').then(response => {
      return response.data;
    });
  }

});

// gitHubService.$inject = ['$http']
