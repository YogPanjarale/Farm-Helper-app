import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from '../Styles'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase/database'
import db, { rldb } from '../config'
import { TextField } from '@material-ui/core'
import DateTimePicker from '@react-native-community/datetimepicker';
class MotorsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            motorId: 'motorId'
        };
    }
    toggleMotors = async () => {
        rldb.ref(`motors/${this.state.motorId}/input/`).update({
            IsOn: false
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
                        <DateTimePicker/>
                        <RNDateTimePicker minimumDate={new Date(1950, 0, 1)} />

                    </View>
                </View>
            </View>
        );
    }
}

export default MotorsScreen;