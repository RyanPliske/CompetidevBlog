"use strict";

function setup() {
  $( function() { 
    // $("#navbar").load("navbar.html");
    // $("#blog-header").load("blog-header.html");
    // $("#sidebar").load("sidebar.html");
    // $("#post1").load("post1.html");
    // $("#post2").load("post2.html");
    // $("#post3").load("post3.html", highlight);
    // $("#post4").load("post4.html", highlight);
    // $("#footer").load("footer.html");
  });
}

var highlight = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};