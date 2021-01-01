import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from '../Styles'
import MyHeader from '../components/MyHeader'
import firebase from "firebase/app";
import "firebase/auth";
import db, { rldb } from '../config';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// import { TextField } from '@material-ui/core'
// import DateTimePicker from '@react-native-community/datetimepicker';
class MotorsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            motorId: 'motorId',
            data:{},
        };
    }
    toggleMotors = async () => {
        rldb.ref(`/devices/${this.state.motorId}/`).update({
            mainGate: true
        })

    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.getMotorId()
        // }, 1000);
      this.getMotorId()
      this.getStats()
    }
    getMotorId = () => {
        var email=firebase.auth().currentUser.email;
        console.log(email);
        db.collection('users')
            .where("email_id", "==", email)
            .onSnapshot(
                (request) => {
                    var list = request.docs.map(document => document.data())
                    console.log(list)
                    if(list.length<1)return
                    var item = list[0]
                    console.log(item,request.docs[0])
                    this.setState({
                        motorId:item.motorId,
                    })
                    console.log(list)
                },
                (error) => {
                    console.log(error)
                }
            )
       
    }
    getStats=()=>{
       var ref= rldb.ref(`/devices/${this.state.motorId}/`)
       ref.on("value",
        (data)=>{
            this.setState({
                data:data.val()
            })
            console.log(data.val())
        }
    )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Control Motors" navigation={this.props.navigation} />
                <View style={styles.container}>
                    <Text style={{fontWeight:800}}>{this.state.motorId }</Text>
                    <Text>{JSON.stringify(this.state.data)}</Text>
                    <View>
                        <Button
                            icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title="Press Me"
                            onPress={this.toggleMotors}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default MotorsScreen;