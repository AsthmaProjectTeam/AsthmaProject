'use strict';

import React, { Component } from 'react';
import { Linking, View, Text, AsyncStorage, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import RNExitApp from 'react-native-exit-app';
import Joi from 'react-native-joi';
import { HOST } from '../CONST';

class ScanScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            token: null,
            uuid: ""
        };
    }

    genId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    call (err, value) {
    if(err){
        console.log('I come from call function');
        Actions.pop();
        Actions.dummy();
    }
    else {
        this.setState({
            token:value.token,
            uuid: this.genId()
        });
        const saveduuid = this.state.uuid;

        fetch(HOST+'/v2/accounts/patients/register', {
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
                AsyncStorage.setItem("loginToken", response.token)
                    .then(() => {
                        Actions.pop();
                        Actions.welcome();
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }).catch((error) => {
                console.log(error);
        });
    }
}

    onSuccess(val) {
        let schema = Joi.object().keys({
           token: Joi.string().required()
        });

        try{
            const parsedData = JSON.parse(val.data);
            Joi.validate(parsedData, schema, this.call.bind(this));
        } catch(error){
            console.log('I am JSON parse error');
            console.log(error);
            Actions.pop();
            Actions.dummy();
        }
    }

    render(){

        return(
            <View>
                <QRCodeScanner onRead={this.onSuccess.bind(this)}/>
            </View>

        );
    }
}

export default ScanScreen;