import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NavigationView = ({
  onBackPress,
  onForwardPress,
  canGoBack,
  canGoForward,
}) => (
  <View style={[styles.container, !canGoBack && !canGoForward && styles.$hide]}>
    {canGoBack && (
      <TouchableOpacity
        style={styles.button}
        onPress={onBackPress}>
        <Text style={styles.buttonTitle}>Back</Text>
      </TouchableOpacity>
    )}
    {canGoForward && (
      <TouchableOpacity
        style={styles.button}
        onPress={onForwardPress}>
        <Text style={styles.buttonTitle}>Forward</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default NavigationView;

const styles = {
  $hide: { display: "none" },
  container: {
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {},
  buttonTitle: {
    color: "#fff",
    fontSize: 20,
  },
};
