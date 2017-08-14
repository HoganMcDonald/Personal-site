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

    /*
    animate repos
    */
    // if on mobile
    //  if repo is within center 80% of screen
    //  expand slightly and make margin shrink accordingly
    // else make them apear as the user scrolls near them
    // also hide all repos on page load if user is on desktop



  }); // end on scroll

  /*
  nav scrolls
  */
  function scrollToAnchor(id, num){
    $('li').removeClass('selected');
    $('#' + num).addClass('selected');
    var dest = $("#" + id);
    $('html, body').animate( {scrollTop: dest.offset().top - 90}, 'slow' );
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
    $('nav').toggleClass('sideNaveOpen');
  });

}); // end document ready
