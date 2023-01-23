import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from './src/containers/MainContainer';
import QrCodeContainer from './src/containers/QrCodeContainer';
import CounterContainer from './src/containers/CounterContainer';
import TodoContainer from './src/containers/TodoContainer';
import RandomContainer from './src/containers/RandomContainer';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={MainContainer} 
          options={{
            title: '홈',
          }}
        />
        <Stack.Screen 
          name="Qrcode" 
          component={QrCodeContainer}
          options={{
            title: 'QR Reader',
          }}
        />
        <Stack.Screen 
          name="Counter" 
          component={CounterContainer} 
          options={{
            title: 'Counter'
          }}
        />
        <Stack.Screen 
          name="TodoList" 
          component={TodoContainer}
          options={{
            title: '할일 목록'
          }}
        />
        <Stack.Screen 
          name="Random" 
          component={RandomContainer}
          options={{
            title: '랜덤 뽑기'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  }
});

export default App;
