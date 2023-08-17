import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapaLeaflet from "./MapaLeaflet";
import { StatusBar } from "expo-status-bar";

const ContentView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [textLatitude, SetTextLatitude] = useState("Waiting..");
  const [textLongitude, SetTextLongitude] = useState("Waiting..");

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
      console.log(location.coords.latitude + "\n" + location.coords.longitude);
      setMostrarMapa(true);

      if (errorMsg) {
        latitude = errorMsg;
      } else if (location) {
        SetTextLatitude(JSON.stringify(location.coords.latitude));
        SetTextLongitude(JSON.stringify(location.coords.longitude));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {mostrarMapa && (
        <MapaLeaflet
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      )}
      <Text>Latitude: {textLatitude}</Text>
      <Text>Longitude: {textLongitude}</Text>
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
