
$(() => { // shorthand for $(document).ready(() => {})
    $('section.new-tweet textarea').on('input', function() {
    const MAX_TWEET_LENGTH = 140;
    const txt = $(this).val();
    const val = MAX_TWEET_LENGTH - txt.length;
    const $charCount = $(this).next().next().children().last();
    if ( val < 0 ) {
      $charCount.addClass('invalid');
    } else {
      $charCount.removeClass('invalid')
    }
    $charCount.val(val);
  });

  $('nav#return').click(function() {
    $('html, body').animate({scrollTop: 0});
    $('.new-tweet').slideDown();
    $('.new-tweet textarea').focus();
  });

  $('nav#return').hide();
  $(document).scroll(function() {
    if($(this).scrollTop() === 0) {
      $('nav#return').hide(100);
      $('nav.top-bar div span').show();
    } else {
      $('nav#return').show(200);
      $('nav.top-bar div span').hide();
    }
  });

});
 