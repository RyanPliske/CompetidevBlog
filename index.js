"use strict";

function setup() {
  $( function() { 
    $("#navbar").load("navbar.html");
    $("#myCarousel").load("carousel.html");
    requestPost1Description();
    $("#footer").load("footer.html");
  });
}

var highlight = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

var requestPost1 = function() {
  $("#post1-description").load("post1.html", function() {
    $("#post1-link").click(requestPost1Description);
  });
};

var requestPost1Description = function() {
  $("#post1-description").load("post1_description.html", function() {
    $("#post1-description-link").click(requestPost1);
  });
}