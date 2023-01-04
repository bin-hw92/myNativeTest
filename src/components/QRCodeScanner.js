import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Camera, CameraScreen, CameraType } from "react-native-camera-kit";

const QRCodeScanner = () => {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    // 마운트 시 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Alert.alert(`QR Code`,event.nativeEvent.codeStringValue, [
      { text: "OK", onPress: () => setScaned(true) },
    ]);
    console.log(ref);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CameraScreen
          style={styles.scanner}
          ref={ref}
          cameraType={CameraType.Back} // Front/Back(default)
          // Barcode Scanner Props
          scanBarcode
          showFrame={false}
          laserColor="rgba(255, 255, 255)"
          frameColor="rgba(0, 0, 0)"
          surfaceColor="rgba(0, 0, 0)"
          onReadCode={onBarCodeRead}
        />
      </View>
    </SafeAreaView>
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
