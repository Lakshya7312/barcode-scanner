import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScanScreen extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: "normal",
      scanned: false,
    });
  };

  handleBarcodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require("../assets/scanner.jpg")}
              style={styles.image}
            />
            <Text style={styles.headerText}>Bar Code Scanner</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.getCameraPermissions()}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
  },

  image: {
    alignSelf: "center",
    width: 100,
    height: 100,
    marginTop: 150,
    marginLeft: -50,
  },

  headerText: {
    fontWeight: "bold",
    fontColor: "black",
    fontSize: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  button: {
    backgroundColor: "black",
    borderColor: "white",
    width: 120,
    height: 40,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    alignSelf: "center",
  },
});
