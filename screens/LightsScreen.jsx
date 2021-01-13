import React, { Component } from "react";
import { View, Text, Image, Switch, StyleSheet } from "react-native";
import { styles } from "../Styles";
import MyHeader from "../components/MyHeader";
import firebase from "firebase/app";
import "firebase/auth";
import db, { rldb } from "../config";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

var style = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical:5,
  },
  inRow: {
    flex: 1,
    flexDirection: "row",
  },
  textInline: {
    fontSize: 14,
    fontWeight: "600",
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
class MotorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motorId: null,
      data: {},
      mainGate: true,
      motorRoom: true,
    };
    this.powerOn= require('../assets/powerOn.png');
    this.powerOff= require('../assets/powerOff.png');
  }
  toggleMainGate = async () => {
    rldb.ref(`/devices/${this.state.motorId}/`).update({
      mainGate: !this.state.mainGate,
    });
  };
  toggleMotorRoom = async () => {
    rldb.ref(`/devices/${this.state.motorId}/`).update({
      motorRoom: !this.state.motorRoom,
    });
  };
  componentDidMount() {
    this.getDeviceId();
    //this.getStats()
  }
  getDeviceId = () => {
    var email = firebase.auth().currentUser.email;
    console.log(email);
    db.collection("users")
      .where("email_id", "==", email)
      .onSnapshot(
        (request) => {
          var list = request.docs.map((document) => document.data());
          // console.log(list)
          if (list.length < 1) return;
          var item = list[0];
          console.log(item, request.docs[0]);
          this.setState({
            motorId: item.motorId,
          });
          console.log(item.motorId);
          this.getStats(item.motorId);
          // console.log(list)
        },
        (error) => {
          console.log(error);
        }
      );
  };
  getStats = (id) => {
    var path = "/devices/" + id;
    console.log("Path: " + path);
    var ref = firebase.database().ref(path);
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      try{
      this.setState({
        mainGate: data.mainGate,
        motorRoom: data.motorRoom,
      });}
      catch(err){
          console.log(err);
          this.setState({motorId:null})
      }
      //updateStarCount(postElement, data);
    });
  };
  Panel = () => {
    var mainGate = this.state.mainGate;
    var onOrOff = (i) => (i ? "On" : "Off");
    var motorRoom = this.state.motorRoom;
    return (
      <View style={styles.Modal}>
        <Text style={{ fontSize: 25, fontWeight: 900,alignText:'center'}}>Lights Control</Text>
          {
            //TODO : Add Lights Image
          }
        <View style={style.spaceBetween}>
          <View style={style.inRow}>
            <Image
              style={style.img}
              source={mainGate?this.powerOn:this.powerOff}
            />
            <Text style={style.textInline}>
              Main Gate Light : <Text>{onOrOff(mainGate)}</Text>
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={mainGate ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleMainGate}
            value={mainGate}
          />
        </View>
        <View style={style.spaceBetween}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={style.img}
              source={motorRoom?this.powerOn:this.powerOff}
            />
            <Text style={style.textInline}>
              Motor Room Light : <Text>{onOrOff(motorRoom)}</Text>
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={motorRoom ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleMotorRoom}
            value={motorRoom}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Control Motors" navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={{ fontWeight: 800 }}>{this.state.motorId}</Text>
          {/* <Text>{JSON.stringify(this.state.data)}</Text> */}{
              this.state.motorId!=null?
          <this.Panel></this.Panel>:<Text>Motor Id Not Found </Text>
  }
        </View>
      </View>
    );
  }
}

export default MotorsScreen;
