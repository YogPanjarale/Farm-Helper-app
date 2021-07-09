import React, { Component } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { auth } from "../firebase";

//typescript type with emailInput, passwordInput confirm passwordInput
type AuthScreenState = {
	emailInput: string;
	passwordInput: string;
	errorMessage: string;
	hidePassword: boolean;
};
export default class AuthScreen extends Component<{}, AuthScreenState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			emailInput: "",
			passwordInput: "",
			errorMessage: "",
			hidePassword: true,
		};
	}
	login() {
		auth()
			.signInWithEmailAndPassword(
				this.state.emailInput,
				this.state.passwordInput
			)
			.then(() => {
				this.setState({
					errorMessage: "",
				})
				// this.props.navigator.pop();
			})
			.catch((error) => {
				this.setState({
					errorMessage: error.message,
				});
			});
	}
	render() {
		return (
			<ImageBackground
				source={require("../../assets/bg_green.jpg")}
				resizeMode="cover"
				style={{ flex: 1 }}
			>
				<View style={styles.container}>
					{/* <Text style={styles.logo}> Farm Helper App </Text> */}
					<Image
						source={require("../../assets/icon.png")}
						style={styles.image}
					/>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
					>
						<TextInput
							style={styles.input}
							mode="outlined"
							label="Email"
							value={this.state.emailInput}
							onChangeText={(text) =>
								this.setState({ emailInput: text })
							}
							keyboardType="email-address"
						/>
						<TextInput
							style={styles.input}
							mode="outlined"
							label="Password"
							value={this.state.passwordInput}
							onChangeText={(text) =>
								this.setState({ passwordInput: text })
							}
							secureTextEntry={this.state.hidePassword}
							right={
								<TextInput.Icon
									name="eye"
									onPress={() =>
										this.setState({
											hidePassword:
												!this.state.hidePassword,
										})
									}
								/>
							}
						/>
						<Text style={{ color: "red", marginTop: 5 }}>
							{this.state.errorMessage}
						</Text>
						<Button
							mode="contained"
							onPress={() => {
								console.log("Pressed");
								this.login();
							}}
							style={styles.button}
						>
							Login
						</Button>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		);
	}
}
const styles = StyleSheet.create({
	logo: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		paddingHorizontal: 50,
		paddingVertical: 100,
		// backgroundColor: "#F0E3D0",
		// alignItems: "center",
	},
	button: {
		marginTop: 16,
	},
	image: {
		width: 250,
		alignSelf: "center",
		height: 250,
		resizeMode: "contain",
		marginVertical: 10,
	},
	input: {
		backgroundColor: "#f0f0f04f",
	},
});
