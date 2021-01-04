import {Input } from 'react-native-elements';
import {styles,colors} from '../Styles'
import React, { Component } from 'react';
class MyInput extends Component {
    render() {
      return (
        <Input
          id={this.props.id}
          label={this.props.label}
          value={this.props.value}
          inputStyle={styles.blackinputStyle}
          inputContainerStyle={styles.blackinputContainer}
          labelStyle={styles.blackinputLabel}
          onChangeText={this.props.onChangeText}
          leftIcon={{type:"font-awesome", name: this.props.iconName }}
        />
      );
    }
  }
  export default MyInput;