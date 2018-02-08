console.log("sanity check");
//helper function to create requests dynamically
function request(method, url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open(method, url);
  oReq.send();
}
//clear the Dom
function clearDom(){
  document.removeChild(h2);
  document.removeChild(p)
}

const submitButton = document.getElementById("requestResourceButton");

submitButton.addEventListener("click", function() {
  
  const h2 = document.createElement("h2");
  const container = document.getElementById("contentContainer");
  const resourceType = document.getElementById("resourceType");
  let category = resourceType.options[resourceType.selectedIndex].text;
  if (category === "Person") {
    category = "people";
  } else if (category === "Planet") {
    category = "planets";
  } else {1
    category = "starships";
  }
  const categoryId = document.getElementById("resourceId").value;
  const url = `https://swapi.co/api/${category}/${categoryId}/`;
  const speciesUrl = `https://swapi.co/api/species/1`;
  const filmsUrl = `https://swapi.co/api/films`;
  //switch statement to determine which category has been selected and then creates request based on the category
  switch (category) {
    case "people":
      request("GET", url, function() {
        console.log(url)
        const peopleData = JSON.parse(this.responseText);
        const gender = document.createElement("p");
        container.appendChild(h2).innerHTML = peopleData.name;
        container.appendChild(gender).innerHTML = peopleData.gender.charAt(0).toUpperCase() + peopleData.gender.slice(1);
        request("GET", speciesUrl, function() {
          const speciesData = JSON.parse(this.responseText);
          const species = document.createElement("p");
          container.appendChild(species).innerHTML = speciesData.name;
        });
      });
      break;
    case "planets": 
      request("GET", url, function() {
        const planetsData = JSON.parse(this.responseText);
        const terrain = document.createElement("p");
        const population = document.createElement("p");
        container.appendChild(h2).innerHTML = planetsData.name;
        container.appendChild(terrain).innerHTML = planetsData.terrain.charAt(0).toUpperCase() + planetsData.terrain.slice(1);
        container.appendChild(population).innerHTML = planetsData.population;
        const planetFilmList = planetsData.films.map(function(element) {
          request("GET", element, function() {
            const planetFilmsData = JSON.parse(this.responseText);
            const filmsList = document.createElement("ul");
            let film = document.createElement("li");
            container.appendChild(filmsList);
            filmsList.appendChild(film).innerHTML = planetFilmsData.title;
          });
        });
      });

      break;
    case "starships":
      request("GET", url, function() {
        const starshipsData = JSON.parse(this.responseText);
        //console.log(starshipsData.films[1]);
        const manufacturer = document.createElement("p");
        const starshipClass = document.createElement("p");
        container.appendChild(h2).innerHTML = starshipsData.name;
        container.appendChild(manufacturer).innerHTML = starshipsData.manufacturer;
        container.appendChild(starshipClass).innerHTML = starshipsData.starship_class.charAt(0).toUpperCase() + starshipsData.starship_class.slice(1);;
        const starshipsFilmList = starshipsData.films.map(function(element){
          request("GET", element, function(){
            const starshipsFilmsData = JSON.parse(this.responseText);
            console.log(starshipsFilmsData)
            const filmsList = document.createElement("ul");
            let film = document.createElement("li");
            container.appendChild(filmsList);
            filmsList.appendChild(film).innerHTML = starshipsFilmsData.title;
          });
        });
      });
      break;
  }
});
