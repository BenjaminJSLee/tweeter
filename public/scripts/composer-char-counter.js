
$(() => { // shorthand for $(document).ready(() => {})
const $txtArea = $('section.new-tweet textarea');
$txtArea.on('input', function() {
    const TWEET_LENGTH = 140;
    const txt = $(this).val();
    const val = TWEET_LENGTH - txt.length;
    const $charCount = $(this).next().children().last();
    if ( val < 0 ) {
      $charCount.addClass('invalid');
    } else {
      $charCount.removeClass('invalid')
    }
    $charCount.val(val);
  });
});
 