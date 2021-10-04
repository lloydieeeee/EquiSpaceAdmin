import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function EditUserScreen({ navigation, user }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  function handleSubmit(id, email) {
    firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        // console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          // console.log('User data: ', documentSnapshot.data());
          firestore()
            .collection('Users')
            .doc(id)
            .update({
              firstName: firstName !== null ? firstName : documentSnapshot.data().firstName,
              lastName: lastName !== null ? lastName : documentSnapshot.data().lastName,
            })
            .then(() => {
              console.log('User Updated!');
              navigation.replace('Detail');
            });
        } else {
          firestore()
            .collection('Users')
            .doc(id)
            .set({
              emailAddress: email,
              firstName: firstName,
              lastName: lastName,
            })
            .then(() => {
              console.log('User added!');
              navigation.replace('Detail');
            });
        }
      });
  };

  return (
    <View>
      <TextInput
        autoFocus={true}
        placeholder="Input your First Name"
        value={firstName}
        onChangeText={fName => setFirstName(fName)}
      />
      <TextInput
        placeholder="Input your Last Name"
        value={lastName}
        onChangeText={lName => setLastName(lName)}
      />
      <Button
        title="Done"
        onPress={() => handleSubmit(user.uid, user.email)}
      />
    </View>
  )
}
