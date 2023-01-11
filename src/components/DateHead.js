import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const DateHead = ({date, onDate}) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <View style={styles.block}>
      <Button title='이전' onPress={() => onDate(-1)} />
      <Text style={styles.dateText}>
        {year}년 {month}월 {day}일
      </Text>
      <Button title='다음' onPress={() => onDate(1)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#26a69a',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  }
});

export default DateHead;