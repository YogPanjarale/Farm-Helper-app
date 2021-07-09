import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { auth } from '../firebase'
import * as firebase from 'firebase'
import { Appbar, Button } from 'react-native-paper'
type State = {
 user:firebase.default.User|null
}

export default class ProfileScreen extends Component<{},State> {
    constructor(props: {} | Readonly<{}>) {
      super(props);
    }
    componentDidMount = () => {
        const user  = auth().currentUser
        this.setState({user})
    };
    logout = () => {
        auth().signOut()

    }
    render() {
        return (
			<View style={styles.flex}>
                	<Appbar.Header>
					<Appbar.Content title="Profile Screen" />
				</Appbar.Header>
            <View style={styles.container}>
                {/* <Text> Profile Screen </Text> */}
                {/* <Text>{JSON.stringify(this.state?.user)}</Text> */}
                <Text style={styles.text}>signed in as {this.state?.user?.email}</Text>
                <Button  mode="contained" onPress={()=>{this.logout()}}>Log out</Button>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex:{
        flex:1,
    },
    container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
    text:{
        fontSize:20,
        margin:10,
        fontWeight:'500'
    }
})
