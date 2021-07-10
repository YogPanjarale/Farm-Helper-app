import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, Button, FAB } from "react-native-paper";
import { auth, firestore } from "../firebase";
import { dateToTimeAgo } from "../utils/converters";
import { turnDevice } from "../utils/device";
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
	function handleButton(value:boolean) {
		turnDevice(value,item.authToken)
	}
	return (
		<View style={styles.device}>
			<View style={{flex:1,flexDirection:"row-reverse"}}>
				<Text style={{color:item.motorOn?"green":"red"}}>{item.motorOn?"On":"Off"}</Text>
			<View style={{flex:1,flexDirection:"column"}}>
			<Text style={styles.deviceName}>{item.nickName}</Text>
			<Text style={styles.deviceDescription}>
				Battery : {item.battery}v
			</Text>
			<Text>
				Last Seen {dateToTimeAgo(new Date(item.lastSeen.seconds * 1000))}
				{new Date(item.lastSeen.seconds * 1000).toLocaleString()}
			</Text>
			</View>
			
			</View>
			<View style={{flex:1,flexDirection:"row"}}>
				<Button style={{flex:1}} onPress={()=>handleButton(true)} disabled={item.motorOn} >On</Button>
				<Button style={{flex:1}} onPress={()=>handleButton(false)} disabled={!item.motorOn} 
				>Off</Button>
				<View style={{flex:1}}></View>
			</View>
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
	device: {
		backgroundColor: "#ffffffaf",
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
		// paddigLeft:20,
		borderRadius: 5,
	},
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
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
