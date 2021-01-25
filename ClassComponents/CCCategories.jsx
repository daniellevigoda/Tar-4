import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
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
    this.initiateStorage();
    this.getData();
  }

  //   componentDidMount = () => {
  //     this.setState({
  //       categoriesArr: [
  //         {
  //           id: 1,
  //           name: "Personal",
  //           notes: [
  //             {
  //               id: 1,
  //               date: "Today at 10:40",
  //               title: "Walk dog",
  //               description: "Don't forget to take Danielle's dog out for a walk! You are its care giver for this week.",
  //               image: "",
  //               until: "To do until next week on Sunday"
  //             },
  //             {
  //               id: 2,
  //               date: "Sunday at 09:48",
  //               title: "Homework",
  //               description: "\nTo Do List:\n\t1. Do homework\n\t2. Post a review on Moodle\n\t3. Meet Shoval on Zoom to record a video.",
  //               image: "https://mustafavarici.com/wp-content/uploads/2020/08/Homework-1024x682.jpeg",
  //               until: "To do until Monday at 10: 00"
  //             },
  //             {
  //               id: 3,
  //               date: "Sunday at 22:18",
  //               title: "More Homework",
  //               description: "\nTo Do List:\n\t1. Do homework\n\t2. Post a review on Moodle\n\t3. Meet Shoval on Zoom to record a video.",
  //               image: "https://mustafavarici.com/wp-content/uploads/2020/08/Homework-1024x682.jpeg",
  //               until: "To do until Monday at 10: 00"
  //             }
  //           ]
  //         },
  //         {
  //           id: 2,
  //           name: "Work",
  //           notes: [
  //             {
  //               id: 1,
  //               date: "Today at 12:45",
  //               title: "Send boss code",
  //               description: "Make sure to send your boss the code you worked on last week, send him the Git connection.",
  //               image: "",
  //               until: "To do until today by 00: 00"
  //             },
  //             {
  //               id: 2,
  //               date: "Sunday at 11:03",
  //               title: "Tasks",
  //               description: "\nTo Do List:\n\t1. Component - Main, Second page\n\t2. Git - update everything",
  //               image: "",
  //               until: "Tomorrow at 12:00"
  //             }
  //           ],
  //         }]
  //     })
  //  }

  initiateStorage = async () => {
    let jsonValue = JSON.stringify({
      categoriesArr: [
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
        }]
    });
    try {
      await AsyncStorage.setItem('category', jsonValue);
    }
    catch (error) {
      console.log("categorysave ERROR, ", error);
    }

  };

  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }

  getCategory = () => {
    this.getData(value);
  }

  setToAS = async (value) => {
    let jsonValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem('category', jsonValue);
    }
    catch (error) {
      console.log("categorysave ERROR, ", error);
    }

  };

  setData = (value) => {
    try {
      let newCategory = {
        id: this.state.categoriesArr.length + 1,
        name: value,
        notes: []
      }
      let mishu = [...this.state.categoriesArr, newCategory];
      console.log(mishu);
      this.setState({ categoriesArr: mishu });
      console.log("CATEGORIES ARRAY: ", this.state.categoriesArr);
      console.log("MISHU: ", mishu)
      this.showDialog(false)
      this.setToAS(mishu);
    }
    catch (e) {
      console.log("SET - error", e);
    }
  }

  getData = async () => {
    try {
      let temp = await AsyncStorage.getItem('category');

      let getCategoryAS = temp != null ? JSON.parse(temp) : null;
      this.setState({ categoriesArr: getCategoryAS })

    }
    catch (e) {
      console.log("GET - error", e);
    }
  }

  ifCategoriesArrNull = () => {
    return (
      <View>
        <Icon
          reverse
          name='add'
          size={30}
          type='ionicon'
          color='tomato'
          onPress={() => { this.showDialog(true) }} />
      </View>)
  }

  ifCategoriesArrNOTNull = () => {
    console.log('IF NOT NULL:', this.state.categoriesArr);
    return <View>
      <Text></Text>
      {this.state.categoriesArr.map(item =>
        <CCCategory key={item.id} data={item} count={item.notes.length} navigation={this.props.navigation} />)}
      <DialogInput isDialogVisible={this.state.isDialogVisible}
        title={"Add New Category"}
        hintInput={"Category Name"}
        submitInput={(inputText) => { this.setData(inputText) }}
        closeDialog={() => { this.showDialog(false) }}>
      </DialogInput>
      <Icon
        reverse
        name='add'
        size={30}
        type='ionicon'
        color='tomato'
        onPress={() => { this.showDialog(true) }} />
    </View>
  }

  render() {

    return (
      <View>
        {this.state.categoriesArr != null ? this.ifCategoriesArrNOTNull() : this.ifCategoriesArrNull()}
      </View>
    )
  }
}
