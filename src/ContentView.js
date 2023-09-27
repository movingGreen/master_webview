import React, { useState, useRef, useEffect, createContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapaLeaflet from "./MapaLeaflet";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "./AppContext";

const ContentView = () => {
  const [location, setLocation] = useState(null);
  const [latitudeState, setLatitudeState] = useState(null);
  const [longitudeState, setLongitudeState] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [status, setStatus] = useState("");

  const getPermissionELocation = async () => {
    let locationData,
      errorMessage = "";
    let { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);

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
      setLatitudeState(locationData.coords.latitude);
      setLongitudeState(locationData.coords.longitude);

      if (errorMessage) {
        setErrorMsg(errorMessage);
      } else if (location) {
        setMostrarMapa(true);
      }
    })();
  }, []);

  useEffect(() => {
    const ultimaLoc = setInterval(async () => {
      try {
        // locationData = await Location.getLastKnownPositionAsync();
        locationData = await Location.getCurrentPositionAsync();
        setLocation(locationData);
        setLatitudeState(locationData.coords.latitude);
        setLongitudeState(locationData.coords.longitude);

        console.log(latitudeState + " === " + longitudeState + "\n");
      } catch (error) {
        console.error("Erro ao pegar a localizacao: ", error);
      }
    }, 10000);

    return () => clearInterval(ultimaLoc);
  }, []);

  return (
    <View style={styles.container}>
      <AppContext.Provider
        value={{ latitudeState, longitudeState, mostrarMapa }}>
        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent
        />
        {/* {mostrarMapa ? ( */}
        <MapaLeaflet
          latitude={latitudeState}
          longitude={longitudeState}
        />
        {/* // ) : null} */}
        <Text>Permissão de localizacao: {status}</Text>
        <Button
          title="Localizacao aleatoria"
          onPress={() => {
            setLatitudeState(Math.random() * 30);
            setLongitudeState(Math.random() * 30);
          }}
        />
        <Button
          title="mostrar mapa"
          onPress={() => setMostrarMapa(true)}
        />
        <Button
          title="setar latitude e long vazio"
          onPress={() => {
            setLatitudeState(" ");
            setLongitudeState(" ");
          }}
        />
      </AppContext.Provider>
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
  },
});
