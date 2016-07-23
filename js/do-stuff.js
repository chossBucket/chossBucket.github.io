$(function() {

// ** infinte scroll **

  var postURLs,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = $(".posts").children().length,
      loadNewPostsThreshold = 3000;

  // Load the JSON file containing all URLs
  $.getJSON('/all-posts.json', function(data) {
    postURLs = data["posts"];

    // If there aren't any more posts available to load than already visible, disable fetching
    if (postURLs.length <= postsToLoad)
      disableFetching();
  });

  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".infinite-spinner").length < 1)
    shouldFetchPosts = false;

  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(function(e){
    if (!shouldFetchPosts || isFetchingPosts) return;

    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();

    // If we've scrolled past the loadNewPostsThreshold, fetch posts
    if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });

  // Fetch a chunk of posts
  function fetchPosts() {
    // Exit if postURLs haven't been loaded
    if (!postURLs) return;

    isFetchingPosts = true;

    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    var loadedPosts = 0,
        postCount = $(".posts").children().length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;

          if (postIndex > postURLs.length-1) {
            disableFetching();
            return;
          }

          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };

    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = postURLs[index];

    $.get(postURL, function(data) {
      $(data).find(".post").appendTo(".posts");
      callback();
    });
  }

  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }


  // ** keybindings for moving between posts **


  var screenPositionCounter = 0;

  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          console.log("left key pressed");
          $($(".post-title").get().reverse()).each(function(i, element){
            if (element.getBoundingClientRect().y < 0) {
              element.scrollIntoView();
              return false;
            }
          });

          break;


        case 39: // right
          console.log("right key pressed");
          $(".post-title").each(function(i, element){
            if (element.getBoundingClientRect().y > 20) {
              element.scrollIntoView();
              element.focus();
              return false;
            }
          });

          break;



        default: return; // exit this handler for other keys
    }
    // e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  // ** slideshow code **

  // $("#slides").css("margin-left")
  // $("#slides").css("margin-left", "-100px")

  // sudo code
  // function next() {
  //  var  current position = $("#slides").css("margin-left")
  //  var new position = current position + 500px
  //  $("#slides").css("margin-left", new position)
  // };

});
