"use strict";

function setup() {
  $( function() { 
    $("#navbar").load("navbar.html");
    $("#myCarousel").load("carousel.html");
    // $("#post1").load("post1.html");
    // $("#footer").load("footer.html");
  });
}

var highlight = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};