import React from "react";
import {
    Button,
	Dialog, HelperText,
	Portal,
	TextInput
} from "react-native-paper";
import {StyleSheet} from 'react-native'


export type SchedulePopUpProps = {
	model: {
        isEdit:boolean,
		addDialogVisible: boolean;
	// 	nickName: string | undefined;
	// 	authToken: string | undefined;
	// 	errorText: string | null | undefined;
	};
	hideDialog: (() => void) | undefined;
	// setNickName: (((text: string) => void) & Function) | undefined;
	// setAuthTokenName: (((text: string) => void) & Function) | undefined;
	// addDeviceHandler: (() => void) | undefined;
};
export function SchedulePopUp(props: SchedulePopUpProps) {
	return (
		<Portal>
			<Dialog
				visible={props.model.addDialogVisible}
				onDismiss={props.hideDialog}
			>
                <Dialog.Title>{props.model.isEdit?"Edit":"Add"} Schedule</Dialog.Title>
				{/* <Dialog.Title>Add Device</Dialog.Title>
				<Dialog.Content>
					<TextInput
						style={styles.input}
						label="Nick Name"
						mode="flat"
						onChangeText={props.setNickName}
						value={props.addModel.nickName} />
					<TextInput
						style={styles.input}
						label="Auth token"
						mode="flat"
						onChangeText={props.setAuthTokenName}
						value={props.addModel.authToken} />
					<HelperText
						type="error"
						visible={props.addModel.errorText?.trim() !== ""}
					>
						{props.addModel.errorText}
					</HelperText>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={props.hideDialog}>Cancel</Button>
					<Button onPress={props.addDeviceHandler}>Done</Button>
				</Dialog.Actions> */}
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
    input: {
		backgroundColor: "#f0f0f04f",
	},
});