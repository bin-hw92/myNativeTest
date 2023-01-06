import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as Api from "../api/booking";
import todosStorage from "../lib/todosStorage";


const QRView = ({
  isOpen,
  token,
  setIsOpen
}) => {
  const [bookingItem, setBookingItem] = useState({});
  const handleHotel = async() => {
    try {
      const header_token = await todosStorage.get('api_key');
      const res = await Api.selectBooking({token, header_token});
      setBookingItem(res?.data);
      console.log(res?.data);
    } catch (error) {
      const message = `${error?.response?.data?.code}:${error?.response?.data?.message}`;
      Alert.alert('Error', message, [
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
    <View style={styles.bookingWrap}>
      <View style={styles.bookingTxt}>
        <Text>예약이 확인되었습니다.</Text>
      </View>
      <View style={styles.bookingTxt2}>
        <Text>호텔명:{bookingItem?.hotel?.name}</Text>
        <Text>예약자명:{bookingItem?.user?.name}</Text>
        <Text>객실:{bookingItem?.room?.name}</Text>
      </View>
      <Button title="초기화" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  bookingWrap: {
    flex: 1,
  },
  bookingTxt: {
    paddingHorizontal: 10,
  },
  bookingTxt2: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
});

export default QRView;