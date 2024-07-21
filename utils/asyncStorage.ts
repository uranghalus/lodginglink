import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error Storing Value: ', error);
  }
};
export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('Error Retrieving Value: ', error);
  }
};
export const removeItem = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error Remove Value: ', error);
  }
};
