import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase/app'
import 'firebase/auth'
import {styles} from '../Styles'
import { Icon } from 'react-native-elements';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <Text>
                    Custom Side Drawer
            </Text>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props} />
                </View>
                <View style={
                    {
                         flex: 1,
                      //  alignSelf:'flex-end',
                         justifyContent: 'flex-end',
                         
                        paddingBottom: 30
                    }
                }>
                    <TouchableOpacity style={{
                        backgroundColor: '#FF2A4F',
                        paddingHorizontal: 10,
                        margin: 10,
                        paddingVertical: 10,
                        borderRadius: 5,
                        flex:1,
                        flexDirection:'row',
                        maxHeight:50,
                    }}
                        onPress={() => {
                            this.props.navigation.navigate('WelcomeScreen')
                            firebase.auth().signOut()
                        }}>
                        <Text style={
                            {
                                fontSize: 18,
                                fontWeight:"bold",
                                color:'#fff',
                                marginRight:20,
                            }
                        }>Log Out</Text>
                        <Icon size={30} name ='input' color="#fff" style={{alignSelf:'flex-end'}}/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default SideBar