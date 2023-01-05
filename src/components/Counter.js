import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


const Counter = ({count, onIncrease, onDecrease, onReset}) => {

  return (
    <View style={styles.wrapper}>
      <View style={styles.numberArea}>
        <TouchableOpacity style={styles.deleteButton} onPress={onReset}>
          <Icon name="delete-outline" size={32} color="red" />
        </TouchableOpacity>
        <Text style={styles.number}>{count}</Text>
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.buttonStyle} onPress={onIncrease}>
          <Text style={{color: '#ffffff'}}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={onDecrease}>
          <Text style={{color: '#ffffff'}}>-1</Text>
        </TouchableOpacity>        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  numberArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 72,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: "absolute",
    top: 15,
    right: 0,
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 24,
    overflow: 'hidden',
  },
  buttonWrap: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical: 15,
    width: '100%',
    height: 60,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Counter;