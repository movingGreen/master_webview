import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import NavigationView from "./NavigationView";
import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";
import * as Location from "expo-location";
// import * as mapaLeaflet from "../assets/leaflet";

const ContentView = () => {
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoFoward] = useState(false);
  const [html, setHtml] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // pega o arquivo html
  // const [index, indexLoadingError] = useAssets(
  //   require("../assets/leaflet.html")
  // );

  // if (index) {
  //   readAsStringAsync(index[0].localUri).then((data) => {
  //     setHtml(data);
  //   });
  // }

  // const handleBackPress = () => {
  //   webViewRef.current.goBack();
  // };

  // const handleForwardPress = () => {
  //   webViewRef.current.goForward();
  // };

  // pega a localizacao
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let mostrarMapa = false;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

    // script para enviar latitude e longitude para a pagina html
    const mapaLocUsuario = `
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
          // const lat = 51.511948;
          // const long = -0.088749;  
          
          const lat = ${location.latitude};
          const long = ${location.longitude};

          var map = L.map("map").setView([lat, long], 13);

          var tiles = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
          ).addTo(map);

          var marker = L.marker([lat + 0.5, long - 0.09])
            .addTo(map)
            .bindPopup("<b>Hello world!</b><br />I am a popup.")
            .openPopup();

          var circle = L.circle([lat + 0.508, long - 0.11], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 500,
          })
            .addTo(map)
            .bindPopup("I am a circle.");

          var polygon = L.polygon([
            [lat + 0.509, long - 0.08],
            [lat + 0.503, long - 0.06],
            [lat + 0.51, long - 0.047],
          ])
            .addTo(map)
            .bindPopup("I am a polygon.");

          var popup = L.popup()
            .setLatLng([lat + 0.513, long - 0.09])
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
    </html>
    `;

    setHtml(mapaLocUsuario);
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        originWhitelist={["*"]}
        onNavigationStateChange={(state) => {
          const back = state.canGoBack;
          const forward = state.canGoForward;
          setCanGoBack(back);
          setCanGoFoward(forward);
        }}
      />

      <Text>{text}</Text>
      {/* <NavigationView
        onBackPress={handleBackPress}
        onForwardPress={handleForwardPress}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      /> */}
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
