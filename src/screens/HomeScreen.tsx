import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { auth, firestore } from "../firebase";
type device = {
	authToken: string;
	battery: number;
	bypass: boolean;
	lastSeen: {
		nanoseconds: number;
		seconds: number;
	};
	motorOn: boolean;
	nickName: string;
};
type State = {
	devices: Array<device>;
};
const Device = ({ item }: { item: device }) => {
	return (
		<View style={styles.device}>
			<Text style={styles.deviceName}>{item.nickName}</Text>
			<Text style={styles.deviceBattery}>{item.battery}%</Text>
		</View>
	);
};
export default class HomeScreen extends Component<{}, State> {
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {
			devices: [],
		};
	}
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
	device: {},
	deviceName: {},
	deviceBattery: {},
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
