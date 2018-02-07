console.log("sanity check");
//helper function to create requests dynamically
function request(method, url, handler) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", handler);
  oReq.open(method, url);
  oReq.send();
}

const submitButton = document.getElementById("requestResourceButton");

submitButton.addEventListener("click", function() {
  const h2 = document.createElement('h2');
  const container = document.getElementById('contentContainer');
  const resourceType = document.getElementById("resourceType");
  let category = resourceType.options[resourceType.selectedIndex].text;
  if (category === "Person") {
    category = "people";
  } else if (category === "Planet") {
    category = "planets";
  } else {
    category = "starships";
  }
  const categoryId = document.getElementById("resourceId").value;
  const url = `https://swapi.co/api/${category}/${categoryId}`;
  const speciesUrl = `https://swapi.co/api/species/1`;
  
  //switch statement to determine which category has been selected and then creates request based on the category
  switch (category) {
    case "people":
      request("GET", url, function() {
        const peopleData = JSON.parse(this.responseText);
        const gender = document.createElement('p');
        container.appendChild(h2).innerHTML = peopleData.name;
        container.appendChild(gender).innerHTML = peopleData.gender;
        request("GET", speciesUrl, function(){
            const speciesData = JSON.parse(this.responseText)
            const species = document.createElement('p');
             container.appendChild(species).innerHTML = speciesData.name;
         })
        
      });
      break;
    case "planets":
      request("GET", url, function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        container.appendChild(h2).innerHTML = data.name;


      });
      break;
    case "starships":
      request("GET", url, function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        container.appendChild(h2).innerHTML = data.name;


      });
      break;
  }
});
