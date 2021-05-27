
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

let torontoHoods = "https://raw.githubusercontent.com/TaylorVellios/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        onEachFeature: function(feature,layer) {
            layer.bindPopup(`<h3>${feature.properties.AREA_NAME}</h3>`).addTo(map);
        },
        color: 'blue',
        fillColor: 'yellow',
        weight: 1
    });
});
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satellite]
});


L.control.layers(baseMaps).addTo(map);