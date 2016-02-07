"use strict";

var queryString = window.location.hash.substring(1);

function DevManager() {
  var dev1 = 'nicks';
  var dev2 = "pats";
  var dev3 = "ryans";
  var dev4 = "dans";

  this.ryansButtonTapped = function() {
    handleTapForName(dev3);
  }

  this.dansButtonTapped = function() {
    handleTapForName(dev4);
  }

  this.patsButtonTapped = function() {
    handleTapForName(dev2);
  }

  this.nicksButtonTapped = function() {
    handleTapForName(dev1);
  }

  function handleTapForName(developersName) {
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

}

DevManager.setupDevs = function() {
  var devManager = new DevManager();
  $("#nicks-button").click(devManager.nicksButtonTapped);
  $("#pats-button").click(devManager.patsButtonTapped);
  $("#ryans-button").click(devManager.ryansButtonTapped);
  $("#dans-button").click(devManager.dansButtonTapped);
};

function highlight() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

function requestPostWithCompletion(postString, completion) {
  $("#" + postString).load(postString + ".html", function () {
    highlight();
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
}

function requestPostDescriptionWithCompletion(postString, completion) {
  $("#" + postString).load(postString + "_description.html", function() {
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
}

function InitialSetupManager() {

  this.setupCarousel = function() {
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

  this.initiallyRequestPostDescriptionWithCompletion = function(postString, completion) {
    $("#" + postString).load(postString + "_description.html", function() {
        completion();
    });
  };

  this.checkURL = function() {
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

  this.setupAutoScroll= function() {
    $("#scrollToTop").click( function() {
      $('html, body').animate({scrollTop: '0px'}, 300);
    });
  }

}

InitialSetupManager.setup = function() {
  var initialSetupManager = new InitialSetupManager();
  $( function() { 
    // $("#myNavbar").load("navbar.html");
    $("#developers").load("developers.html", DevManager.setupDevs);
    $("#footer").load("footer.html", initialSetupManager.setupAutoScroll);
    initialSetupManager.setupCarousel();
    initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post1", function() {
      initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post2", function() {
        initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post3", function() {
          initialSetupManager.checkURL();
        });
      });
    });
  });
}
