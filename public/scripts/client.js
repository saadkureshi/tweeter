/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function(){
// Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  function createTweetElement(tweetObj){
  const $tweet = `        
    <article>
    <header>
      <img src=${tweetObj.user.avatars} alt="profile-picture">
      <span class="username-in-tweet">${tweetObj.user.name}</span>
      <span class="user-handle">${tweetObj.user.handle}</span>
    </header>
    <p>
      ${tweetObj.content.text}
    </p>
    <footer class="each-tweet-footer">
      <span class="tweet-post-date">${getDate(tweetObj.created_at)}</span>
      <div>
        <i class="fas fa-flag fa-sm"></i>
        <i class="fas fa-retweet fa-sm"></i>
        <i class="far fa-heart fa-sm"></i>
      </div>
    </footer>
    </article>`;
    return $tweet;
  };

  function renderTweets(tweetObjArray) {
    let tweet = '';
    for (let tweetObj of tweetObjArray) {
      tweet = createTweetElement(tweetObj);
      $(".posted-tweets").append(tweet);
      tweet = '';
    };
  };

  function getDate(milliseconds) {
    return new Date(milliseconds).toDateString();
  }

  renderTweets(data);

});

