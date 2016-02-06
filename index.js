"use strict";

var queryString = window.location.hash.substring(1);
var numberOfPosts = 3;

var setupCarousel = function() {
  $("#myCarousel").load("carousel.html", function() {
    $("#carouselPost1Button").click( function() {
      var completion = function() {
        document.getElementById("post1").scrollIntoView();
      };
      requestPostWithCompletion("post1", completion);
    });
    $("#carouselPost2Button").click( function() {
      var completion = function() {
        document.getElementById("post2").scrollIntoView();
      };
      requestPostWithCompletion("post2", completion);
    });
  });
};

var setupDevs = function() {
  $("#nicks-button").click(nicksButtonTapped);
  $("#pats-button").click(patsButtonTapped);
  $("#ryans-button").click(ryansButtonTapped);
  $("#dans-button").click(dansButtonTapped);
};

var handleTapForName = function(developersName) {
  var infoString = developersName + "-info";
  var bioString = developersName + "-bio";
  if ($("#" + infoString).hasClass("hidden")) {
    $("#" + infoString).className = document.getElementById(infoString).classList.remove("hidden");
    document.getElementById(bioString).classList.add("hidden");
    $("#" + developersName + "-button").text("View Bio");
  }
  else if ($("#" + bioString).hasClass("hidden")) {
    $("#" + bioString).className = document.getElementById(bioString).classList.remove("hidden");
    document.getElementById(infoString).classList.add("hidden");
    $("#" + developersName + "-button").text("Contact Info");
  }
};

var ryansButtonTapped = function() {
  handleTapForName("ryans");
};

var dansButtonTapped = function() {
  handleTapForName("dans");
};

var patsButtonTapped = function() {
  handleTapForName("pats");
};

var nicksButtonTapped = function() {
  handleTapForName("nicks");
};

var highlight = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

var requestPostWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + ".html", function () {
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
};

var requestPostDescriptionWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + "_description.html", function() {
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
};

var initiallyRequestPostDescriptionWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + "_description.html", function() {
      completion();
  });
};

var setupAutoScroll = function() {
  $("#scrollToTop").click( function() {
    $('html, body').animate({scrollTop: '0px'}, 300);
  });
};

var checkURL = function() {
  if (queryString.localeCompare("post3") == 0) {
    document.getElementById("post3").scrollIntoView();
  }

  if (queryString.localeCompare("post2") == 0) {
    document.getElementById("post2").scrollIntoView();
  }

  if (queryString.localeCompare("post1") == 0) {
    document.getElementById("post1").scrollIntoView();
  }
};

function setup() {
  $( function() { 
    // $("#myNavbar").load("navbar.html");
    $("#developers").load("developers.html", setupDevs);
    $("#footer").load("footer.html", setupAutoScroll);
    setupCarousel();
    initiallyRequestPostDescriptionWithCompletion("post1", function() {
      initiallyRequestPostDescriptionWithCompletion("post2", function() {
        initiallyRequestPostDescriptionWithCompletion("post3", function() {
          checkURL();
        });
      });
    });
  });
};

