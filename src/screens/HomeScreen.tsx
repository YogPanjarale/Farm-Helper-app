import React, { Component } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import {
	Appbar,
	Button,
	Dialog,
	FAB,
	HelperText,
	Portal,
	TextInput,
} from "react-native-paper";
import { auth, firestore } from "../firebase";
import { Device } from "../components/Device";
import { addDevice } from "../utils/device";
export type device = {
	authToken: string;
	battery: number;
	bypass: boolean;
	lastSeen: {
		nanoseconds: number;
		seconds: number;
	} | null;
	motorOn: boolean;
	nickName: string;
};
type AddModel = {
	addDialogVisible: boolean;
	authToken: string;
	nickName: string;
	errorText: string;
};
type State = {
	devices: Array<device>;
	addModel: AddModel;
};
export default class HomeScreen extends Component<{}, State> {
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {
			devices: [],
			addModel: {
				addDialogVisible: false,
				authToken: "",
				nickName: "",
				errorText: "",
			},
		};
	}
	 setNickName = (nickName: string) => {
		const addModel = { ...this.state.addModel };
		addModel.nickName = nickName;
		this.setState({ addModel: addModel });
	};
	 setAuthTokenName = (authToken: string) => {
		const addModel = { ...this.state.addModel };
		addModel.authToken = authToken;
		this.setState({ addModel: addModel });
	};
	 setErrorText = (errorText: string) => {
		const addModel = { ...this.state.addModel };
		addModel.errorText = errorText;
		this.setState({ addModel: addModel });
	};
	 showDialog = () => {
		const addModel = { ...this.state.addModel };
		addModel.addDialogVisible = true;
		this.setState({ addModel: addModel });
	};

	 hideDialog = () => {
		const addModel = { ...this.state.addModel };
		addModel.addDialogVisible = true;
		this.setState({ addModel: addModel });
	};
	componentDidMount = () => {
		const authId = auth().currentUser?.uid;
		firestore
			.collection("users")
			.doc(authId)
			.collection("device")
			.onSnapshot((snapshot) => {
				const docs = snapshot.docs.map((doc) =>
					doc.data()
				) as Array<device>;
				console.log(docs);
				this.setState({ devices: docs });
			});
	};
	render() {
	
		const CDialog = () => {
			

			const addDeviceHandler = () => {
				if (this.state.addModel.authToken.trim() === "") {
					return this.setErrorText("Please enter a valid auth Token");
				}
				if (this.state.addModel.nickName.trim() === "") {
					return this.setErrorText("Please enter a valid nick name");
				}
				addDevice(
					this.state.addModel.authToken,
					this.state.addModel.nickName
				);
				this.setState({
					addModel: {
						addDialogVisible: false,
						authToken: "",
						nickName: "",
						errorText: "",
					},
				});
				this.hideDialog();
			};
			return (
				<Portal>
					<Dialog
						visible={this.state.addModel.addDialogVisible}
						onDismiss={this.hideDialog}
					>
						<Dialog.Title>Add Device</Dialog.Title>
						<Dialog.Content>
							<TextInput
								style={styles.input}
								label="Nick Name"
								mode="flat"
								onChangeText={this.setNickName}
								value={this.state.addModel.nickName}
							/>
							<TextInput
								style={styles.input}
								label="Auth token"
								mode="flat"
								onChangeText={this.setAuthTokenName}
								value={this.state.addModel.authToken}
							/>
							<HelperText
								type="error"
								visible={
									this.state.addModel.errorText.trim() !== ""
								}
							>
								{this.state.addModel.errorText}
							</HelperText>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={this.hideDialog}>Cancel</Button>
							<Button onPress={addDeviceHandler}>Done</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			);
		};
		return (
			<View style={styles.container}>
				<Appbar.Header>
					<Appbar.Content title="Home Screen" />
				</Appbar.Header>
				<FlatList
					data={this.state.devices}
					renderItem={({ item }) => <Device item={item} />}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
				<CDialog />
				<FAB
					style={styles.fab}
					icon="plus"
					onPress={() => {
						console.log("Add Pressed");
						this.showDialog();
					}}
					color="#ffaa00"
					label="Add Device"
				/>
			</View>
		);
	}
}
export const styles = StyleSheet.create({

	deviceName: {
		fontSize: 16,
		fontWeight: "500",
		textTransform: "uppercase",
	},
	deviceDescription: {},
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},
	input: {
		backgroundColor: "#f0f0f04f",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
