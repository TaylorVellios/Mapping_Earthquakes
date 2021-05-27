

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

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 7,
    layers: [streets]
});


// CREATING OVERLAY LAYERS
let earthquakes = new L.layerGroup();
let overlays = {
    Earthquakes: earthquakes
}


let earthquakes_7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(earthquakes_7days).then(function(data) {
  console.log(data);

  function makeStyle(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
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

function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  };

// Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        pointToLayer: function(feature, coord) {
            return L.circleMarker(coord);
        },
        style: makeStyle,

        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag} <br>Location: ${feature.properties.place}`);
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
});


//MAKING LEGEND
let legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
    ];

    magnitudes.forEach((i) => {
        console.log(colors[i]);
        div.innerHTML += 
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    });
    return div;
};

legend.addTo(map);



L.control.layers(baseMaps, overlays).addTo(map);