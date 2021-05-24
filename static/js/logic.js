// An array containing each city's location, state, and population.
let cities = [{
    location: [40.7128, -74.0059],
    city: "New York City",
    state: "NY",
    population: 8398748
  },
  {
    location: [41.8781, -87.6298],
    city: "Chicago",
    state: "IL",
    population: 2705994
  },
  {
    location: [29.7604, -95.3698],
    city: "Houston",
    state: "TX",
    population: 2325502
  },
  {
    location: [34.0522, -118.2437],
    city: "Los Angeles",
    state: "CA",
    population: 3990456
  },
  {
    location: [33.4484, -112.0740],
    city: "Phoenix",
    state: "AZ",
    population: 1660272
  }
  ];
console.log('working');

let map = L.map('mapid').setView([39.0522, -95.2437], 5);


cities.forEach(i => make_marker(i));

//  Add a marker to the map for Los Angeles, California.
function make_marker(obj) {
    L.circleMarker(obj.location, 
        {
        radius: obj.population/100000,
        color: 'orange',
        fillColor: 'orange',
        lineweight: 4
        })
    .bindPopup("<h2>" + obj.city + ", " + obj.state + "</h2> <hr> <h3> Population: " + obj.population.toLocaleString() + "</h3>")
    .addTo(map);
};

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'mapbox/dark-v10'

});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);