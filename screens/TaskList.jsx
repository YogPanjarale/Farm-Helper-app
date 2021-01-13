import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import MyInput from "../components/MyInput";
import Header from "../components/MyHeader";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import db from "../config";
import { styles } from "../Styles";
import { Modal } from "react-native";
import { Icon } from "react-native-elements";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskNameToAdd: "",
      taskDescriptionToAdd: "",
      userId: "",
      statusIsAdd: true,
    };
  }
  componentDidMount() {
    this.getTasks();
  }
  async getTasks() {
    var email = firebase.auth().currentUser.email;
    var getId = await db
      .collection("tasks")
      .where("userId", "==", email)
      .onSnapshot(async (request) => {
        var id = request.docs.map((doc) => doc.id)[0];
        this.setState({ userId: id });
        var ref = await db
          .collection("tasks")
          .where("userId", "==", firebase.auth().currentUser.email)
          .get()
          .then((data) => {
            var allTasks = [];
            var dat = data.forEach(function (d) {
              var obj = Object.assign(d.data(), { ref: d.ref, id: d.id });
              return allTasks.push(obj);
            });
            console.log(allTasks);
            this.setState({ tasks: allTasks });
          });
        console.log(id, ref);
      });
  }
  async deleteItem(i, taskId) {
    var email = firebase.auth().currentUser.email;
    var ref = await db.collection("tasks").doc(taskId).delete();
  }
  generateUniqueId = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  addTask(name, description) {
    db.collection("tasks")
      .add({
        taskName: name,
        description: description,
        id: this.generateUniqueId(),
        userId: firebase.auth().currentUser.email,
      })
      .then(() => alert("Task Added Successfully"));
    this.getTasks();
    this.setState({
      taskDescriptionToAdd: "",
      taskNameToAdd: "",
    });
  }
  onFloatingActionClick = () => {
    console.log("Floating action button Clicked");
    this.setState({ statusIsAdd: !this.state.statusIsAdd });
  };
  AddForm() {
    return (
      <View
        visible={this.state.statusIsAdd}
        style={styles.WelcomeModal}
        animationType="slide"
      >
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
              this.addTask(
                this.state.taskNameToAdd,
                this.state.taskDescriptionToAdd
              );
            }}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Tasks List" navigation={this.props.navigation} />
        <View style={style.Container}>
          <Text>Task List Screen</Text>
          {this.state.statusIsAdd == true ? this.AddForm() : null}
          {this.state.tasks.map((task, i) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderBottomColor: "#000",
              }}
              key={i}
            >
              <View>
                <Text style={{ fontWeight: "900" }}>{task.taskName}</Text>
                <Text style={{ fontWeight: "500" }}>{task.description}</Text>
              </View>
              <Icon
                reverse
                name="delete"
                color="#fa0"
                onPress={() => this.deleteItem(i, task.id)}
              />
            </View>
          ))}

          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.onFloatingActionClick}
            style={style.FloatingActionButtonStyle}
          >
            <Image
              source={{
                uri:
                  "https://www.techup.co.in/wp-content/uploads/2020/03/ic_cart_image.png",
              }}
              style={style.FloatingActionButtonImageStyle}
            />
          </TouchableOpacity> */}
  <View style={style.FloatingActionButtonStyle}>
          <Icon
            name={this.state.statusIsAdd ? "close" : "add"}
            onPress={this.onFloatingActionClick}
            reverse
            color="#FFAA00"
            raised
            size={30}
          />
        </View></View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  Container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5F5F5",
  },

  FloatingActionButtonStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
  },

  FloatingActionButtonImageStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
});
export default TaskList;
