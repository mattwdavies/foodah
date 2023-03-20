import React from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const Home = (props) => {
  const user = props.route.params.user.attributes;

  const signOut = () => {
    Auth.signOut();
  };
  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: 'center' }}>Hello {user.name}</Text>
      <Text
        onPress={signOut}
        style={{ width: '100%', textAlign: 'center', color: 'red', marginVertical: 20, fontSize: 20 }}
      >
        Sign Out
      </Text>
    </View>
  );
};

export default Home;
