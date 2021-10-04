import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function UserDetailScreen({ navigation, user }) {
  const [isFetching, setIsFetching] = useState(true);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  function handleLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    async function fetchMyData() {
     await firestore()
       .collection('Users')
       .doc(user.uid)
       .get()
       .then(documentSnapshot => {
         // console.log('User exists: ', documentSnapshot.exists);
         if (documentSnapshot.exists) {
           // console.log('User data: ', documentSnapshot.data());          
           setEmail(documentSnapshot.data().emailAddress)
           setFirstName(documentSnapshot.data().firstName)
           setLastName(documentSnapshot.data().lastName)
           setIsFetching(false);
         } else {
           setTimeout(() => {
            setIsFetching(false);
           }, 500);
         }
       })
    }
    fetchMyData()
   }, []);

  return (
    <View style={styles.root}>
      <View style={styles.logoutText}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{color: '#0000ff', fontWeight: '500'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editText}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={{color: '#0000ff', fontWeight: '500'}}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Email Address:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>First Name:</Text>
        <Text style={styles.info}>{isFetching ? 'Fetching the data...' : firstName !== null ? firstName : 'No First Name'}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Last Name:</Text>
        <Text style={styles.info}>{isFetching ? 'Fetching the data...' : lastName !== null ? lastName : 'No Last Name'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    top: 210,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    left: 50,
  },
  text: {
    width: 100,
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    width: 200,
  },
  editText: {
    top: 180,
    left: '80%',
  },
  logoutText: {
    top: 180,
    left: '80%',
  },
});