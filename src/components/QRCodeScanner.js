import AsyncStorage from "@react-native-community/async-storage";
import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { CameraScreen, CameraType } from "react-native-camera-kit";

const QRCodeScanner = ({onBarCodeRead}) => {
  const ref = useRef(null);

  return (
      <View style={styles.container}>
        <CameraScreen
          style={styles.scanner}
          ref={ref}
          cameraType={CameraType.Back} // Front/Back(default)
          // Barcode Scanner Props
          scanBarcode
          showFrame={true}
          laserColor="rgba(255, 255, 255)"
          frameColor="rgba(0, 0, 0)"
          surfaceColor="rgba(0, 0, 0)"
          onReadCode={onBarCodeRead}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scanner: { flex: 1 },
});

export default QRCodeScanner;
