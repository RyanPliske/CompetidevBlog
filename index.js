"use strict";

function DevManager() {

  this.ryansButtonTapped = function() {
    handleTapForName("ryans");
  }

  this.dansButtonTapped = function() {
    handleTapForName("dans");
  }

  this.nicksButtonTapped = function() {
    handleTapForName("nicks");
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
  $("#ryans-button").click(devManager.ryansButtonTapped);
  $("#dans-button").click(devManager.dansButtonTapped);
};

function RequestManager() {

}

RequestManager.highlight = function() {
  $('pre code').each(function(i, block) {
    // How did they do this?
    hljs.highlightBlock(block);
  });
};

RequestManager.requestPostWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + ".html", function () {
    RequestManager.highlight();
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
};

RequestManager.requestPostDescriptionWithCompletion = function(postString, completion) {
  $("#" + postString).load(postString + "_description.html", function() {
    document.getElementById(postString).scrollIntoView();
    if (completion) {
      completion();
    }
  });
};

function InitialSetupManager() {

  this.setupCarousel = function() {
    $("#myCarousel").load("carousel.html", function() {
      $("#carouselPost1Button").click( function() {
        var completion = function() {
          document.getElementById("post1").scrollIntoView();
        };
        RequestManager.requestPostWithCompletion("post1", completion);
      });
      $("#carouselPost2Button").click( function() {
        var completion = function() {
          document.getElementById("post2").scrollIntoView();
        };
        RequestManager.requestPostWithCompletion("post2", completion);
      });
      $("#carouselPost6Button").click( function() {
        var completion = function() {
          document.getElementById("post6").scrollIntoView();
        };
        RequestManager.requestPostWithCompletion("post6", completion);
      });
    });
  };

  this.initiallyRequestPostDescriptionWithCompletion = function(postString, completion) {
    $("#" + postString).load(postString + "_description.html", function() {
        completion();
    });
  };

  this.checkURL = function() {
    var queryString = window.location.hash.substring(1);

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

  this.setupAutoScroll= function() {
    $("#scrollToTop").click( function() {
      $('html, body').animate({scrollTop: '0px'}, 300);
    });
  };

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
          initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post4", function() {
            initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post5", function() {
              initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post6", function() {
                initialSetupManager.initiallyRequestPostDescriptionWithCompletion("post7", function() {
                  initialSetupManager.checkURL();
                });
              });
            });
          });
        });
      });
    });
  });
};
