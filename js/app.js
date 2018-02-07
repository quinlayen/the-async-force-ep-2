console.log('sanity check')
//make request button work
const submitButton = document.getElementById('requestResourceButton');
submitButton.addEventListener('click', function(){
const resourceType = document.getElementById('resourceType');
const category = resourceType.options[resourceType.selectedIndex].text;




});

//helper function to create requests dynamically
function request(method, url, handler){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', handler);
    oReq.open(method, url);
    oReq.send();
}
// const oReq = new XMLHttpRequest();
// function personRequest(){
//     let selectedPerson = document.getElementById('resourceId').value;
//     let output = document.getElementById('contentContainer').innerHTML;
//     const data = JSON.parse(this.responseText)
//     console.log(data)
//     const people = data.results;
      
//     for (var i=0; i<people.length;i++){
//         if(people[i].name.toLowerCase() === selectedPerson.toLowerCase()){
//             console.log(people[i]);
//         }
//     };
// }
// oReq.addEventListener('load',personRequest);
// oReq.open('GET', 'https://swapi.co/api/people');
// oReq.send();