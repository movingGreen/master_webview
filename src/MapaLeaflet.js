import React, { useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native";
import WebView from "react-native-webview";
import { AppContext } from "./AppContext";
import L from "./LeafletCode";

const MapaLeaflet = ({ latitude, longitude }) => {
  const { latitudeState, longitudeState, mostraMapa } = useContext(AppContext);

  const [latitudeStateWebview, setLatitudeStateWebview] = useState(latitude);
  const [longitudeStateWebview, setLongitudeStateWebview] = useState(longitude);

  let webRef;
  let marker = ({}) => {
    return `
      var marker = L.marker([lat, long])
      .addTo(map)
      .bindPopup("<b>Hello world!</b><br />I am a popup.")
      .openPopup();
    `;
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"  
          content="width=device-width, initial-scale=1" />
    
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
          style="width: 100%; height: 100%">
        </div>
        <script>            
            const lat = ${JSON.stringify(latitudeStateWebview)}
            const long = ${JSON.stringify(longitudeStateWebview)}
            
            var map = L.map("map").setView([lat, long], 18);
            
            var tiles = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              maxZoom: 19,
              attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
            ).addTo(map);
            
            ${marker}
            
            var circle = L.circle([lat + 0.04, long ], {
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
            return map
          
          
          
          </script>
          </body>
    </html>`;
  useEffect(() => {
    setLatitudeStateWebview(latitudeState);
    setLongitudeStateWebview(longitudeState);
    console.log(
      `\nWebview lat e long = ${latitudeStateWebview} - ${longitudeStateWebview}`
    );
  }, [latitudeState, longitudeState]);

  useEffect(() => {
    webRef.reload();
  }, [mostraMapa]);

  return (
    <>
      <WebView
        source={{ html }}
        originWhitelist={["*"]}
        ref={(r) => (webRef = r)}
        onMessage={(event) => {}}
      />
      <Text>Latitude: {latitudeStateWebview}</Text>
      <Text>Longitude: {longitudeStateWebview}</Text>
    </>
  );
};

export default MapaLeaflet;
