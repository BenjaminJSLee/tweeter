/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(() => {
  $('.error').hide();
  // Event listener for creating a new tweet
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const MAX_TWEET_LENGTH = 140;
    const $textarea = $('.new-tweet textarea');
    const $error = $('.new-tweet .error');
    $error.hide(100);
    if ($textarea.val() === "") {
      return $error.slideDown().find('span').text("Cannot tweet an empty message");
    } else if ($textarea.val().length > MAX_TWEET_LENGTH) {
      return $error.slideDown().find('span').text("Tweet has exceeded its maximum character length").slideDown();
    }

    const formData = $( this ).serialize();
    $.ajax('/tweets', {type: "post", data: formData})
      .then((data) => {
        $textarea.val("");
        $('.tweets').empty();
        loadTweets();
      })
      .catch((err) => {

      });
  });

  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweet) => {
    const daysInMs = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((Date.now() - tweet.created_at) / daysInMs);
    const $article = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}" alt="prof-pic"/>
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <div class="tweet-body">${escape(tweet.content.text)}</div>
      <footer>
        <div>${daysPassed} day${daysPassed === 1 ? "" : "s"} ago</div>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $article;
  };

  const renderTweets = (tweets,target) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      target.append($tweet);
    }
  };

  const loadTweets = () => {
    $.ajax('/tweets', {type: 'get'})
      .then((data) => {
        renderTweets(data,$('.tweets'));
      })
      .catch((data) => {

      });
  };

  loadTweets();

});
