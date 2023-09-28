import React, { useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native";
import WebView from "react-native-webview";
import { AppContext } from "./AppContext";
import { useAssets } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";

const MapaLeaflet = ({ latitude, longitude }) => {
  const { latitudeState, longitudeState, mostraMapa } = useContext(AppContext);

  const [index, indexLoadingError] = useAssets(
    require("../assets/Lib/mapaLeaflet.html")
  );

  const [html, setHtml] = useState("");

  if (index) {
    readAsStringAsync(index[0].localUri).then((data) => {
      setHtml(data);
    });
  }

  const [latitudeStateWebview, setLatitudeStateWebview] = useState(latitude);
  const [longitudeStateWebview, setLongitudeStateWebview] = useState(longitude);

  let webRef;

  function onMessage(data) {
    alert(data.nativeEvent.data);
  }

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

  // const teste = await import("../Lib/Leaflet.js");

  return (
    <>
      <WebView
        javaScriptEnabled={true}
        source={{ html }}
        originWhitelist={["*"]}
        ref={(r) => (webRef = r)}
        onMessage={onMessage}
      />
      <Text>Latitude: {latitudeStateWebview}</Text>
      <Text>Longitude: {longitudeStateWebview}</Text>
    </>
  );
};

export default MapaLeaflet;
