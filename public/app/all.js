console.log('js');
let app = angular.module('myApp', []);

app.service('gitHubService', function($http) {
  let vm = this;

  vm.getRepos = function() {
    return $http.get('/github').then(response => {
      return response.data;
    });
  }

});

// gitHubService.$inject = ['$http']

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

$(document).ready( () => {

  let faded = false;
  let scrollMemory = 0;

  let fadeInScroll = setTimeout( () => {
    faded = true;
    if (window.orientation === undefined) {
      $('.scroll').addClass('show');
      $('nav').addClass('show');
    }
  }, 1500)

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

    /*
    scroll hint
    */
    // if current scroll is greater than memory, reset memory
    if (bScroll > scrollMemory) {
      scrollMemory = bScroll;
    }
    // if current scroll passes threshold of 1/8 the window height
    if (bScroll > $(window).height() / 8) {
      // if '.scroll' has faded in
      if (faded) {
        $('.scroll').css( 'transition-duration', '0ms' );
        // if bScroll is  not < scrollMemory
        if (bScroll === scrollMemory) {
          $('.scroll').css( 'opacity', 1 - bScroll / $(window).height() );
        } // end check if current scroll is not less than memory
      } // end check if faded
    } // end check if current scroll is 1/8th window
  }); // end on scroll

  /*
  side nav
  */
  $('#menuIcon').on('click', () => {
    $('.body').toggleClass('menuOpen');
    $('body').toggleClass('bodyFix');
    $('nav').toggleClass('sideNaveOpen');
  });



}); // end document ready