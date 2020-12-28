import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from '../Styles'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase/database'
import db, { rldb } from '../config';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// import { TextField } from '@material-ui/core'
// import DateTimePicker from '@react-native-community/datetimepicker';
class MotorsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            motorId: 'motorId'
        };
    }
    toggleMotors = async () => {
        rldb.ref(`/devices/Dev-1234/`).update({
            mainGate:true
        })
        
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Control Motors" navigation={this.props.navigation} />
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.toggleMotors}>
                        <Text>
                            Motors Screen
                        </Text>
                    </TouchableOpacity>
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