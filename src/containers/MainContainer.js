import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Counter from "../components/Counter";
import QRCodeScanner from "../components/QRCodeScanner";
import QRView from "../components/QRView";
import TodoContainer from "./TodoContainer";


const MainContainer = () => {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  const onReset = () => setCount(0);

  const onBarCodeRead = (event) => {
    setIsOpen(true);
    setToken(event.nativeEvent.codeStringValue);
  };

  return (
    <>
    {state === 0 && 
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => setState(1)} >
        <Text style={{color: '#ffffff'}}>QR Reader</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => setState(2)} >
        <Text style={{color: '#ffffff'}}>Counter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => setState(3)} >
        <Text style={{color: '#ffffff'}}>할일 목록</Text>
      </TouchableOpacity>
    </View>
    }
    {state === 1 && 
    <View>
      <Button title="Main" onPress={() => setState(0)} />
      {!isOpen? 
        <QRCodeScanner onBarCodeRead={onBarCodeRead} /> : 
        <QRView   
          isOpen={isOpen}
          token={token}
          setIsOpen={setIsOpen}
        />
      }
    </View>
    }
    {state === 2 && 
    <View style={styles.wrap}>
      <Button title="Main" onPress={() => setState(0)} />
      <Counter 
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onReset={onReset}
      />
    </View>
    }
    {state === 3 && 
    <View style={styles.wrap}>
      <Button title="Main" onPress={() => setState(0)} />
      <TodoContainer />
    </View>
    }
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