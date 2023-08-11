import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import NavigationView from "./NavigationView";
import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";
import * as Location from "expo-location";

const ContentView = () => {
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoFoward] = useState(false);
  const [html, setHtml] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [index, indexLoadingError] = useAssets(
    require("../assets/leaflet.html")
  );

  const handleBackPress = () => {
    webViewRef.current.goBack();
  };

  const handleForwardPress = () => {
    webViewRef.current.goForward();
  };

  if (index) {
    readAsStringAsync(index[0].localUri).then((data) => {
      setHtml(data);
    });
  }

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
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
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
      <NavigationView
        onBackPress={handleBackPress}
        onForwardPress={handleForwardPress}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
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
