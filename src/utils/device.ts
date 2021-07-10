import { auth, firestore } from "../firebase";

export function turnDevice(value:boolean, deviceId:string) {
    const userId = auth().currentUser?.uid;
    firestore.collection("users").doc(userId).collection("devices").doc(deviceId).update({
        motorOn:value
    })
}
export async function addDevice(authToken:string,nickName:string){
    const userId = auth().currentUser?.uid;
    await firestore.collection("users").doc(userId).collection("devices").doc(authToken).set({
        authToken:authToken,
        nickName:nickName,
        motorOn:false,
        battery:0,
        bypass:false,
        lastSeen:null
    })
}