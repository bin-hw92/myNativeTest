import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as Api from "../api/booking";


const QRView = ({
  isOpen,
  token,
  setIsOpen
}) => {
  const [bookingItem, setBookingItem] = useState({});
  const handleHotel = async() => {
    try {
      const res = await Api.selectBooking({token});
      setBookingItem(res?.data);
    } catch (e) {
      Alert.alert('Error', '', [
        { text: "OK", onPress: () => setIsOpen(false) },
      ]);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setBookingItem({});
  }

  useEffect(() => {
    if(isOpen){
      handleHotel();
    }
  },[isOpen, token]);

  return (
    <View>
      <Text>예약이 확인되었습니다.</Text>
      <Text>{bookingItem.id}</Text>
      <Button title="초기화" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default QRView;