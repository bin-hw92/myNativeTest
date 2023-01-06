import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Counter from "../components/Counter";
import QRCodeScanner from "../components/QRCodeScanner";
import QRView from "../components/QRView";
import TodoContainer from "./TodoContainer";
import todosStorage from "../lib/todosStorage";


const MainContainer = () => {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scaned, setScaned] = useState(true);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  const onReset = () => setCount(0);

  const onBarCodeRead = async(event) => {
    const event_token = event.nativeEvent.codeStringValue.split('@');
    if(event_token.length === 2){
      if(event_token[0] === 'Bearer'){
        try {
          if (!scaned) return;
          setScaned(false);
          await todosStorage.set('api_key', event_token[1]);

          Alert.alert(`로그인`, '로그인 토큰이 저장되었습니다.', [
            { text: "OK", onPress: () => setScaned(true) },
          ]);
          return;
        } catch (error) {
          throw new Error('Failed to load todos');
        }
      }
      setIsOpen(true);
      setToken(event.nativeEvent.codeStringValue);
    }else{
      if (!scaned) return;
      setScaned(false);
      Alert.alert(`QR Code`,event.nativeEvent.codeStringValue, [
        { text: "OK", onPress: () => setScaned(true) },
      ]);
    }
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
    <View style={styles.wrap2}>
      <Button title="Main" onPress={() => setState(0)} />
      {!isOpen && scaned &&
        <QRCodeScanner onBarCodeRead={onBarCodeRead} />
      }
      {isOpen && 
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
  wrap2: {
    flex: 1,
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