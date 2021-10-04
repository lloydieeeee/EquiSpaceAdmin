import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';

import DashboardScreen from './screens/DashboardScreen';
import ChatScreen from './screens/ChatScreen';
import AccountScreen from './screens/AccountScreen';

const Tab = createBottomTabNavigator();

function MyTabs({ user }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" options={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        {props => <DashboardScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Chat" options={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        {props => <ChatScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Account" options={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        {props => <AccountScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <React.Fragment>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <MyTabs user={user} />
      </NavigationContainer>
    </React.Fragment>
  )
}
