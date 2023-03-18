import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';

import hljs from 'highlight.js';
//hljs.registerLanguage('ruby', ruby);


const searchClient = algoliasearch('R6R7DNKPN0', '21c41349c0a11eed634e6db147e78103');
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const input = document.querySelector("#input");

if(submit){
  form.addEventListener("submit", (event) => {
    event.preventDefault();
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
  });

  const search = instantsearch({
    indexName: 'Function',
    searchClient
  });

  function urlPath(string) {
    const regexp = /([a-z]*_?[a-z]*)(.*)/g;
    const array = [...string.matchAll(regexp)];
    const pathPrefix = array[0][1];
    const pathSufix = array[0][2];
    let pathSufixHex = '-';
    if(pathSufix === ""){
      return pathPrefix;
    }else{
    for (var i = 0; i < pathSufix.length; i++) {
      const char = pathSufix[i];
      pathSufixHex = pathSufixHex + char.charCodeAt(0).toString(16).toUpperCase();
    }
    return pathPrefix + pathSufixHex
    }
  };

  // Create the render function
  const renderHits = (renderOptions, isFirstRender) => {
    const { hits, widgetParams } = renderOptions;
    if(hits.length == 0){
      widgetParams.container.innerHTML = `<div class="text-center fs-4">Não conseguimos encontrar nenhum resultado para esta busca <i class="fa-regular fa-face-frown-open"></i>,<br> por favor refaça a pergunta.</div>`
    } else {
      widgetParams.container.innerHTML = `
        <div class="accordion" id="accordionResults">
          ${hits
            .map(
              item =>
                `<div class="accordion-item">
                  <h2 class="accordion-header" id="panelsStayOpen-heading${item.objectID}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${item.objectID}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${item.objectID}">
                      ${item.function_name} - ${item.klass}
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapse${item.objectID}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading${item.objectID}">
                    <div class="accordion-body">
                      <p>${item.content}</p>
                      <div class="code-colors p-4">
                        <pre><code class="language-ruby">${hljs.highlight(`${item.code}`, {language: 'ruby'}).value}</code></pre>
                      </div>
                      <p class="mt-2">Veja documentação do Ruby sobre este método, <a href="https://rubyapi.org/3.1/o/${item.klass}#method-i-${urlPath(item.function_name)}" class="text-decoration-none" target="_blank">aqui</a></p>
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
