import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import { Content, Form, Item, Input, Label, Button, Textarea, Container, Icon, Text } from 'native-base';
import DatePicker from 'react-native-datepicker';


export default class CCAddNewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().getDate()
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item style={{padding: 10}}>
              <Input placeholder="Note Title" />
            </Item>
            <Textarea rowSpan={5} bordered placeholder="Note Description" />
            <Item style={{ alignItems: 'center', padding: 10 }}>
              <DatePicker
                style={{ marginLeft: 'auto' }}
                date={this.state.date}
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
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </Item>
            
            <Item style={{justifyContent: 'center', padding: 10}}>
              <Button style={{backgroundColor: 'tomato', margin: 'auto'}}>
                <Icon name='camera' style={{color: '#ffffff'}}/>
                <Text style={{color: '#ffffff'}}>Camera</Text>
              </Button>
              <Text>   </Text>
              <Button style={{backgroundColor: 'tomato', margin: 'auto'}}>
                <Icon name='image' style={{color: '#ffffff'}}/>
                <Text style={{color: '#ffffff'}}>Gallery</Text>
              </Button>
            </Item>
          </Form>
        </Content>
        <Button>
          <Icon name='image' style={{color: '#ffffff'}}/>
          </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
