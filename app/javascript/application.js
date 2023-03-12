// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"

import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

import hljs from 'highlight.js';
//hljs.registerLanguage('ruby', ruby);
hljs.highlightAll();

const searchClient = algoliasearch('R6R7DNKPN0', '21c41349c0a11eed634e6db147e78103');

const form = document.querySelector("#form")

form.addEventListener("submit",(event) => {
  event.preventDefault();
  const searchBox = document.querySelector(".ais-SearchBox-input");
  const input = document.querySelector("#input").value;
  searchBox.value = input;
  const hits = document.querySelector("#hits");
  if (searchBox.value !== ""){
    const eventStart = new Event('input');
    searchBox.dispatchEvent(eventStart);
    hits.classList.remove('d-none');
  } else {
    hits.classList.add('d-none');
  }
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
    container: '#hits',
    templates: {
      empty(results, { html }) {
        return html`Não conseguimos encontrar nenhum resultado para esta busca, por favor refaça a pergunta`;
      },

      item(hit, { html }) {
        return html`
          <h2>
            ${hit.function_name} - ${hit.klass}
          </h2>
          <p>${hit.content}</p>
        `;
      }
    },
  })
]);

search.start();
