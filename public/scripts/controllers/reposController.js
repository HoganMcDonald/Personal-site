app.controller('reposController', function($scope, gitHubService) {
  var vm = this;

  $scope.reposToGet =['Personal-site', 'capture-app', 'watson-machine-learning', 'pathFinding', 'polyglotapi', 'hoganmcdonald.github.io']

  $scope.populateRepos = function() {
    gitHubService.getRepos($scope.reposToGet).then(response => {
      $scope.repos = response;
    });

  }

});

// reposController.$inject = ['gitHubService']
