import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import { Content, Form, Item, Input, Label, Button, Textarea, Container, Icon, Text, Footer, Image } from 'native-base';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

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
      image: "",
      until: new Date().getDate()
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  addNote = () => {
    let newNote = {
      id: this.state.notesArr.length + 1,
      date: this.state.date,
      title: this.state.title,
      description: this.state.description,
      image: this.props.selectedImg,
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

            <Item style={{ justifyContent: 'center', padding: 10 }}>
              <Button style={{ backgroundColor: '#ff5e5b', margin: 'auto' }}>
                <Icon name='camera' style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }}>Camera</Text>
              </Button>
              <Text>   </Text>
              <Button style={{ backgroundColor: '#ff5e5b', margin: 'auto' }} onPress={
                ()=>{this.props.navigation.navigate('Gallery')}}>
                {/* {console.log("IMG URI ADD-NEW-NOTE: ", this.state.image)} */}
                <Icon name='image' style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }}>Gallery</Text>
              </Button>
              {/* <Image source={this.state.image} style={{ width: 200, height: 200 }} /> */}
            </Item>
          </Form>
        </Content>
        <Item style={{ justifyContent: 'center', padding: 10 }}>
          <Button style={{ margin: 5 }} onPress={this.addNote} >
            <Icon name='checkmark' style={{ color: '#ffffff' }} />
          </Button>
        </Item>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
