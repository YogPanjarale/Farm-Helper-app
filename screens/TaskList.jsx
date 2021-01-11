import React, { Component } from "react";
import { View, Text ,TouchableOpacity,TextInput} from "react-native";
import MyInput from '../components/MyInput'
import Header from "../components/MyHeader";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import db from "../config";
import {styles} from "../Styles";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskNameToAdd: "",
      taskDescriptionToAdd:'',
      userId: "",
    };
  }
  componentDidMount() {
    this.getTasks();
  }
  async getTasks() {
    var email = firebase.auth().currentUser.email;
    var getId = await db
      .collection("users")
      .where("email_id", "==", email)
      .onSnapshot(async (request) => {
        var id = request.docs.map((doc) => doc.id)[0];
        this.setState({ userId: id });
        var ref = await db
          .collection("users")
          .doc(id)
          .collection("tasks")
          .get()
          .then((data) => {
            var allTasks = [];
            var dat = data.forEach((d) => allTasks.push(d.data()));
            console.log(allTasks);
            this.setState({ tasks: allTasks });
          });
        console.log(id, ref);
      });
  }
  addTask(name,description){
    db.collection('users').doc(this.state.userId).collection('tasks').add({
        taskName:name,
        description:description
    }).then(
        alert('Task Added Successfully')
    )
    this.getTasks()
    this.setState({
        taskDescriptionToAdd:'',
        taskNameToAdd:''
    })
  }
  render() {
    return (
      <View>
        <Header title="Tasks List" navigation={this.props.navigation} />
        <Text>Task List Screen</Text>
        <View style={styles.WelcomeModal} animationType="slide">
      <MyInput
        label="Task Name"
        value={this.state.taskNameToAdd}
        onChangeText={(value) => {
          this.setState({ taskNameToAdd: value });
        }}
      />
      <MyInput
        label="Description"
        value={this.state.taskDescriptionToAdd}
        onChangeText={(value) => {
          this.setState({ taskDescriptionToAdd: value });
        }}
      />
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.addTask(this.state.taskNameToAdd,this.state.taskDescriptionToAdd)
          }}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
        {this.state.tasks.map((task,i) => (
          <View key ={i}>
            <Text style={{fontWeight:900}}>{task.taskName}</Text>
            <Text style={{fontWeight:500}}>{task.description}</Text>
          </View>
        ))}
        <TextInput />
      </View>
    );
  }
}

export default TaskList;
