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

  const getPermissionELocation = async () => {
    let locationData,
      errorMessage = "";
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      errorMessage = "Permission to access location was denied";
    } else {
      locationData = await Location.getCurrentPositionAsync({});
    }

    return [locationData, errorMessage];
  };

  // pega a localizacao
  useEffect(() => {
    (async () => {
      const [locationData, errorMessage] = await getPermissionELocation();
      setLocation(locationData);
      setErrorMsg(errorMessage);

      if (errorMsg) {
        latitude = errorMsg;
      } else if (location) {
        SetTextLatitude(JSON.stringify(location.coords.latitude));
        SetTextLongitude(JSON.stringify(location.coords.longitude));
        setMostrarMapa(true);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      {mostrarMapa && (
        <MapaLeaflet
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      )}
      <Text>Latitude: {textLatitude}</Text>
      <Text>Longitude: {textLongitude}</Text>
      <Text>Permissão loc: </Text>
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
