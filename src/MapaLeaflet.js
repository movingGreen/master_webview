import React, { useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native";
import WebView from "react-native-webview";
import { AppContext } from "./AppContext";
import { Asset } from "expo-asset";

function marker(lat, long, texto) {
  let textoMarker = texto && `<b>Hello world!</b><br />I am a popup.`;

  return `
    
    var marker = L.marker([${lat}, ${long}])
    .addTo(map)
    .bindPopup(${textoMarker})
    .openPopup();

  `;
}

const MapaLeaflet = ({ latitude, longitude }) => {
  const { latitudeState, longitudeState, mostraMapa } = useContext(AppContext);

  const [latitudeStateWebview, setLatitudeStateWebview] = useState(latitude);
  const [longitudeStateWebview, setLongitudeStateWebview] = useState(longitude);

  let webRef;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta 
          name="viewport" 
          content="width=device-width, 
            initial-scale=1.0, 
            maximum-scale=1.0, 
            user-scalable=no"/>
    
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

            var myLines = [{
              "type": "LineString",
              "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
            }, {
              "type": "LineString",
              "coordinates": [[-105, 40], [-105, 45], [-115, 55]]
            }]

            var myStyle = {
              "color": "#ff7800",
              "weight": 5,
              "opacity": 0.65
            };

            const lat = ${latitudeStateWebview}
            const long = ${longitudeStateWebview}
            
            map = L.map("map").setView([lat, long], 19);
            var map = new L.Map('map', {
              'center': [lat, long],
              'zoom': 19
            })

            L.geoJSON(myLines, {
              style: myStyle
            }).addTo(map);

            // jQuery ajax request
            $.ajax({
              url with your geojson data file
              'url': 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR',

              return json object, not as string
              'dataType': 'json',

              on success handle result
              'success': function (result) {

                var layer = new L.GeoJSON(result).addTo(map);
                map.fitBounds(layer.getBounds());
              }
            });


            // var circle = L.circle([lat + 0.04, long ], {
            //   color: "red",
            //   fillColor: "#f03",
            //   fillOpacity: 0.5,
            //   radius: 500,
            // })
            //   .addTo(map)
            //   .bindPopup("I am a circle.");
            
            // var polygon = L.polygon([
            //   [lat + 0.02, long - 0.02],
            //   [lat + 0.03, long ],
            //   [lat + 0.01, long ],
            //   [lat + 0.012, long - 0.01],
            // ])
            //   .addTo(map)
            //   .bindPopup("I am a polygon.");

            // L.marker([lat, long]).addTo(map);

            // marker.bindPopup(popupContent).openPopup();

            // function onMapClick(e) {
            //   popup
            //   .setLatLng(e.latlng)
            //   .setContent("You clicked the map at " + e.latlng.toString())
            //   .openOn(map);
            // }  

            // function onLocationError(e) {
            //   alert(e.message);
            // }

            map.on("click", onMapClick);
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
