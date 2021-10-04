import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Item/HomeScreen';
import ItemScreen from './Item/ItemScreen';

const Stack = createStackNavigator();

export default function DashboardScreen({ user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{headerShown: false}}>
        {props => <HomeScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Upload" component={ItemScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

