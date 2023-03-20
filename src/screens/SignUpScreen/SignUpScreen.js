import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^([+]\d{2})?\d{10}$/;
const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    const { email, password, phone, name } = data;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { phone_number: phone, name },
      });
      navigation.navigate('ConfirmEmail', { email });
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onConfirmEmailPress = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />
        <CustomInput
          name="name"
          control={control}
          placeholder="Full Name"
          rules={{
            required: 'Name is required',
          }}
        />
        <CustomInput
          name="phone"
          control={control}
          placeholder="Phone Number"
          rules={{
            required: 'Phone number is required',
            pattern: { value: PHONE_REGEX, message: 'Phone is in invalid format' },
          }}
        />

        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton text="Have an account? Sign in" onPress={onSignInPress} type="TERTIARY" />
        <CustomButton text="Need to confirm an account?" onPress={onConfirmEmailPress} type="TERTIARY" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
