app.controller('reposController', function($scope, gitHubService) {
  var vm = this;
  console.log('reposController');

  $scope.populateRepos = function() {
    gitHubService.getRepos().then(response => {
      $scope.repos = response;
      console.log('repos', response);
    });

  }

});

// reposController.$inject = ['gitHubService']
