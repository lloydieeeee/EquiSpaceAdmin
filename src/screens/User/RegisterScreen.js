import React, { useState } from 'react'
import { Button, Dimensions, StyleSheet, TextInput, View } from 'react-native';

import auth from '@react-native-firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleRegister(userEmail, userPass) {
    if(userEmail && userPass !== null) {
      auth()
      .createUserWithEmailAndPassword(userEmail, userPass)
      .then(() => {
        console.log('User successfully registered');
      })
      .catch((error) => {
        console.error(error);
      })
    } else {
      alert('Please fill all the required fields.', 'OK');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          numberOfLines={1}
          autoCorrect={false}
          style={styles.input}
          value={email}
          onChangeText={userEmail => setEmail(userEmail)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={userPassword => setPassword(userPassword)}
        />
      </View>
      <View style={styles.button}>
        <Button title="Register" onPress={() => handleRegister(email, password)} />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').height / 20,
    marginBottom: 10,
  }
});