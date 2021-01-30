import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Icon, Tooltip } from 'react-native-elements';
import CCCategory from '../ClassComponents/CCCategory';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CCCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      isDialogVisible: false
    }
    // this.initiateStorage();
  }

  componentDidMount = () => {
    this.getData();
  }

  initiateStorage = async () => {
    let categoriesArr = [
      {
        id: 1,
        name: "Personal",
        notes: [
          {
            id: 1,
            date: "Today at 10:40",
            title: "Walk dog",
            description: "Don't forget to take Danielle's dog out for a walk! You are its care giver for this week.",
            image: "",
            until: "To do until next week on Sunday"
          },
          {
            id: 2,
            date: "Sunday at 09:48",
            title: "Homework",
            description: "\nTo Do List:\n\t1. Do homework\n\t2. Post a review on Moodle\n\t3. Meet Shoval on Zoom to record a video.",
            image: "https://mustafavarici.com/wp-content/uploads/2020/08/Homework-1024x682.jpeg",
            until: "To do until Monday at 10: 00"
          },
          {
            id: 3,
            date: "Sunday at 22:18",
            title: "More Homework",
            description: "\nTo Do List:\n\t1. Do homework\n\t2. Post a review on Moodle\n\t3. Meet Shoval on Zoom to record a video.",
            image: "https://mustafavarici.com/wp-content/uploads/2020/08/Homework-1024x682.jpeg",
            until: "To do until Monday at 10: 00"
          }
        ]
      },
      {
        id: 2,
        name: "Work",
        notes: [
          {
            id: 1,
            date: "Today at 12:45",
            title: "Send boss code",
            description: "Make sure to send your boss the code you worked on last week, send him the Git connection.",
            image: "",
            until: "To do until today by 00: 00"
          },
          {
            id: 2,
            date: "Sunday at 11:03",
            title: "Tasks",
            description: "\nTo Do List:\n\t1. Component - Main, Second page\n\t2. Git - update everything",
            image: "",
            until: "Tomorrow at 12:00"
          }
        ],
      }];
    try {
      await AsyncStorage.setItem('category', JSON.stringify(categoriesArr));
    }
    catch (error) {
      console.log("categorysave ERROR, ", error);
    }

  };

  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }

  addNewCategory = async (value) => {
    let newCategory = {
      name: value,
      notes: []
    }
    let categoriesArr = this.state.categoriesArr;
    categoriesArr == null ? categoriesArr = [newCategory] : categoriesArr.push(newCategory);
    try {
      await AsyncStorage.setItem('category', JSON.stringify(categoriesArr));
      this.getData();
      this.showDialog(false)
    }
    catch (error) {
      console.log("categorysave ERROR, ", error);

    }
  }

  getData = async () => {
    try {
      let categoriesArr = await AsyncStorage.getItem('category');

      let getCategoryAS = categoriesArr != null ? JSON.parse(categoriesArr) : null;
      this.setState({ categoriesArr: getCategoryAS })

    }
    catch (e) {
      console.log("GET - error", e);
    }
  }

  updateCategoryNotes = async(categoryIndex, notesArr) => {
    let categoriesArr = this.state.categoriesArr;
    categoriesArr[categoryIndex].notes = notesArr;
    try {
      await AsyncStorage.setItem('category', JSON.stringify(categoriesArr));
      this.getData();
      this.showDialog(false)
    }
    catch (error) {
      console.log("categorysave ERROR, ", error);
    }
  }

  removeCategory = (categoryIndex) => {
    
  }

  render() {

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            this.state.categoriesArr &&
            this.state.categoriesArr.map((item, index) =>
              <CCCategory key={index} categoryKey={index} data={item} count={item.notes.length} navigation={this.props.navigation} updateCategoryNotes={this.updateCategoryNotes} />)
          }
          {
            this.state.isDialogVisible &&
            <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={"Add New Category"}
              hintInput={"Category Name"}
              submitInput={(inputText) => { this.addNewCategory(inputText) }}
              closeDialog={() => { this.showDialog(false) }}>
            </DialogInput>
          }
        </View>
        <View style={{ alignItems: 'center' }}>
          <Icon
            reverse
            name='add'
            size={30}
            type='ionicon'
            color='#ff5e5b'
            onPress={() => { this.showDialog(true) }} />
        </View>
      </ScrollView>
    )
  }
}
