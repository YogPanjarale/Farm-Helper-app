import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import { Input } from "react-native-elements";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../config";
// import { TextInput, } from 'react-native-paper';
// import { Icon } from 'react-native-elements'

import { styles,colors } from "../Styles";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_email: "test@test.com",
      input_password: "123456",
      isSignUp: false,
      // sign up stuff
      input_firstName: "",
      input_lastName: "",
      input_mobileNumber: "",
      input_address: "",
      input_userName: "",
      input_confirmPassword: "",
    };
  }
  LogIn = async (email, password) => {
    console.log(this.state, email, password);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.props.navigation.navigate("Home");

        return //alert("Logged In", response);
      })
      .catch((error) => {
        var errorcode = error.code;
        var errormessege = error.message;
        console.log(error);
        return alert(errormessege);
      });
  };
  SignUp = async () => {
    var email = this.state.input_email;
    var password = this.state.input_password;
    db.collection("users").add({
      firstName: this.state.input_firstName,
      lastName: this.state.input_lastName,
      Contact: this.state.input_mobileNumber,
      Address: this.state.input_address,
      userName: this.state.input_userName,
      email_id: this.state.input_email,
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Signed Up");
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        var errorType = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/bg_green.jpg")}
        style={styles.container}
      >
        {this.state.isSignUp ? null : (
          <Image
            source={require("../assets/logo 3.5.png")}
            style={styles.HomeImage}
          />
        )}

        {/* <Text style={styles.HomeHeading}>
                    Farm Helper App
                  </Text> */}
        {this.state.isSignUp ? <this.SignUpModal /> : <this.LogInModal />}
        <TouchableOpacity
          onPress={
            this.state.isSignUp
              ? () => {
                  this.setState({ isSignUp: false });
                }
              : () => {
                  this.setState({ isSignUp: true });
                }
          }
        >
          <Text style={styles.ModalText}>
            {this.state.isSignUp
              ? "Already Have an Account? LogIn "
              : " Don't Have an Account? SignUp "}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  /*
    1. FIRST Name
    2. Last Name
    3. Mobile Number
    4. Address
    5. UserName
    6. Password
    7. Confirm Password 
    */
  SignUpModal = () => (
    <Modal style={styles.WelcomeModal} animationType="slide">
      <MyInput
        id=" Input first name"
        label="First Name"
        placeholder={this.state.input_firstName}
        onChangeText={(value) => {
          this.setState({ input_firstName: value });
        }}
      />
      <MyInput
        id="Input Last Name"
        label="Last Name"
        placeholder={this.state.input_lastName}
        onChangeText={(value) => {
          this.setState({ input_lastName: value });
        }}
      />
      <Input
        id="Input Mobile"
        label="Mobile Number"
        placeholder={this.state.input_mobileNumber}
        onChangeText={(value) => {
          this.setState({ input_mobileNumber: value });
        }}
      />
      <Input
        id="Input Address"
        label="Address"
        placeholder={this.state.input_address}
        onChangeText={(value) => {
          this.setState({ input_address: value });
        }}
        multiline
      />
      <MyInput
        id="Input UserName"
        label="UserName"
        placeholder={this.state.input_userName}
        onChangeText={(value) => {
          this.setState({ input_userName: value });
        }}
      />
      <MyInput
        id="email Input"
        label="Email"
        placeholder={this.state.input_email}
        onChangeText={(value) => {
          this.setState({ input_email: value });
        }}
      />
      <MyInput
        id="password input"
        label="Password"
        placeholder={this.state.input_password}
        onChangeText={(value) => {
          this.setState({ input_password: value });
        }}
        type="password"
      />
      <MyInput
        id="confirm password input"
        label="Confirm Password"
        placeholder={this.state.input_confirmPassword}
        onChangeText={(value) => {
          this.setState({ input_confirmPassword: value });
        }}
        error={this.state.input_confirmPassword != this.state.input_password}
        helperText={
          this.state.input_confirmPassword != this.state.input_password
            ? "Passwords don't match"
            : ""
        }
        type="password"
      />
      <TouchableOpacity
        style={styles.button}
        disabled={this.state.input_confirmPassword != this.state.input_password}
        onPress={this.SignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </Modal>
  );
  LogInModal = () => (
    <Modal style={styles.WelcomeModal} animationType="slide">
      <MyInput
        id="email Input"
        label="Email"
        value={this.state.input_email}
        onChangeText={(value) => {
          this.setState({ input_email: value });
        }}
      />
      <MyInput
        id="password input"
        label="Password"
        value={this.state.input_password}
        onChangeText={(value) => {
          this.setState({ input_password: value });
        }}
        type="password"
      />
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.LogIn(this.state.input_email, this.state.input_password);
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
class MyInput extends Component {
  render() {
    return (
      <Input
        id={this.props.id}
        label={this.props.label}
        value={this.props.value}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

export default WelcomeScreen;
