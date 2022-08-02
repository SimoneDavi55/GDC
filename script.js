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


const radius = 10;

const markOne = L.latLng(44.42447050979073, 8.817488551139833);
const markTwo = L.latLng(44.424483073543385, 8.817740678787233);
const markThree = L.latLng(44.424620917453346, 8.816753625869753);
const markFour = L.latLng(44.42436437436044, 8.818368315696718);

const fakeDB = [markOne, markTwo, markThree, markFour];


map.whenReady(PlaceReserved);

function PlaceReserved() {
  
  for (let i = 0; i < fakeDB.length;i++)
  {
    circle = new L.circle(fakeDB[i], {
      radius: radius,
      color: 'green',
    })
      .addTo(map); 
  }
}


// add marker on click
map.on("click", addMarker);

function addMarker(e) {
  // Add marker to map at click location
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = `Nuovo Marker: ${e.latlng.lat}, ${e.latlng.lng}`;


  /*$.get("https://www.openstreetmap.org/query?lat="+e.latlng.lat+"&lon="+e.latlng.lng, function(data){
    console.log(data);
 });*/

  var popupText = `<p>Posizione = </p> <p>${e.latlng.lat}</p> <p>${e.latlng.lng}</p> <button type="button" class="remove">Cancella Posizione</button> <button type="button" class="save">Salva Posizione</button>`;


  if(isPlaceable() && isBeach(e) && isInFreeSpace(e.latlng))
  {
    circle = new L.circle(e.latlng, {
    
    radius: radius,
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

function isInFreeSpace(latlng)
{
  if (getNearestReservedSpaces(latlng) <= radius*2 )
  {
    alert("Sei troppo vicino ad un altro marker, piazzati almeno a "+radius*2+" m");
    return false;
  }
  else return true;
}

function getNearestReservedSpaces(latlng)
{
  var startingPoint = latlng;
  var distMin = startingPoint.distanceTo(fakeDB[0]);
  for (var i = 1; i < fakeDB.length;i++)
  {
    if (distMin>startingPoint.distanceTo(fakeDB[i]))
    {
      distMin = startingPoint.distanceTo(fakeDB[i]);
      nearestPos = fakeDB[i];
    }
  }
  return distMin;
}

function isBeach(e)
{
  //TODO
  return true;
}

function isPlaceable ()
{
  return flag;
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
