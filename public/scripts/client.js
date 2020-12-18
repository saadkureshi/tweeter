$(document).ready(function(){

  $("#page-footer").text(new Date().getFullYear());
  autosize($("#tweet-text"));

  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $("#scroll-top").fadeIn();
    } else {
        $("#scroll-top").fadeOut();
    }
  });

  //Click event to scroll to top
  $("#scroll-top").click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

  $("#write-new-tweet-btn").on("click", function() {
    $("#submit-tweet").slideToggle(function(){
      $("#tweet-text").focus();
      $("#nav-btn-icon").toggleClass("fa-angle-double-down fa-angle-double-up")
    });
  });

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

  function renderTweets(tweetObjArray) {
    let tweet = '';
    for (let tweetObj of tweetObjArray) {
      tweet = createTweetElement(tweetObj);
      $(".posted-tweets").prepend(tweet);
      tweet = '';
    };
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function getDate(milliseconds) {
    return new Date(milliseconds).toDateString();
  }

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

  // Alt way of sending $.ajax request:
  // $("#submit-tweet").on('submit', function(e) {
  //   e.preventDefault();
  //   const $tweetBox = $(this).children("#tweet-text");
  //   const tweetContent = $tweetBox.val();
  //   console.log(tweetContent);
  // $.ajax({
  //   method: "POST", 
  //   url: "/tweets", 
  //   data: {text: tweetContent}
  //   // data: $(this).serialize()
  // })
  //   .then(response => {
  //     console.log(response);
  // })
  //   .catch(err => console.log(err))

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

