import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import { Content, Form, Item, Input, Label, Button, Textarea, Container, Icon, Footer } from 'native-base';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';


const Stack = createStackNavigator();

export default class CCAddNewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      notesArr: [],
      id: "",
      date: new Date().getDate(),
      title: "",
      description: "",
      image: null,
      until: new Date().getDate()
    }
  }

  componentDidMount = () => {
    this.getData();
    this.fullDate();
  }

  fullDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    this.setState({ date: day + '-' + month + '-' + year })
  }

  addNote = () => {
    let newNote = {
      id: this.state.notesArr.length + 1,
      date: this.state.date,
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      until: this.state.until
    }
    this.props.route.params.addNote(newNote);
    this.props.navigation.goBack();
  }

  getData = async () => {
    try {
      let temp = await AsyncStorage.getItem('category')
      let getCategoryAS = JSON.parse(temp);
      let notes = getCategoryAS[this.props.route.params.categoryKey].notes;
      this.setState({ categoriesArr: getCategoryAS, notesArr: notes });
    }
    catch (e) {
      console.log("GET - error NOTES", e);
    }
  }

  btnOpenGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("RESULT: ", permission);
    if (permission.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true })

    console.log(result);

    if (result.cancelled === true) {
      return;
    }
    this.setState({ image: result.uri });
  }

  btnOpenCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    console.log("RESULT: ", permission);
    if (permission.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (result.cancelled === true) {
      return;
    }
    this.setState({ image: result.uri });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item style={{ padding: 10 }}>
              <Input onChangeText={(text) => this.setState({ title: text })} placeholder="Note Title" />
            </Item>
            <Textarea onChangeText={(text) => this.setState({ description: text })} rowSpan={5} bordered placeholder="Note Description" />
            <Item style={{ alignItems: 'center', padding: 10 }}>
              <DatePicker
                style={{ marginLeft: 'auto' }}
                date={this.state.until}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={this.state.date}
                maxDate="31-12-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ until: date }) }}
              />
            </Item>
            <View>
                {this.state.image &&
                  <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
              </View>
            <Item style={{ justifyContent: 'center', padding: 10 }}>
              <Button style={{ backgroundColor: '#ff5e5b', margin: 'auto', padding: 10 }} onPress={() => { this.btnOpenCamera()}}>
                <Icon name='camera' style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }}>Camera</Text>
              </Button>
              <Text>   </Text>
              <Button style={{ backgroundColor: '#ff5e5b', margin: 'auto', padding: 10 }} onPress={() => { this.btnOpenGallery()}}>
                {/* {console.log("IMG URI ADD-NEW-NOTE: ", this.state.image)} */}
                <Icon name='image' style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }}>Gallery</Text>
              </Button>
              
            </Item>
          </Form>
        </Content>
        <Item style={{ justifyContent: 'center', padding: 10 }}>
          <Button style={{ margin: 5, backgroundColor: '#42bd79', marginBottom: 30 }} onPress={this.addNote} >
            <Icon name='checkmark' style={{ color: '#ffffff' }} />
          </Button>
        </Item>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
