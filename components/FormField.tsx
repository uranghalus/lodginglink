import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { icons } from '@/constants/icons';
interface formProps {
  title: string;
  value: any;
  handleChangeText: any;
  otherStyle?: any;
}
const FormField: React.FC<formProps> = ({
  handleChangeText,
  title,
  value,
  otherStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, otherStyle]}>
      <Text style={styles.labelInput}>{title}</Text>
      <View style={[styles.inputContainer, isFocused && styles.focusedInput]}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={title}
          placeholderTextColor={'#7b7b8b'}
          onChange={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={!showPassword ? icons.eye : (icons.eyeoff as any)}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  labelInput: {
    fontSize: 16,
    color: Colors.black.DEFAULT,
    fontFamily: 'Inter-Medium',
    marginBottom: 6,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#ACA9BB',
    alignItems: 'center',
  },
  focusedInput: {
    backgroundColor: '#fff',
    borderColor: Colors.primary,
  },
  input: {
    height: 40,
    flex: 1,
    color: Colors.black.SECONDARY,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    width: '100%',
  },
  icon: {
    fontSize: 24,
    color: Colors.black.SECONDARY,
  },
});
