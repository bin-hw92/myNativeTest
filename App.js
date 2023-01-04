import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import MainContainer from './src/containers/MainContainer';

const App = () => {
  
  return (
      <View style={styles.wrap}>
        <MainContainer />
      </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  }
});

export default App;
