console.log('js');
let app = angular.module('myApp', []);

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

$(document).ready( () => {

  let faded = false;

  let fadeInScroll = setTimeout( () => {
    console.log('faded');
    faded = true;
    if (window.orientation !== 0) {
      $('nav').addClass('show');
    }
  }, 2000)

  $(window).on('scroll', () => {

    // cancel timeout
    clearTimeout(fadeInScroll);
    const bScroll = $('body').scrollTop();

    /*
    nav bar
    */
    $('nav').addClass('show');
    if (bScroll > $('nav').height() + 10) {
      $('nav').addClass('navVis');
    } else if (bScroll <= $('nav').height()) {
      $('nav').removeClass('navVis');
    }




  }); // end on scroll

  /*
  nav scrolls
  */
  function scrollToAnchor(id, num){
    $('body').removeClass('bodyFix');
    $('.body').removeClass('menuOpen');
    $('li').removeClass('selected');
    $('nav').removeClass('sideNaveOpen');
    $('#' + num).addClass('selected');
    var dest = $("#" + id);
    if (window.orientation === 0) {
      $('html, body').animate( {scrollTop: dest.offset().top - 90}, 400 );
    } else {
      $('html, body').animate( {scrollTop: dest.offset().top - 30}, 'slow' );
    }

  }

  $('li').on('click', function() {
    switch ($(this).attr('id')) {
      case '1':
        console.log(1);
        scrollToAnchor('home', 1);
        break;
      case '2':
        console.log(2);
        scrollToAnchor('projects', 2);
        break;
      case '3':
        console.log(3);
        scrollToAnchor('reading', 3);
        break;
      case '4':
        console.log(4);
        scrollToAnchor('links', 4);
        break;
      default:
        console.log('other');
        scrollToAnchor('home', 1);
    }
  });

  /*
  side nav
  */
  $('#menuIcon').on('click', () => {
    $('.body').toggleClass('menuOpen');
    $('body').toggleClass('bodyFix');
    $('#menuIcon').toggleClass('sideNaveOpen');
    $('nav').toggleClass('sideNaveOpen');
  });

}); // end document ready
