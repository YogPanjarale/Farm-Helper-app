import React, { Component } from "react";
import { View, Text, Image, Switch, StyleSheet } from "react-native";
import { styles } from "../Styles";
import MyHeader from "../components/MyHeader";
import firebase from "firebase/app";
import "firebase/auth";
import db, { rldb } from "../config";
// import { Button } from "react-native-elements";
// import Icon from "react-native-vector-icons/FontAwesome";
class MotorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motorId: "motorId",
      data: {},
    };
    this.motorOn = require("../assets/pumpOn.png");
    this.motorOff = require("../assets/pumpOff.png");
    this.powerOn = require("../assets/powerOn.png");
    this.powerOff = require("../assets/powerOff.png");
  }
  toggleMotors = async () => {
    rldb.ref(`/devices/${this.state.motorId}/mainMotor`).update({
      isOn: !this.state.data.isOn,
    });
  };
  componentDidMount() {
    this.getMotorId();
    //this.getStats()
  }
  getMotorId = () => {
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
          // console.log(item, request.docs[0]);
          this.setState({
            motorId: item.motorId,
          });
          this.getStats();
          // console.log(list)
        },
        (error) => {
          console.log(error);
          this.setState({ motorId: null });
        }
      );
  };
  getStats = () => {
    var path = "/devices/" + this.state.motorId + "/mainMotor";
    console.log("Path: " + path);
    var ref = firebase.database().ref(path);
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data != null) {
        this.setState({
          data: data,
        });
      } else {
        this.setState({ motorId: null });
      }
      //updateStarCount(postElement, data);
    });
  };
  Panel = () => {
    var isOn = this.state.data.isOn;
    var onOrOff = (i) => (i ? "On" : "Off");
    var powerStatus = this.state.data.powerStatus;
    return (
      <View
        style={styles.Modal}
      >
        <Text style={{ fontSize: 25, fontWeight: "900" ,textAlign:'center'}}>Main Motor</Text>

        <View style={_style.spaceBetween}>
          <View style={_style.inRow}>
            <Image
              style={_style.img}
              source={isOn ? this.motorOn : this.motorOff}
            />
            <Text style={_style.textInline}>
              Motor Status : <Text>{onOrOff(isOn)}</Text>
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleMotors}
            value={isOn}
          />
        </View>

        <View style={_style.inRow}>
          <Image
            style={_style.img}
            source={powerStatus ? this.powerOn : this.powerOff}
          />
          <Text style={_style.textInline}>
            Power Status : <Text>{onOrOff(powerStatus)}</Text>
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Control Motors" navigation={this.props.navigation} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <Text style={{ fontWeight: "900",textAlign:'center' }}>{this.state.motorId}</Text>
          {/* <Text>{JSON.stringify(this.state.data)}</Text> */}
          {this.state.motorId != null ? (
            <this.Panel />
          ) : (
            <Text>Motor Id Not Found </Text>
          )}
        </View>
      </View>
    );
  }
}

export default MotorsScreen;

var _style = StyleSheet.create({
  spaceBetween: {
    flexDirection: "row",justifyContent:'space-between' //height:"100%",
    //margin:100
    //backgroundColor:'#000'
  },
  inRow: {
    flexDirection: "row", //height:"100%"
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
