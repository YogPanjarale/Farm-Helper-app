import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, FAB, Surface } from "react-native-paper";
import { SchedulePopUp } from "../components/SchedulePopUp";
import { auth, firestore } from "../firebase";
import { device } from "./HomeScreen";
type task = {
	status: string | null;
	time: number | null;
	device: device | null;
};
type State = {
	devices: Array<task>;
	modalVisible: boolean;
};
const Task = ({ item }: { item: task }) => {
	return (
		<Surface style={styles.task}>
			<Text style={styles.deviceName}>{item.device?.nickName}</Text>
			<Text style={styles.time}>
				{new Date(item?.time as any as number).getHours()}:
				{new Date(item?.time as any as number).getMinutes()}
			</Text>
		</Surface>
	);
};
export default class ScheduleScreen extends Component<{}, State> {
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {
			devices: [],
			modalVisible: false,
		};
	}
	componentDidMount = () => {
		const authId = auth().currentUser?.uid;
		firestore
			.collection("users")
			.doc(authId)
			.collection("tasks")
			.onSnapshot(async (snapshot) => {
				let docs = snapshot.docs.map((doc) =>
					doc.data()
				) as Array<task>;
				await Promise.all(
					docs.map(async (doc) => {
						const ref =
							doc.device as unknown as firebase.default.firestore.DocumentReference;
						doc.device = (await ref.get()).data() as device;
						return doc;
					})
				).then((_docs) => {
					this.setState({ devices: _docs });
					console.log(_docs);
				});
				// console.log()
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<Appbar.Header>
					<Appbar.Content title="Schedule Screen" />
				</Appbar.Header>
				<SchedulePopUp
					hideDialog={() => {this.setState({modalVisible: false})}}
					model={{ addDialogVisible: this.state.modalVisible, isEdit: true }}
				/>
				<FlatList
					data={this.state.devices}
					renderItem={({ item }) => <Task item={item} />}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>

				<FAB
					style={styles.fab}
					icon="plus"
					onPress={() => {
						this.setState({modalVisible:true})
						console.log("Add Pressed");
					}}
					color="#ffaa00"
					label="Add Schedule"
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	task: {
		backgroundColor: "#ffffffaf",
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
		// paddigLeft:20,
		borderRadius: 5,
		elevation: 4,
	},
	deviceName: {
		fontSize: 16,
		fontWeight: "500",
		textTransform: "uppercase",
	},
	time: {},
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
