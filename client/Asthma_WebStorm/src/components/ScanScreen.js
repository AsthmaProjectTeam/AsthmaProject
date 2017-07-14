'use strict';

import React, { Component } from 'react';
import { Linking, View, Text, AsyncStorage } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import Joi from 'react-native-joi';

class ScanScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            token: null,
            uuid: ""
        };
    }

    // handleErrors(response) {
    //     if (!response.ok) {
    //         throw Error(response.statusText);
    //     }
    //     return response;
    // }

    genId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    onSuccess(val) {
        let schema = Joi.object().keys({
           token: Joi.string().required()
        });
        Joi.validate(val.data, schema, function (err, value) {
            if(err)
                alert("Invalid QR code. Please check the form of your code.");
            else {
                this.setState({
                    token:value.token,
                    uuid: this.genId()
                });
                const saveduuid = this.state.uuid;

                fetch('http://10.67.96.12:8080/v2/accounts/patients/register', {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `token ${this.state.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'uuid': saveduuid
                    })
                }).then(response => globalerrorhandling(response))
                    .then(response => response.json())
                    .then(function(response){
                        console.log('this is replied long term token: ' + response.token);

                        AsyncStorage.setItem("loginToken", response.token)
                            .then(() => {
                                console.log("long term token is saved");
                                Actions.welcome();
                            })
                            .catch(error => {
                                console.log(error.message);
                            })
                    }).catch((error) => {
                        console.log(error);
                });
            }
        })
    }

    render(){

        return(
            <View>
                <Text style={ [{color:"red"},{fontSize:16}] }>{this.state.uuid}</Text>
                <QRCodeScanner onRead={this.onSuccess.bind(this)}/>
            </View>

        );
    }
};

export default ScanScreen;