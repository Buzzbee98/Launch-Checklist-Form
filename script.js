// Write your JavaScript code here!
let form = null;
let missionTarget = null;
let faultyItems = null;
let launchStatus = null;
let fuelStatus = null;
let cargoStatus = null;
let pilot = null;
let copilot = null;
let fuel = null;
let cargo = null;

window.addEventListener('load', () => {
   form = document.getElementById('form');
   missionTarget = document.getElementById('missionTarget');
   faultyItems = document.getElementById('faultyItems');
   launchStatus = document.getElementById('launchStatus')
   fuelStatus = document.getElementById('fuelStatus');
   cargoStatus = document.getElementById('cargoStatus');
   pilot = document.getElementById('pilotName');
   copilot = document.getElementById('copilotName');
   fuel  = document.getElementById('fuelLevel');
   cargo = document.getElementById('cargoMass');

   missionDestination();

   form.addEventListener('submit', event => {
      if(!checkValid()) {
         event.preventDefault();
      }
   })
})

function checkValid() {
   let valid = true;
   valid = isFilled(pilot);
   valid = isFilled(copilot);
   valid = isFilled(fuel);
   valid = isFilled(cargo);
   if (!valid) {
      alert('All fields are required.')
      return valid;
   }
   if (Number(fuel.value) < 10000) {
      valid = false;
      console.log(valid);
      fuel.style.borderColor = 'red';
      faultyItems.style.visibility = 'visible';
      fuelStatus.innerHTML = 'Not enough fuel for the journey.';
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = 'red';
   } else {
      fuel.styel.borderColor = 'inherit'
   }
   if (Number(cargo.value) > 10000) {
      valid = false;
      cargo.style.borderColor = 'red';
      faultyItems.style.visibility = 'visible';
      cargoStatus.innerHTML = 'Too much mass for the shuttle to take off.';
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = 'red';
   } else {
      cargo.style.borderColor = 'inherit'
   }
   if (valid) {
      launchStatus.style.color = 'green';
   }
   return valid;
}

function isFilled(element) {
   if(element.value) {
      element.style.borderColor = 'inherit'
      return true;
   }
   element.style.borderColor = 'red';
   return false;
}

async function missionDestination() {
   let randomPlanet = Math.round(Math.random() * 5);
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(result => {
      result.json().then(json => {
         let planet = json[randomPlanet];
         missionTarget.innerHTML = 
         `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
         <img src="${planet.image}">`;
      });
   })
}

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
