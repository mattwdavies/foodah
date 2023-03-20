/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
const { Amplify } = require('aws-amplify');
const { Auth } = require('aws-amplify');

import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Navigation from './src/navigation';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
