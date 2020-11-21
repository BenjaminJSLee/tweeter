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
  $('#show-tweet-form').click(function(event) {
    $('.new-tweet').slideToggle(400);
    $('.new-tweet textarea').focus();
  });

  /** Function checkSubmission checks the submission of the textarea to see if
   * the submitted text is valid. If the text is not valid, the error element
   * is modified and returned. Otherwise, undefined is returned.
   * 
   * @returns an error element (jQuery object) if there is an error, otherwise undefined
   */
  const checkSubmission = () => {
    const MAX_TWEET_LENGTH = 140;
    const txt = $('.new-tweet textarea').val();
    const $error = $('.new-tweet .error');
    $error.hide(100);

    if (txt === "") {
      $error.slideDown().find('span').text("Cannot tweet an empty message");
      return $error;
    } else if (txt.length > MAX_TWEET_LENGTH) {
      $error.slideDown().find('span').text("Tweet has exceeded its maximum character length").slideDown();
      return $error;
    }
    
    return undefined;
  };

  // Event listener for creating a new tweet
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const MAX_TWEET_LENGTH = 140;

    if (checkSubmission()) return;

    const formData = $( this ).serialize();
    $.ajax('/tweets', {type: "post", data: formData})
      .then(() => {
        $('.new-tweet textarea').val("");
        $( ".new-tweet .counter" ).val(MAX_TWEET_LENGTH);
        $('.tweets').empty();
        loadTweets();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  /** Function escape takes a string and converts it to a html text, as to remove
   * any html markup inside the string, and then returns the new "safe" html text
   * 
   * @param {*} str a string
   * @returns div.innerHTML, the text of the HTML object
   */
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /** Function formatDate converts a date in milliseconds to a date of its highest increment.
   * The date is also formatted in respect with the current date.
   * 
   * @param {*} dateInMs an integer representing date in milliseconds
   * @returns the formatted date with respect to the current time
   */
  const formatDate = (dateInMs) => {
    let timePassed = Date.now() - dateInMs;
    const time = {
      millisecond: 1000,
      second: 60,
      minute: 60,
      hour: 24,
      day: 365
    }

    for (const increment in time) {
      if ( (timePassed / time[increment]) < 1 ) {
        return `${timePassed} ${increment}${timePassed === 1 ? "" : "s"} ago`;
      }
      timePassed = Math.floor((timePassed / time[increment]));
    }
    
    return `${timePassed} year${timePassed === 1 ? "" : "s"} ago`;
  } 

  /** Function createTweetElement converts a tweet object into HTML markup and returns it
   * 
   * @param {*} tweet an object containing information about a tweet
   * @returns $article, a jQuery object containing HTML markup for the tweet object
   */
  const createTweetElement = (tweet) => {
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
        <div>${formatDate(tweet.created_at)}</div>
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
   * @param {*} tweets an array of tweet objects, each containing information about a tweet
   * @param {*} target a jQuery object, consisting of the object to append the tweets to
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
      .catch((err) => {
        console.error(err);
      });
  };

  loadTweets();

});
