import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import CCAddNewNote from './CCAddNewNote';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default class CCNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='VIEW NOW' />
            </Card>)}
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
