import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';
class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Header
                    centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
                    backgroundColor='#FFAA00'
                    leftComponent={(
                        <Icon name="list"
                            color={'#fff'}
                            onPress={() => {
                                this.props.navigation.openDrawer();
                            }}
                            
                            size={30}
                        />)} 
                />
        );
    }
}

export default MyHeader;