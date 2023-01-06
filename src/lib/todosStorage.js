import AsyncStorage from "@react-native-community/async-storage";

const todosStorage = {
  async get(key) {
    try {
      const rawTodos = await AsyncStorage.getItem(key);
      if(!rawTodos){
        //저장된 데이터가 없으면
        throw new Error('No saved todos');
      }

      const saedTodos = JSON.parse(rawTodos);
      return saedTodos;
    } catch (error) {
      throw new Error('Failed to load todos');
    }
  },
  async set(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error('Failed to save todos');
    }
  },
};

export default todosStorage;