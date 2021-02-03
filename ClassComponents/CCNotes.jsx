import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import CCAddNewNote from './CCAddNewNote';
import { Card, ListItem } from 'react-native-elements';
import { Item, Button, Container, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CCNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      notesArr: []
    }
  }

  componentDidMount = () => {
    this.getData();
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

  addNote = (note) => {
    let notesArr = this.state.notesArr;
    notesArr.push(note);
    this.props.route.params.updateCategoryNotes(this.props.route.params.categoryKey, notesArr);
    this.getData();
  }

  deleteNote = (index) => {
    let notesArr = this.state.notesArr;
    notesArr.splice(index, 1);
    this.props.route.params.updateCategoryNotes(this.props.route.params.categoryKey, notesArr);
    this.getData();
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity>
          {this.state.notesArr.map((item, index) =>
            <Card key={index}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Date: {item.date}{"\n"}
              Description: {item.description}{"\n"}
              Until: {item.until}
              </Text>
              {item.image && <Card.Image source={{ uri: item.image }}></Card.Image>}
              <Item style={{ justifyContent: 'flex-end', padding: 10 }}>
                <Button onPress={() => this.deleteNote(index)} style={{ margin: 5, backgroundColor: 'tomato' }}>
                  <Icon name='trash' style={{ color: '#ffffff' }} />
                </Button>
              </Item>
            </Card>)}
        </TouchableOpacity>

        <TouchableOpacity>
          <Item style={{ justifyContent: 'center', padding: 10 }}>
            <Icon name='add-circle' style={{ color: '#ff5e5b', fontSize: 60 }} onPress={() => {
              this.props.navigation.push('Add New Note', { notes: this.state.notesArr, data: this.props.route.params.data, updateCategoryNotes: this.props.route.params.updateCategoryNotes, categoryKey: this.props.categoryKey, addNote: this.addNote })
            }} />
          </Item>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({});
