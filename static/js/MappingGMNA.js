// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.8283, -98.5795],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
};

// 1. Add a 2nd/3rd layer group for the tectonic plate data.
let allHECM = new L.LayerGroup();
let allGNMA = new L.LayerGroup();
let BothStates = new L.LayerGroup();


// 2. Add a reference to the tectonic plates group to the overlays object.
//    add a reference to the major earthquake data to the overlay object.
let overlays = {
  "HECM": allHECM,
  "GNMA": allGNMA,
  "Both": BothStates,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://raw.githubusercontent.com/Jopinson/Office_space/main/GNMAcsv.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      color: "#ff0000",
      stroke: true,
      weight: 0.5
    };
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.state);
    }
  }).addTo(allGNMA);

  // Then we add the earthquake layer to our map.
  allGNMA.addTo(map);

  // Retrieve the earthquake GeoJSON data.
d3.json("https://raw.githubusercontent.com/Jopinson/Office_space/main/HECMcsv.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      color: "#0000FF",
      stroke: true,
      weight: 0.5
    };
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
   // We create a popup for each circleMarker to display the magnitude and location of the earthquake
   //  after the marker has been created and styled.
   onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.state);
      }
    }).addTo(allHECM);

// Then we add the earthquake layer to our map.
    allHECM.addTo(map);
 });

  // Retrieve the earthquake GeoJSON data.
  d3.json("https://raw.githubusercontent.com/Jopinson/Office_space/main/Bothgeo.geojson").then(function(data) {

    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into two separate functions
    // to calculate the color and radius.
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        color: "#66ff66",
        stroke: true,
        weight: 0.5
      };
    }
  
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      // We turn each feature into a circleMarker on the map.
      pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.state);
        }
      }).addTo(BothStates);
  
  // Then we add the earthquake layer to our map.
      BothStates.addTo(map);
   });

   // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

   // Finally, we our legend to the map.
    legend.addTo(map);
}});