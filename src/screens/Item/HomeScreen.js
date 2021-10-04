import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen({ navigation, user }) {
  if (!user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Dashboard</Text>
      </View>
    );
  }
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
        <Text style={styles.addImageText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addImageText: {
    position: 'absolute',
    top: 25,
    left: '75%',
    color: 'black',
    fontSize: 15
  }
})