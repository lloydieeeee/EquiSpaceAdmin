import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import { useIsFocused } from '@react-navigation/core';

import UserDetailScreen from './Account/UserDetailScreen';
import EditUserScreen from './Account/EditUserScreen';

import LoginScreen from './User/LoginScreen';
import RegisterScreen from './User/RegisterScreen';

const Stack = createStackNavigator();

export default function AccountScreen({ user }) {
  const isFocused = useIsFocused();
  const [clicked, setClicked] = useState(false);

  function handleClicked() {
    setClicked(true);
  };

  useEffect(() => {
    if(clicked && isFocused) {
      setClicked(false);
    }
  }, [isFocused]);

  if (!user) {
    if (!clicked) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button title="Login / Register" onPress={handleClicked} />
        </View>
      );
    }
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Detail" options={{headerShown: false}}>
        {props => <UserDetailScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Edit" options={{headerShown: false}}>
        {props => <EditUserScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
