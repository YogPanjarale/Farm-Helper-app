import React from "react";
import { Platform, Text, View ,StyleSheet} from "react-native";
import { Button, Surface } from "react-native-paper";
import { dateToTimeAgo } from "../utils/converters";
import { turnDevice } from "../utils/device";
import { device } from "../screens/HomeScreen";
import { Alert } from "react-native";
// import { functions } from "../firebase";
import firebase from "firebase";

export const Device = ({ item }: { item: device }) => {
	function handleButton(value: boolean) {
		if (Platform.OS == "web") {
			const r = confirm(`Do you want to turn ${value ? "On" : "Off"}`);
			if (!r) return;
			turnDevice(value, item.authToken);
		} else if (Platform.OS == "android" || Platform.OS == "ios") {
			Alert.alert(
				"Alert",
				`Do you want to turn ${value ? "On" : "Off"}`,
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () => turnDevice(value, item.authToken),
					},
				]
			);
		}
	}
	function reload() {
		const updateDevice = firebase.functions().httpsCallable("updateDevice")
		updateDevice({deviceId:item.authToken})
	}
	return (
		<Surface style={styles.device}>
			<View style={{ flex: 1, flexDirection: "row-reverse" }}>
				<Text style={{ color: item.motorOn ? "green" : "red" }}>
					{item.motorOn ? "On" : "Off"}
				</Text>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Text style={styles.deviceName}>{item.nickName}</Text>
					<Text style={styles.deviceDescription}>
						Battery : {item.battery}v
					</Text>
					<Text>
						last seen{" "}
						{item.lastSeen
							? dateToTimeAgo(
									new Date(item?.lastSeen.seconds * 1000)
							  )
							: "Not Found"}
						{/* {new Date(
							item.lastSeen.seconds * 1000
						).toLocaleString()} */}
					</Text>
				</View>
			</View>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<Button
					style={{ flex: 1 }}
					onPress={() => handleButton(true)}
					disabled={item.motorOn}
				>
					On
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => handleButton(false)}
					disabled={!item.motorOn}
				>
					Off
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => reload()}
					// disabled={!item.motorOn}
					icon="reload"
				>
					
				</Button>
				<View style={{ flex: 1 }}></View>
			</View>
		</Surface>
	);
};
const styles = StyleSheet.create({
	device: {
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
	deviceDescription: {},
});