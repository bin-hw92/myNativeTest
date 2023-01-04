import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Counter from "../components/Counter";
import QRCodeScanner from "../components/QRCodeScanner";


const MainContainer = () => {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return (
    <>
    {state === 0 && 
    <View style={styles.wrap}>
      <Button style={styles.button} title="QR Reader" onPress={() => setState(1)} />
      <Button style={styles.button} title="Counter" onPress={() => setState(2)} />
      <Button style={styles.button} title="할일 목록" onPress={() => setState(3)} />
    </View>
    }
    {state === 1 && 
    <View>
      <Button style={styles.button} title="Main" onPress={() => setState(0)} />
      <QRCodeScanner />
    </View>
    }
    {state === 2 && 
    <View style={styles.wrap}>
      <Button style={styles.button} title="Main" onPress={() => setState(0)} />
      <Counter 
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </View>
    }
    {state === 3 && 
    <View style={styles.wrap}>
      <Button style={styles.button} title="Main" onPress={() => setState(0)} />
      <Counter 
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
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
  button: {
    marginVertical: 10,
  },
});

export default MainContainer;