// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"


import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch('R6R7DNKPN0', '21c41349c0a11eed634e6db147e78103');

const form = document.querySelector("#form")

// const searchMethod = (addEventListener)
form.addEventListener("submit",(event) => {
  event.preventDefault();
  const searchBox = document.querySelector(".ais-SearchBox-input");
  const input = document.querySelector("#input").value;
  searchBox.value = input;
  const eventStart = new Event('input');
  searchBox.dispatchEvent(eventStart);
});


const search = instantsearch({
  indexName: 'Function',
  searchClient
});

search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),

  hits({
    container: "#hits"
  })
]);

search.start();
