console.log('sanity check');
//helper function to create requests dynamically
function request(method, url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    return callback.bind(this)(data);
  });
  oReq.open(method, url);
  oReq.send();
}
//clear the Dom
function clearDom() {
  document.removeChild(h2);
  document.removeChild(p);
}

const submitButton = document.getElementById('requestResourceButton');

submitButton.addEventListener('click', () => {
  const h2 = document.createElement('h2');
  const container = document.getElementById('contentContainer');
  const resourceType = document.getElementById('resourceType');
  let category = resourceType.options[resourceType.selectedIndex].text;
  if (category === 'Person') {
    category = 'people';
  } else if (category === 'Planet') {
    category = 'planets';
  } else {
    category = 'starships';
  }
  const categoryId = document.getElementById('resourceId').value;
  const url = `https://swapi.co/api/${category}/${categoryId}/`;
  const speciesUrl = `https://swapi.co/api/species/1`;
  const filmsUrl = `https://swapi.co/api/films`;
  //switch statement to determine which category has been selected and then creates request based on the category
  switch (category) {
    case 'people':
      request('GET', url, data => {
        const gender = document.createElement('p');
        container.appendChild(h2).innerHTML = data.name;
        container.appendChild(gender).innerHTML =
          data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
        request('GET', speciesUrl, () => {
          const species = document.createElement('p');
          container.appendChild(species).innerHTML = data.name;
        });
      });
      break;
    case 'planets':
      request('GET', url, data => {
        const terrain = document.createElement('p');
        const population = document.createElement('p');
        container.appendChild(h2).innerHTML = data.name;
        container.appendChild(terrain).innerHTML =
          data.terrain.charAt(0).toUpperCase() + data.terrain.slice(1);
        container.appendChild(population).innerHTML = data.population;
        const planetFilmList = data.films.map(element => {
          request('GET', element, data => {
            const filmsList = document.createElement('ul');
            let film = document.createElement('li');
            container.appendChild(filmsList);
            filmsList.appendChild(film).innerHTML = data.title;
          });
        });
      });

      break;
    case 'starships':
      request('GET', url, data => {
        const manufacturer = document.createElement('p');
        const starshipClass = document.createElement('p');
        container.appendChild(h2).innerHTML = data.name;
        container.appendChild(manufacturer).innerHTML = data.manufacturer;
        container.appendChild(starshipClass).innerHTML =
          data.starship_class.charAt(0).toUpperCase() +
          data.starship_class.slice(1);
        const starshipsFilmList = data.films.map(element => {
          request('GET', element, data => {
            const filmsList = document.createElement('ul');
            let film = document.createElement('li');
            container.appendChild(filmsList);
            filmsList.appendChild(film).innerHTML = data.title;
          });
        });
      });
      break;
  }
});
