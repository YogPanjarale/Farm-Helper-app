import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

export default class HomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text> Home Screen </Text>
				<FAB
					style={styles.fab}
					icon="plus"
					onPress={() => {
						console.log("Add Pressed");
					}}
                    color="#ffaa00"
                    label="Add Device"
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});