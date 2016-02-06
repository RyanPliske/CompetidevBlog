"use strict";

var queryString = window.location.hash.substring(1);

function setupCarousel() {
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

function DevManager() {
  var dev1 = 'nicks';
  var dev2 = "pats";
  var dev3 = "ryans";
  var dev4 = "dans";

  this.ryansButtonTapped = function() {
    handleTapForName(dev3);
  };

  this.dansButtonTapped = function() {
    handleTapForName(dev4);
  };

  this.patsButtonTapped = function() {
    handleTapForName(dev2);
  };

  this.nicksButtonTapped = function() {
    handleTapForName(dev1);
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
};

function setupDevs() {
  var devManager = new DevManager();
  $("#nicks-button").click(devManager.nicksButtonTapped);
  $("#pats-button").click(devManager.patsButtonTapped);
  $("#ryans-button").click(devManager.ryansButtonTapped);
  $("#dans-button").click(devManager.dansButtonTapped);
}

function highlight() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

var requestPostWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + ".html", function () {
    highlight();
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

function setupAutoScroll() {
  $("#scrollToTop").click( function() {
    $('html, body').animate({scrollTop: '0px'}, 300);
  });
}

function checkURL() {
  if (queryString.localeCompare("post3") == 0) {
    document.getElementById("post3").scrollIntoView();
  }

  if (queryString.localeCompare("post2") == 0) {
    document.getElementById("post2").scrollIntoView();
  }

  if (queryString.localeCompare("post1") == 0) {
    document.getElementById("post1").scrollIntoView();
  }
}

function setup() {
  $( function() { 
    // $("#myNavbar").load("navbar.html");
    $("#developers").load("developers.html", setupDevs());
    $("#footer").load("footer.html", setupAutoScroll());
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

