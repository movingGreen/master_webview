import React from "react";
import WebView from "react-native-webview";

const MapaLeaflet = ({ latitude, longitude }) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1" />
  
      <title>Quick Start - Leaflet</title>
  
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="docs/images/favicon.ico" />
  
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin="" />
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
  
      <style>
        html,
        body {
          height: 100%;
          margin: 0;
        }
        .leaflet-container {
          height: 400px;
          width: 600px;
          max-width: 100%;
          max-height: 100%;
        }
      </style>
    </head>
    <body>
      <div
        id="map"
        style="width: 100%; height: 100%"></div>
      <script>
        // const lat = -15.5729789;
        // const long = -56.0355887;
  
        const lat = ${JSON.stringify(latitude)}
        const long = ${JSON.stringify(longitude)}

        var map = L.map("map").setView([lat, long], 13);
  
        var tiles = L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ).addTo(map);
  
        var marker = L.marker([lat, long])
          .addTo(map)
          .bindPopup("<b>Hello world!</b><br />I am a popup.")
          .openPopup();
  
        var circle = L.circle([lat, long], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500,
        })
          .addTo(map)
          .bindPopup("I am a circle.");
  
        var polygon = L.polygon([
          [lat + 0.02, long - 0.02],
          [lat + 0.03, long ],
          [lat + 0.01, long ],
          [lat + 0.012, long - 0.01],
        ])
          .addTo(map)
          .bindPopup("I am a polygon.");
  
        var popup = L.popup()
          .setLatLng([lat, long])
          .setContent("I am a standalone popup.")
          .openOn(map);
  
        function onMapClick(e) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
        }
  
        map.on("click", onMapClick);
      </script>
    </body>
  </html>`;

  const 

  return (
    <WebView
      source={{ html }}
      originWhitelist={["*"]}
      ref={(r) => (webRef = r)}
      onMessage={(event) => {}}
    />
  );
};

export default MapaLeaflet;
