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
  const resourceType = document.getElementById("resourceType");
  let category = resourceType.options[resourceType.selectedIndex].text;
  if (category === 'Person'){
      category = 'people';
  } else if (category === 'Planet'){
      category = 'planets';
  } else {
      category = 'starships';
  }
  const categoryId = document.getElementById("resourceId").value;
  const url = `https://swapi.co/api/${category}/${categoryId}`;

//switch statement to determine which category has been selected and then creates request based on the category
  switch (category) {
    case category === "people":
      request("GET", url, function() {
        const data = JSON.parse(this.responseText);
        console.log(data)
      });
      break;
    case category === "planets":
      request("GET", requestedURL, function() {
          const data = JSON.parse(this.responseText);
          console.log(data);
      });
      break;
    case category === "starships":
      request("GET", requestedURL, function() {
          const data = JSON.parse(this.responseText);
          console.log(data);
      });
      break;
  }
});
