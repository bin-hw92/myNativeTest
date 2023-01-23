import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RandomInput from '../components/RandomInput';
import RandomList from '../components/RandomList';
import Dialog from 'react-native-dialog';
import Spin from '../components/Spin';

const RandomContainer = ({route, navigation}) => {
  const [randomItems, setRandomItems] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [spinFlag, setSpinFlag] = useState(false);
  const [result, setResult] = useState('');

  const onInsert = (text) => {
    const nextId = randomItems.length > 0? Math.max(...randomItems.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
    };

    setRandomItems(randomItems.concat(todo));
  };

  const onRandom = () => {
    const len = randomItems.length;
    const ran = Math.floor(Math.random() * len)+1;
    const answer = randomItems.filter(item => item.id === ran);
    setResult(answer[0].text);
    setSpinFlag(true);
    setTimeout(() => {
      setModalFlag(true);
      setSpinFlag(false);
    }, 1000);
  }

  const onReset = () => {
    setRandomItems([]);
    setResult('');
  }

  const handleCancel = () => {
    setModalFlag(false);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding' : undefined}
          style={styles.avoid}
        >
          {randomItems.length > 0 && 
            <View style={styles.buttonWrap}>
              <TouchableOpacity style={styles.buttonStyle} onPress={onRandom}>
                <Text style={{color: '#ffffff'}}>랜덤 뽑기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle2} onPress={onReset}>
                <Text style={{color: '#ffffff'}}>초기화</Text>
              </TouchableOpacity>
            </View>
            
          }
          <RandomList randomItems={randomItems} />
          <RandomInput onInsert={onInsert}/>
        </KeyboardAvoidingView>
        {modalFlag && 
          <View>
            <Dialog.Container visible={true} onRequestClose={handleCancel} onBackdropPress={handleCancel}>
              <Dialog.Description>
                <Text>{result}</Text>
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={handleCancel} />
            </Dialog.Container>
          </View>
        }
        {spinFlag && <Spin />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
  buttonWrap: {
    flexDirection: 'row',
  },
  buttonStyle: {
    width: '50%',
    height: 40,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2: {
    width: '50%',
    height: 40,
    backgroundColor: '#c1c1c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RandomContainer;
