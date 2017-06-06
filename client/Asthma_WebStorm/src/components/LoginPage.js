import React, { Component } from 'react';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux';

class LoginPage extends Component {
    onButtonPress(){
        Actions.welcomePage();
    }

    render(){
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Click to scan a QR code to login
            </Button>
        );
    }
};

export default LoginPage;