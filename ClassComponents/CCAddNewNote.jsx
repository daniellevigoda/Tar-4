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
      notes: this.props.route.params.notes,
      id: "",
      date: new Date().getDate(),
      title: "",
      description: "",
      image: "",
      until: new Date().getDate(),
    };
  }

  componentDidMount = () => {
    this.getData();
  }

  setData = async() => {
    let newNote = {
      id: this.state.notes.length + 1,
      date: this.state.date,
      title: this.state.title,
      description: this.state.description,
      image: this.props.selectedImg,
      until: this.state.until
    }
    console.log("SET NEW NOTE: " ,newNote)
    let notes = this.state.notes;
    notes.push(newNote);
    try {
      await AsyncStorage.setItem('note', JSON.stringify(notes));
      console.log("notes stringify: " ,notes)
      this.getData();
    }
    catch (e) {
      console.log("SET - error", e);
    }
  }

  getData = async () => {
    try {
      let notes = await AsyncStorage.getItem('note');
      console.log("GET NOTES: " ,notes);
      let getNotesAS = notes != null ? JSON.parse(notes) : null;
      this.setState({ notes: getNotesAS })
    }
    catch (e) {
      console.log("GET - error", e);
    }
  }

  goToNotes = () => {
    this.setData();
    this.props.navigation.navigate('Notes', {notesArr: this.state.notes});
  }

  render() {
    return (
      <Container>
        {/* {console.log(this.props.data)} */}
        {console.log('Notes length: ', this.props.route.params.notes.length + 1)}
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
          <Button style={{ margin: 5 }} onPress={this.goToNotes} >
            <Icon name='checkmark' style={{ color: '#ffffff' }} />
          </Button>
        </Item>
        {console.log(this.state.title, this.state.description)}
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
