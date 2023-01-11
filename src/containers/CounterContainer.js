import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Counter from "../components/Counter";


const CounterContainer = ({route, navigation}) => {
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  const onReset = () => setCount(0);

  return (
    <View style={styles.wrap}>
      <Counter
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onReset={onReset}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: "#eaeaea"
  }
});

export default CounterContainer;