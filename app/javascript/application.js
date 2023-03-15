// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"

import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';

import hljs from 'highlight.js';
//hljs.registerLanguage('ruby', ruby);


const searchClient = algoliasearch('R6R7DNKPN0', '21c41349c0a11eed634e6db147e78103');
const submit = document.querySelector("#submit");
const input = document.querySelector("#input");
const logo = document.querySelector("#logo")

logo.addEventListener('click', () => {
  const url = window.location.href;
  window.location.href = url;
});


const handleSubmit = () => {
  const searchBox = document.querySelector(".ais-SearchBox-input");
  searchBox.value = input.value;
  const hits = document.querySelector("#hits");
  if (searchBox.value !== ""){
    const eventStart = new Event('input');
    searchBox.dispatchEvent(eventStart);
    hits.classList.remove('d-none');
  } else {
    hits.classList.add('d-none');
  }
}

submit.addEventListener("click", handleSubmit);
input.addEventListener("keydown", (event) => {
  if(event.keyCode === 13) handleSubmit();
});

const search = instantsearch({
  indexName: 'Function',
  searchClient
});



// Create the render function
const renderHits = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions;
  if(hits.length == 0){
    widgetParams.container.innerHTML = `<p>Não conseguimos encontrar nenhum resultado para esta busca, por favor refaça a pergunta</p>`
  } else {
    widgetParams.container.innerHTML = `
      <div class="accordion" id="accordionExample">
        ${hits
          .map(
            item =>
              `<div class="accordion-item">
                <h2 class="accordion-header" id="accordion${item.objectID}">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.objectID}" aria-expanded="true" aria-controls="collapse${item.objectID}">
                    ${item.function_name} - ${item.klass}
                  </button>
                </h2>
                <div id="collapse${item.objectID}" class="accordion-collapse collapse" aria-labelledby="primeiro" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p>${item.content}</p>
                    <p>${hljs.highlight('string = "teste"', {language: 'ruby'}).value}</p>
                  </div>
                </div>
              </div>`
          )
          .join('')}
      </div>
    `;
  }
};

// Create the custom widget
const customHits = connectHits(renderHits);


search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),

  customHits({
    container: document.querySelector('#hits'),
  })

  // hits({
  //   container: '#hits',
  //   templates: {
  //     empty(results, { html }) {
  //       return html`Não conseguimos encontrar nenhum resultado para esta busca, por favor refaça a pergunta`;
  //     },

  //     item(hit, { html }) {
  //       return html`
  //         <h2>
  //           ${hit.function_name} - ${hit.klass}
  //         </h2>
  //         <p>${hit.content}</p>
  //       `;
  //     }
  //   },
  // })
]);

search.start();

// hljs.highlightAll();
