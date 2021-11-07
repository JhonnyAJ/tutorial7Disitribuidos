function getAll(url, entity) {
  fetch(url + '/' + entity)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/list/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function getById(query, url, entity) {
  fetch(url + '/' + entity + '/' + query.id)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/detail/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function home() {
  fetch('/template/home.html')
    .then((response) => response.text())
    .then((template) => {
      let rendered = Mustache.render(template, {});
      document.getElementById('content').innerHTML = rendered;
    });
}

const buildingsApi = "https://tutorial7.netlify.app/.netlify/functions";
const architectsApi = "https://tutorial7.netlify.app/.netlify/functions";
const citiesApi = "https://tutorial7.netlify.app/.netlify/functions";

function init() {
  const router = new Navigo('/', {
    hash: true
  });
  router.on({
    '/buildings': () => {
      getAll(buildingsApi, 'building');
    },
    '/architects': () => {
      getAll(architectsApi, 'architect');
    },
    '/cities': () => {
      getAll(citiesApi, 'city');
    },
    '/buildingById/:id': ({ data, params, queryString }) => {
      getById(data, buildingsApi, 'building');
    },
    '/architectById/:id': ({ data, params, queryString }) => {
      getById(data, architectsApi, 'architect');
    },
    '/cityById/:id': ({ data, params, queryString }) => {
      getById(data, citiesApi, 'city');
    }
  });
  router.on(() => home());
  router.resolve();
}

window.onload = function () {
  init();
};