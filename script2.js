/* eslint-disable no-undef */
/**
 * add move and delete marker
 */

// config map
let config = {
  minZoom: 5,
  maxZoom: 18,
};
// magnification with which the map will start
const zoom = 18;
// co-ordinates
const lat = 44.42447050979073;
const lng = 8.817488551139833;

var circle;
var marker;
var flag=true;
// calling map


const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Guardiani della Costa',
}).addTo(map);





// add marker on click
map.on("click", addMarker);

function addMarker(e) {
  // Add marker to map at click location
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = `Nuovo Marker: ${e.latlng.lat}, ${e.latlng.lng}`;


  $.get("https://www.openstreetmap.org/query?lat="+e.latlng.lat+"&lon="+e.latlng.lng, function(data){
    console.log(data);
 });

  


  var popupText = `<p>Posizione = </p> <p>${e.latlng.lat}</p> <p>${e.latlng.lng}</p> <button type="button" class="remove">Cancella Posizione</button> <button type="button" class="save">Salva Posizione</button>`;


  if(flag)
  {
    circle = new L.circle(e.latlng, {
    
    radius: 10,
  })
    .addTo(map);    

    marker = new L.marker(e.latlng)
      .bindPopup(popupText)
      .addTo(map)
      .on("popupopen", removeGroup)
      .on("popupopen", savePos);

    flag=false;
  }
  

  

}

const markerPlace = document.querySelector(".marker-position");

// remove marker
function removeGroup() {
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", 
  function () 
  {
    markerPlace.textContent = "Posizione Cancellata";
    map.removeLayer(circle);
    map.removeLayer(marker);
    flag=true;
  });
}

function savePos() {
  const btn = document.querySelector(".save");
  btn.addEventListener("click", 
  function () 
  {
    //Calcolo l'area del cerchio 
    //Mando i dati da qualche parte
  });
}
