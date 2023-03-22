// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"
import "./ruby"
import hljs from 'highlight.js';

window.goToUrl = function(event) {
  const path = window.location.pathname;
  const regex = /\/[o|d|u|f]/i;
  if(path.match(regex)) {
    window.location.pathname = "/";
  } else window.location.reload();
};

window.goToRuby = function(event) {
 window.location.pathname = "/";
};

