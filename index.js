"use strict";

var queryString = window.location.hash.substring(1);

function setup() {
  $( function() { 
    // $("#myNavbar").load("navbar.html");
    $("#developers").load("developers.html", setupDevs);
    $("#footer").load("footer.html", setupAutoScroll);
    setupCarousel();
    requestPost1DescriptionWithCompletion(function() {
      requestPost2DescriptionWithCompletion(function() {
        checkURL();
      });
    });
  });
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

var setupDevs = function() {
  $("#nicks-button").click(nicksButtonTapped);
  $("#pats-button").click(patsButtonTapped);
  $("#ryans-button").click(ryansButtonTapped);
  $("#dans-button").click(dansButtonTapped);
};

var highlight = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

var requestPost1WithCompletion = function(completion) {
  $("#post1").load("post1.html", function() {
    $("#post1-link").click(requestPost1DescriptionWithCompletion);
    completion();
  });
};

var requestPost2WithCompletion = function(completion) {
  $("#post2").load("post2.html", function() {
    highlight();
    $("#post2-link").click(requestPost2DescriptionWithCompletion);
    completion();
  });
};

var requestPost1DescriptionWithCompletion = function(completion) {
  $("#post1").load("post1_description.html", function() {
    $("#post1-description-link").click(requestPost1WithCompletion);
    completion();
  });
};

var requestPost2DescriptionWithCompletion = function(completion) {
  $("#post2").load("post2_description.html", function() {
    $("#post2-description-link").click(requestPost2WithCompletion);
    completion();
  });
};

var setupCarousel = function() {
  $("#myCarousel").load("carousel.html", function() {
    $("#carouselPost1Button").click( function() {
      var completion = function() {
        document.getElementById("post1").scrollIntoView();
      }
      requestPost1WithCompletion(completion);
    });
    $("#carouselPost2Button").click( function() {
      var completion = function() {
        document.getElementById("post2").scrollIntoView();
      }
      requestPost2WithCompletion(completion);
    });
  });
};

var setupAutoScroll = function() {
  $("#scrollToTop").click( function() {
    $('html, body').animate({scrollTop: '0px'}, 300);
  });
};

var checkURL = function() {
  if (queryString.localeCompare("post2") == 0) {
    document.getElementById("post2").scrollIntoView();
  }

  if (queryString.localeCompare("post1") == 0) {
    document.getElementById("post1").scrollIntoView();
  }
};