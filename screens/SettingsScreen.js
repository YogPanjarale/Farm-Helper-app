import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity
} from 'react-native';
import TextField from '@material-ui/core/TextField';
import {  Icon } from 'react-native-elements';

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../config'
import {styles} from '../Styles'
import MyHeader from '../components/MyHeader'
class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_firstName: '',
            input_lastName: '',
            input_mobileNumber: '',
            input_address: '',
            input_userName: '',
            // input_Password: '',
            email:'',
            id:'user',
        };
    }
    componentDidMount() {
        this.getDetails()
    }
    Save = async () => {
        
        await db.collection('users').doc(this.state.id).set({
           firstName:this.state.input_firstName,
           lastName: this.state.input_lastName,
           Contact:this.state.input_mobileNumber,
           Address:this.state.input_address,
            userName:this.state.input_userName,
            email_id:this.state.email
        }).then((resopnse)=>{
            console.log(resopnse)
        })
    }
    /**
     * 
     *  input_firstName: item.firstName,
            input_lastName: item.lastName,
            input_mobileNumber: item.Contact,
            input_address: item.Address,
            input_userName: item.Contact,
     */
    getDetails = async () => {
        var email=firebase.auth().currentUser.email;
        var details = await db
            .collection('users')
            .where("email_id", "==",email )
            .onSnapshot(
                (request) => {
                    var list = request.docs.map(document => document.data())
                    console.log(list)
                    if(list.length<1)return
                    var item = list[0]
                    console.log(item,request.docs[0])
                    this.setState({
                        input_firstName: item.firstName,
                        input_lastName: item.lastName,
                        input_mobileNumber: item.Contact,
                        input_address: item.Address,
                        input_userName: item.userName,
                        email:item.email_id,
                        id:request.docs[0].id
                    })
                    console.log(list)
                },
                (error) => {
                    console.log(error)
                }
            )

    }
    render() {
        return (
            <View style={{flex:1}}>
                  <MyHeader title="Profile" navigation = {this.props.navigation}/>
            <View style={styles.container}>
               
                <Modal style={styles.Modal}
                    animationType="slide"
                >
                    <TextField
                        id=" Input first name"
                        label="First Name"
                        value={this.state.input_firstName}
                        onChange={event => {
                            const { value } = event.target;
                            this.setState({ input_firstName: value });
                        }}
                    />
                    <TextField
                        id="Input Last Name"
                        label="Last Name"
                        value={this.state.input_lastName}
                        onChange={event => {
                            const { value } = event.target;
                            this.setState({ input_lastName: value })
                        }}
                    />
                    <TextField
                        id="Input Mobile"
                        label="Mobile Number"
                        value={this.state.input_mobileNumber}

                        onChange={event => {
                            const { value } = event.target;
                            this.setState({ input_mobileNumber: value })
                        }}
                    />
                    <TextField
                        id="Input Address"
                        label="Address"
                        // defaultValue={this.state.input_address}
                        value={this.state.input_address}
                        onChange={event => {
                            const { value } = event.target;
                            this.setState({ input_address: value })
                        }}
                        multiline
                    />
                    <TextField
                        id="Input UserName"
                        label="UserName"
                        value={this.state.input_userName}
                        onChange={event => {
                            const { value } = event.target;
                            this.setState({ input_userName: value })
                        }}
                    />


                    <TouchableOpacity style={styles.button}
                        onPress={this.Save}
                    >
                        <Text style={styles.buttonText}>
                            Save
                    </Text>
                    </TouchableOpacity>
                </Modal>
            </View>
            </View>
        );
    }

}

export default SettingScreen;