/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// $(document).ready(() => {}) equivalent
$(() => {
  // Hiding error elements initially
  $('.error').hide();

  // Event listener for hiding/showing tweeting form
  $('#new-tweet-button').click(function(event) {
    $('.new-tweet').slideToggle(400);
    $('.new-tweet textarea').focus();
  });

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
    $.ajax('/tweets', {type: "post", data: formData, success: (d) => console.log(d)})
      .then((data) => {
        $textarea.val("");
        $( ".new-tweet .counter" ).val(MAX_TWEET_LENGTH);
        $('.tweets').empty();
        loadTweets();
      })
      .catch((err) => {

      });
  });

  /** Function escape takes a string and converts it to a html text, as to remove
   * any html markup inside the string, and then returns the new "safe" html text
   * 
   * @param {*} str is a string
   * @returns div.innerHTML, the text of the HTML object
   */
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /** Function createTweetElement converts a tweet object into HTML markup and returns it
   * 
   * @param {*} tweet is an object containing information about a tweet
   * @returns $article, a jQuery object containing HTML markup for the tweet object
   */
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

  /** Function renderTweets appends all given tweets to the target Jquery object.
   * 
   * @param {*} tweets is an array of tweet objects, each containing information about a tweet
   * @param {*} target is a jQuery object, consisting of the object to append the tweets to
   */
  const renderTweets = (tweets,target) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      target.append($tweet);
    }
  };

  /** Function loadTweets sends a get request to the server to retrieve the tweets, and
   * then renders every single tweet in the section.tweets container. 
   * 
   */
  const loadTweets = () => {
    $.ajax('/tweets', {type: 'get'})
      .then((data) => {
        renderTweets(data,$('section.tweets'));
      })
      .catch((data) => {

      });
  };

  loadTweets();

});
