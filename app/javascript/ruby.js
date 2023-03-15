import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';

import hljs from 'highlight.js';
//hljs.registerLanguage('ruby', ruby);


const searchClient = algoliasearch('R6R7DNKPN0', '21c41349c0a11eed634e6db147e78103');
const submit = document.querySelector("#submit");
const input = document.querySelector("#input");

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

if(submit){
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
      widgetParams.container.innerHTML = `<div class="text-center">Não conseguimos encontrar nenhum resultado para esta busca, por favor refaça a pergunta.</div>`
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
                        <pre>
                          <code class="language-ruby">
                            ${hljs.highlight(`${item.code}`, {language: 'ruby'}).value}
                          </code>
                        </pre>
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

  ]);

  search.start();

}

hljs.highlightAll();