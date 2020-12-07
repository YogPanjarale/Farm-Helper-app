import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity
 } from 'react-native';
 import {styles} from '../Styles'
class MotorsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                    <TouchableOpacity>
                        <Text>
                            Motors Screen
                        </Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

export default MotorsScreen;