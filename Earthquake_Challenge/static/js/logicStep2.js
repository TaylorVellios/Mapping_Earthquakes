
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'streets-v11'

});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY,
        id: 'satellite-streets-v11'
    
    });

let baseMaps = {
    'Streets': streets,
    'Satellite Streets': satellite
}

let earthquakes_7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(earthquakes_7days).then(function(data) {
  console.log(data);

  function makeStyle(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: '#ffae42',
        color: '#000000',
        radius: getRad(feature.properties.mag),
        stroke: true,
        weight: 0.5
    }
};

function getRad(mag) {
    if (mag === 0) {
        return 1;
    }
    return mag * 4
};

// Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        pointToLayer: function(feature, coord) {
            return L.circleMarker(coord);
        },
        style: makeStyle
    }).addTo(map);
});

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 7,
    layers: [streets]
});


L.control.layers(baseMaps).addTo(map);