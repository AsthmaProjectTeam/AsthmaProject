'use strict';

import React, { Component } from 'react';
import { Linking, View, Text, AsyncStorage } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Storage from '../../src/Storage';
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
            token: null
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

        fetch('http://10.67.181.212:8080/v2/accounts/patients/register', {
            method: 'POST',
            headers: {
                'Authorization': `token ${this.state.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'uuid': this.genId()
            })
        }).then(response => response.json())
            .then(function(response){
                console.log('this is replied long term token: ' + response.token);
                AsyncStorage.setItem("loginToken", response.token)
                    .then(
                        () => {
                            console.log("token is saved");
                        }
                    );
                // storage.save({
                //     key: 'loginToken',
                //     data: {
                //         token: response.token
                //     },
                //     expires: null
                // });
            }).catch((error) => {
                console.error(error);
            });
    }

    render(){

        return(
            <View>
                <Text style={ [{color:"red"},{fontSize:16}] }>{this.state.token}</Text>
                <QRCodeScanner onRead={this.onSuccess.bind(this)}/>
            </View>

        );
    }
};

export default ScanScreen;