import { auth, firestore } from "../firebase";

export function turnDevice(value:boolean, deviceId:string) {
    const userId = auth().currentUser?.uid;
    firestore.collection("users").doc(userId).collection("device").doc(deviceId).update({
        motorOn:value
    })
}