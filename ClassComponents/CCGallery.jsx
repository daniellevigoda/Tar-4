import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import CCAddNewNote from './CCAddNewNote';


export default class CCGallery extends Component {
  // static navigationOptions = {
  //   title: 'Gallery',
  // };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
  }

  btnOpenGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("RESULT: ", permission);
    if (permission.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (result.cancelled === true) {
      return;
    }
    this.setState({ image: result.uri });
  }

  render() {
    let { image } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding">
        {this.btnOpenGallery()}
        <View>
          {image &&
            // <CCAddNewNote selectedImg={image.uri}/>}
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          {/* {console.log("URI:", uri)} */}
        </View>
      </KeyboardAvoidingView >
    );
  }
}
