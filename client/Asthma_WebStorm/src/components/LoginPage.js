import React, { Component } from 'react';
import { View } from 'react-native';
import Button from './common/Button';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class LoginPage extends Component {
    onButtonPress(){
        Actions.scanScreen();
    }

    render(){

        return(
            <View>
                <Button onPress={this.onButtonPress.bind(this)}>
                    Click to scan a QR code to login
                </Button>
            </View>

        );
    }
};

export default connect()(LoginPage);