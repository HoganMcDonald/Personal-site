app.controller('reposController', function($scope, gitHubService) {
  var vm = this;

  vm.repos =['Personal-site', 'capture-app', 'watson-machine-learning', 'pathFinding']

  $scope.populateRepos = function() {
    gitHubService.getRepos(vm.repos).then(response => {
      $scope.repos = response;
      console.log('repos', response);
    });

  }

});

// reposController.$inject = ['gitHubService']
