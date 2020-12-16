$(document).ready(function() {
  $("#tweet-text").on("keyup", function(e) {
    const counter = $(this).siblings().children(".counter");
    const tweetLength = $(this).val().length;
    counter.val(140 - tweetLength);

    if (counter.val() < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'rgb(84, 81, 73)');
    }
  });
});