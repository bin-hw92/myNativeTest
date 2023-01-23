import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const MainContainer = ({route, navigation}) => {

  return (
    <>
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.push('Qrcode')} >
        <Text style={{color: '#ffffff'}}>QR Reader</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.push('Counter')} >
        <Text style={{color: '#ffffff'}}>Counter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.push('TodoList')} >
        <Text style={{color: '#ffffff'}}>할일 목록</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.push('Random')} >
        <Text style={{color: '#ffffff'}}>랜덤 뽑기</Text>
      </TouchableOpacity>
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: "#eaeaea"
  },
  buttonStyle: {
    marginVertical: 15,
    width: '100%',
    height: 60,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainContainer;