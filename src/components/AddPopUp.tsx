import React from "react";
import {
	Button,
	Dialog, HelperText,
	Portal,
	TextInput
} from "react-native-paper";
import {  styles } from "../screens/HomeScreen";
export type AddPopUpProps = {
	addModel: {
		addDialogVisible: boolean;
		nickName: string | undefined;
		authToken: string | undefined;
		errorText: string | null | undefined;
	};
	hideDialog: (() => void) | undefined;
	setNickName: (((text: string) => void) & Function) | undefined;
	setAuthTokenName: (((text: string) => void) & Function) | undefined;
	addDeviceHandler: (() => void) | undefined;
};
export function AddPopUp(props: AddPopUpProps) {
	return (
		<Portal>
			<Dialog
				visible={props.addModel.addDialogVisible}
				onDismiss={props.hideDialog}
			>
				<Dialog.Title>Add Device</Dialog.Title>
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
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
