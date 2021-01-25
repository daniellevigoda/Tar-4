import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import CCAddNewNote from './CCAddNewNote';
import { Card, ListItem } from 'react-native-elements';
import { Item, Button, Container, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default class CCNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      notesArr: []
    }
    this.getData()
  }

  getData = async () => {
    try {
      let temp = await AsyncStorage.getItem('category')
      let getCategoryAS = temp != null ? JSON.parse(temp) : null;
      this.setState({ categoriesArr: getCategoryAS })
    }
    catch (e) {
      console.log("GET - error NOTES", e);
    }
  }

  deleteNote = (id, title) => {
    this.props.route.params.notesArr.map(item => {
      if (item.id === id && item.title === title) {
        AsyncStorage.removeItem('category', item.id)
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity>
          {this.props.route.params.notesArr.map(item =>
            <Card key={item.id}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Date: {item.date}{"\n"}
              Description: {item.description}{"\n"}
              Until: {item.until}
              </Text>
              {item.image != "" ? <Card.Image source={{ uri: item.image }}></Card.Image> : <Text></Text>}
              <Item style={{ justifyContent: 'flex-end', padding: 10 }}>
                <Button onPress={this.deleteNote(item.id, item.title)} style={{ margin: 5, backgroundColor: 'tomato' }}>
                  <Icon name='trash' style={{ color: '#ffffff' }} />
                </Button>
              </Item>
            </Card>)}
        </TouchableOpacity>

        <TouchableOpacity>
          <Item style={{ justifyContent: 'center', padding: 10 }}>
            <Icon name='add-circle' style={{ color: 'green', fontSize: 60 }} onPress={() => { this.props.navigation.push('Add New Note', { notes: this.state.notesArr }) }} />
          </Item>
          {console.log(this.state.notesArr.length)}
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
