'use strict';

import React, { Component } from 'react';
import { Linking, View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
//import uuid from 'react-native-uuid';

class ScanScreen extends Component {
    // componentWillMount(){
    //     fetch('http://127.0.0.1:8080/v2/accounts/patients/register', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `token ${this.state.token}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             'uuid': this.genId()
    //         })
    //     }).then(function(response){
    //         console.log(response);
    //     });
    // }

    constructor(props){
        super(props);
        this.state = {
            token: 'None'
        };
    }

    genId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    onSuccess(val) {
        this.setState({
            token:val.data
        });
    }

    render(){
        fetch('http://127.0.0.1:8080/v2/accounts/patients/register', {
            method: 'POST',
            headers: {
                'Authorization': "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTgwNjQ2NjYsImV4cCI6MTQ5ODA2ODI2Nn0.u-mTbBLmTP5Dw5KrtHvFtjR2TJIRmDAYl1pSwas9lpA",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'uuid': this.genId()
            })
        }).then(response => response.json())
            .then(response => console.log(response));

        return(
            <View>
                <Text style={ [{color:"red"},{fontSize:16}] }>{this.state.token}</Text>
                <QRCodeScanner onRead={this.onSuccess.bind(this)}/>
            </View>

        );
    }
};

export default ScanScreen;