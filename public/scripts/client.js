$(document).ready( () => {

  let faded = false;
  let scrollMemory = 0;

  let fadeInScroll = setTimeout( () => {
    faded = true;
    $('.scroll').addClass('show');
  }, 3000)

  $(window).on('scroll', () => {
    const bScroll = $('body').scrollTop();
    // if current scroll is greater than memory, reset memory
    if (bScroll > scrollMemory) {
      scrollMemory = bScroll;
    }

    // if current scroll passes threshold of 1/8 the window height
    if (bScroll > $(window).height() / 8) {
      // cancel timeout
      clearTimeout(fadeInScroll);
      // if '.scroll' has faded in
      if (faded) {
        $('.scroll').css( 'transition-duration', '0ms' );
        // if bScroll is  not < scrollMemory
        if (bScroll === scrollMemory) {
          $('.scroll').css( 'opacity', 1 - bScroll / $(window).height() );
        } // end check if current scroll is not less than memory
      } // end check if faded
    } // end check if current scroll is 1/8th window





  });

});
