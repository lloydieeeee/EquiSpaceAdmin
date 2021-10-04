import React, { useState } from 'react'
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

import UploadScreen from './UploadScreen';

export default function ItemScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  function selectImage() {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo'
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
      }
    })
  }

  async function uploadImage() {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    setUploading(true);
    setTransferred(0);

    // const task = storage()
    //   .ref(filename)
    //   .putFile(uploadUri);
    
    // task.on('state_changed', snapshot => {
    //   const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes);
    //   setTransferred(progress);
    // });

    // try {
    //   await task;
    // } catch (e) {
    //   console.error(e);
    // }

    setUploading(false);

    Alert.alert(
      'Upload Successfully!',
      'Nice Item!'
    );

    setImage(null);
    Keyboard.dismiss();
    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <UploadScreen selectImage={selectImage} uploadImage={uploadImage} image={image} uploading={uploading} transferred={transferred} />
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={uploadImage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  }
});
