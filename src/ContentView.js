import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapaLeaflet from "./MapaLeaflet";

const ContentView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapaLeaflet
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      ) : null}
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
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
