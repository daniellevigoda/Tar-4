import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import { Content, Form, Item, Input, Label, Button, Textarea, Container, Icon, Text, Footer } from 'native-base';
import DatePicker from 'react-native-datepicker';
import CCNotes from '../ClassComponents/CCNotes';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CCAddNewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      id: "",
      date: new Date().getDate(),
      title: "",
      description: "",
      image: "",
      until: new Date().getDate(),
    };
    this.getData();
  }

  getData = async () => {
    try {
      let temp = await AsyncStorage.getItem('category')
      let getCategoryAS = temp != null ? JSON.parse(temp) : null;
      this.setState({ categoriesArr: getCategoryAS, notes: this.props.notes })
    }
    catch (e) {
      console.log("GET - error ADD", e);
    }
  }

  sendToState = () => {
    try {
      let newNote = {
        id: this.props.notes.length + 1,
        date: this.state.date,
        title: this.state.title,
        description: this.state.description,
        image: this.state.image,
        until: this.state.until
      }
      let mishu = [...this.props.notes, newNote];
      console.log(mishu);
      this.setState({ notes: mishu });
      //this.sendToAS();
    }
    catch (e) {
      console.log("GET - error", e);
    }
  }

  sendToAS = (value) => {
    let jsonValue = JSON.stringify(value);
    AsyncStorage.setItem('category', jsonValue, () => {
      console.log("category saved,", jsonValue)
    });
  }

  render() {
    return (
      <Container>
        {console.log('ADD ', this.props.route.params.notes.length + 1)}
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
              <Button style={{ backgroundColor: '#ff5e5b', margin: 'auto' }}>
                <Icon name='image' style={{ color: '#ffffff' }} />
                <Text style={{ color: '#ffffff' }}>Gallery</Text>
              </Button>
            </Item>
          </Form>
        </Content>
        <Item style={{ justifyContent: 'center', padding: 10 }}>
          <Button style={{ margin: 5 }} onPress={this.sendToState} >
            <Icon name='checkmark' style={{ color: '#ffffff' }} />
          </Button>
        </Item>
        {console.log(this.state.title, this.state.description)}
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
