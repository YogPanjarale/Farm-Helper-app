import React, { Component } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import MyInput from "../components/MyInput";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../config";
import { styles } from "../Styles";
import MyHeader from "../components/MyHeader";
class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_firstName: "",
      input_lastName: "",
      input_mobileNumber: "",
      input_address: "",
      input_userName: "",
      input_MotorId: "",
      // input_Password: '',
      email: "",
      id: "user",
    };
  }
  componentDidMount() {
    this.getDetails();
  }
  Save = async () => {
    await db
      .collection("users")
      .doc(this.state.id)
      .set({
        firstName: this.state.input_firstName,
        lastName: this.state.input_lastName,
        Contact: this.state.input_mobileNumber,
        Address: this.state.input_address,
        userName: this.state.input_userName,
        email_id: this.state.email,
        motorId: this.state.input_MotorId,
      })
      .then((resopnse) => {
        console.log(resopnse);
      });
  };
  /**
     * 
     *  input_firstName: item.firstName,
            input_lastName: item.lastName,
            input_mobileNumber: item.Contact,
            input_address: item.Address,
            input_userName: item.Contact,
     */
  getDetails = async () => {
    var email = firebase.auth().currentUser.email;
    var details = await db
      .collection("users")
      .where("email_id", "==", email)
      .onSnapshot(
        (request) => {
          var list = request.docs.map((document) => document.data());
          console.log(list);
          if (list.length < 1) return;
          var item = list[0];
          console.log(item, request.docs[0]);
          this.setState({
            input_firstName: item.firstName,
            input_lastName: item.lastName,
            input_mobileNumber: item.Contact,
            input_address: item.Address,
            input_userName: item.userName,
            email: item.email_id,
            input_MotorId: item.motorId,
            id: request.docs[0].id,
          });
          console.log(list);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Profile" navigation={this.props.navigation} />
        <View style={styles.settingscontainer}>
          {/* <Modal style={styles.SettingModal}>
            <Input
              id=" Input first name"
              label="First Name"
              value={this.state.input_firstName}
              onChangeText={(value) => {
                this.setState({ input_firstName: value });
              }}
            />
          </Modal>
          <Modal style={styles.SettingModal}>
            <Input
              id="Input Last Name"
              label="Last Name"
              value={this.state.input_lastName}
              onChangeText={(value) => {
                this.setState({ input_lastName: value });
            }}
            />
        </Modal> */}
          <MyInput
            id="Input UserName"
            label="UserName"
            value={this.state.input_userName}
            onChangeText={(value) => {
              this.setState({ input_userName: value });
            }}
            iconName="person"
          />
          <MyInput
            id="Input Mobile"
            label="Mobile Number"
            value={this.state.input_mobileNumber}
            onChangeText={(value) => {
              this.setState({ input_mobileNumber: value });
            }}
            iconName="mobile"
          />

          <MyInput
            id="Input Address"
            label="Address"
            // defaultValue={this.state.input_address}
            value={this.state.input_address}
            onChangeText={(value) => {
              this.setState({ input_address: value });
            }}
            multiline
          />

          <MyInput
            id="Input Motor Id"
            label="MotorId"
            value={this.state.input_MotorId}
            onChangeText={(value) => {
              this.setState({ input_MotorId: value });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={this.Save}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SettingScreen;
