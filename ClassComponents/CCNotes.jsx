import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import CCAddNewNote from './CCAddNewNote';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


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
              <Button style={{color:'tomato'}}//צריך לייצר את זה
                icon={<Icon name='delete' color='#ffffff' />}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Delete note' />
            </Card>)}
        </TouchableOpacity>
        <Icon
        reverse
        name='add'
        size={30}
        type='ionicon'
        color='tomato'
        onPress={() => {this.props.navigation.push('Add New Note') }} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
