/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(() => {
  const createTweetElement = (tweet) => {
    const $article = $("<article>").addClass('tweet');

    const $user = $("<div>")
      .append('<img src="/images/profile-hex.png" alt="prof-pic"/>')
      .append('<span>Name</span>');

    const $header = $("<header>")
      .append($user)
      .append("<span>@exampletag</span>");

    const $body = $("<div>I am the tweet body</div>").addClass('tweet-body');

    const $icons = $("<div>")
      .append('<i class="fas fa-flag"></i>')
      .append('<i class="fas fa-retweet"></i>') 
      .append('<i class="fas fa-heart"></i>'); 

    const $footer = $("<footer>")
      .append("<div>Date</div>")
      .append($icons);

    $article.append($header)
      .append($body)
      .append($footer);

    return $article;
  };

  const $tweet = createTweetElement(null);
  $('.tweets').append($tweet);

  const render = () => {

  };

 })
