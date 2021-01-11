import { Icon, Input } from "react-native-elements";
import { colors } from "../Styles";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
class MyInput extends Component {
  render() {
    return (
      <View style={styles.outside}>
        {this.props.iconName?(<Icon
        name={this.props.iconName}
        />):null}
        <Text style={{ textAlign: "justify" }}>{this.props.label}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  outside: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    width: "100%",
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent:'space-between',
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#DFDAD7",
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
});
export default MyInput;
