import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { Colors } from '@/constants/Colors';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
  });
  return (
    <SafeAreaView style={styles.page}>
      <Image
        source={require('@/assets/images/Logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Create an Account</Text>
        <Text style={styles.description}>
          Please fill in the following form to get started
        </Text>
      </View>
      <View>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e: any) => setForm({ ...form, username: e })}
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
        />
        <FormField
          title="Phone"
          value={form.phone}
          handleChangeText={(e: any) => setForm({ ...form, phone: e })}
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.light.background,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    marginTop: 25,
    width: 126,
    height: 126,
  },
  headingContainer: {
    width: '100%',
    gap: 5,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});
