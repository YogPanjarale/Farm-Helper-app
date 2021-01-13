import React, { Component } from "react";
import { View, Text, Image, Switch ,StyleSheet} from "react-native";
import { styles } from "../Styles";
import MyHeader from "../components/MyHeader";
import firebase from "firebase/app";
import "firebase/auth";
import db, { rldb } from "../config";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
var _style= StyleSheet.create({
    spaceBetween:{
        flex: 1, flexDirection: "row",justifyContent:'space-between' 
    },
    inRow:{
        flex: 1, flexDirection: "row"
    },
    textInline:{
        fontSize:14,
        fontWeight:600,
    },
    img:{
        width: 30, height: 30 ,marginRight:10
    }
})
class MotorsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            motorId: "motorId",
            data: {},
        };
    }
    toggleMotors = async () => {
        rldb.ref(`/devices/${this.state.motorId}/mainMotor`).update({
            isOn: !this.state.data.isOn,
        });
    };
    componentDidMount() {
        this.getMotorId();
        //this.getStats()
    }
    getMotorId = () => {
        var email = firebase.auth().currentUser.email;
        console.log(email);
        db.collection("users")
            .where("email_id", "==", email)
            .onSnapshot(
                (request) => {
                    var list = request.docs.map((document) => document.data());
                    // console.log(list)
                    if (list.length < 1) return;
                    var item = list[0];
                    // console.log(item, request.docs[0]);
                    this.setState({
                        motorId: item.motorId,
                    });
                    this.getStats();
                    // console.log(list)
                },
                (error) => {
                    console.log(error);
                    this.setState({motorId:null});
                }
            );
    };
    getStats = () => {
        var path = "/devices/" + this.state.motorId + "/mainMotor";
        console.log("Path: " + path);
        var ref = firebase.database().ref(path);
        ref.on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if(data!=null){
            this.setState({
                data: data,
            });}else{
                this.setState({motorId:null})
            }
            //updateStarCount(postElement, data);
        });
    };
    Panel = () => {
        var isOn = this.state.data.isOn
        var onOrOff =(i)=> i ? "On" : "Off";
        var powerStatus = this.state.data.powerStatus
        return (
            <View style={styles.Modal}>
                <Text style={{ fontSize: 25, fontWeight: 900 }}>Main Motor</Text>
                <View style={_style.spaceBetween}>
                    <View style={_style.inRow}>
                    <Image style={_style.img} source={require('../assets/pump' + onOrOff(isOn) + '.png')} />
                    <Text style={_style.textInline}>
                        Motor Status : <Text>{onOrOff(isOn)}</Text>
                    </Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleMotors}
                        value={isOn}
                    />
                    
                </View>
                <View style={_style.inRow}>
                    <Image style={_style.img} source={require('../assets/power' + onOrOff(powerStatus) + '.png')} />
                    <Text style={_style.textInline}>
                        Power Status : <Text>{onOrOff(powerStatus)}</Text>
                    </Text>
                </View>
            </View>
        );
    }
    render() {


        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Control Motors" navigation={this.props.navigation} />
                <View style={styles.container}>
                    <Text style={{ fontWeight: 800 }}>{this.state.motorId}</Text>
                     {/* <Text>{JSON.stringify(this.state.data)}</Text> */}{
              this.state.motorId!=null?
              <this.Panel></this.Panel>:<Text>Motor Id Not Found </Text>
      }
                </View>
            </View>
        );
    }
}

export default MotorsScreen;
