import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormatAlignJustify } from '@material-ui/icons';

const Stack = createStackNavigator();


export default class CCCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesArr: []
    }
  }

  componentDidMount = () => {
    this.setState({ notesArr: this.props.data.notes })
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.push('Notes', { notesArr: this.state.notesArr, data: this.props.data })}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#f7f7f7' }}>{this.props.data.name}{this.props.count}</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ff5e5b' }}>{this.props.count}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    padding: -20,
    margin: 20,
    backgroundColor: "#474a56",
    width: 150,
    height: 150,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
