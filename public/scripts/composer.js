
$(() => { // shorthand for $(document).ready(() => {})

  // Hiding return nav button initially
  $('nav#return').hide();

  // Handling change of input in the textarea box for tweets
  // Specifically checks the number of characters in the textarea
  // and handles the style if the number of characters exceeds the limit
  $('section.new-tweet textarea').on('input', function() {
    const MAX_TWEET_LENGTH = 140;
    const txt = $(this).val();
    const charsFromMax = MAX_TWEET_LENGTH - txt.length;
    const $charCount = $('section.new-tweet .counter');

    if ( charsFromMax < 0 ) {
      $charCount.addClass('invalid');
    } else {
      $charCount.removeClass('invalid')
    }
    
    $charCount.val(charsFromMax);
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
      $('#show-tweet-form').show();
    } else {
      $('nav#return').show(200);
      $('#show-tweet-form').hide();
    }
  });
  
});
 