
$(() => { // shorthand for $(document).ready(() => {})

  // Hiding return nav button initially
  $('nav#return').hide();

  // Handling change of input in the textarea box for tweets
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

  // Handling click on the return nav button (for returning to top of page)
  $('nav#return').click(function() {
    $('html, body').animate({scrollTop: 0});
    $('.new-tweet').slideDown();
    $('.new-tweet textarea').focus();
  });

  // Handling a scroll event on the document.
  // Used for making the button that shows the tweet form and the return button
  // disappear and reappear
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
 