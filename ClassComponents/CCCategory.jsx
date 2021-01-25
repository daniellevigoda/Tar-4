import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CCNotes from '../ClassComponents/CCNotes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default class CCCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesArr: []
    }
  }

  // openNotes = ({ navigation }) => {
  //   return (
  //     <View>
  //       <Text>{this.props.data.name} {this.props.count}</Text>
  //       <Button title="BLA" onPress={() => navigation.navigate('Notes')} />
  //     </View>
  //   );
  // };

  componentDidMount = () => {
    this.setState({ notesArr: this.props.data.notes })
  }

  render() {

    return (
      <ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.push('Notes', { notesArr: this.state.notesArr })}>
          <View>
            <Text>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{this.props.data.name}</Text>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{this.props.count}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({})
