$(document).ready(function(){

  //This external package ensures that tweet box grows vertically as you type.
  autosize($("#tweet-text"));

  //Displays scroll up button if page is not already scrolled up to the top.
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $("#scroll-top").fadeIn();
    } else {
        $("#scroll-top").fadeOut();
    }
  });

  //Scrolls page up when button is clicked.
  $("#scroll-top").click(function(){
    $('html, body').animate({
      scrollTop : 0
    }, 
    800);
    return false;
  });

  //Clicking the "Write New Tweet" button toggles the button icon and the compose tweet box.
  $("#write-new-tweet-btn").on("click", function() {
    $("#submit-tweet").slideToggle(function(){
      $("#tweet-text").focus();
      $("#nav-btn-icon").toggleClass("fa-angle-double-down fa-angle-double-up")
    });
  });

  //This function creates the html for each tweet.
  function createTweetElement(tweetObj){
  const $tweet = `        
    <article>
    <header>
      <img src=${tweetObj.user.avatars} alt="profile-picture">
      <span class="username-in-tweet">${tweetObj.user.name}</span>
      <span class="user-handle">${tweetObj.user.handle}</span>
    </header>
    <p id="the-actual-tweet">
      ${escape(tweetObj.content.text)}
    </p>
    <footer class="each-tweet-footer">
      <span class="tweet-post-date">${getDate(tweetObj.created_at)}</span>
      <div id="tweet-footer-icons">
        <i class="fas fa-flag fa-sm"></i>
        <i class="fas fa-retweet fa-sm"></i>
        <i class="far fa-heart fa-sm"></i>
      </div>
    </footer>
    </article>`;
    return $tweet;
  };

  //This function renders all the tweets on the page.
  function renderTweets(tweetObjArray) {
    let tweet = '';
    for (let tweetObj of tweetObjArray) {
      tweet = createTweetElement(tweetObj);
      $(".posted-tweets").prepend(tweet);
      tweet = '';
    };
  };

  //Helper function to remove any code from user tweets prior to rendering.
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //Helper function to provide posting date that is inserted in the footer of each tweet.
  function getDate(milliseconds) {
    return new Date(milliseconds).toDateString();
  }

  //Ajax POST request when user submits a tweet.
  $("#submit-tweet").on('submit', function(e) {
    e.preventDefault();

    const $tweetContent = $(this).children("#tweet-text").val();
    const $counterValue = $(this).find(".counter").val();
    const $errorMsg = $(".error-msg-box").children(".error-msg");

    if ($(".error-msg-box").css('display') !== "none") {
      $(".error-msg-box").slideUp("fast");
    }

    if ($tweetContent === "") {
      $errorMsg.text("The input field is empty.");
      $(".error-msg-box").slideDown("fast");
      return;
    } else if ($counterValue < 0) {
      $errorMsg.text("Tweets cannot exceed 140 characters.");
      $(".error-msg-box").slideDown("fast");
      return;
    }

    $.ajax({
        method: "POST", 
        url: "/tweets", 
        data: $(this).serialize()
      })
        .then(() => {
          $(this).children("#tweet-text").val("");
          $(this).find(".counter").val(140);
          $(".posted-tweets").empty();
          loadTweets();
        })
        .catch(err => console.log(err))
  });

  //Ajax GET request to render all tweets on page.
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json"
    })
    .then(response => {
      renderTweets(response);
    })
    .catch(err => console.log(err));
  };

  loadTweets();

});

