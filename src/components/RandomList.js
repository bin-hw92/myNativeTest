import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RandomList = ({randomItems}) => {
  return (
    randomItems.length === 0 ? (
      <View style={styles.block}>
        <Text>내용이 없습니다.</Text>
      </View>
    ) : (
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
        data={randomItems}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    )

  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default RandomList;