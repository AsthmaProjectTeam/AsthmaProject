import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';


class DummyPage extends Component {
    componentWillMount(){
        setTimeout(() => {
            Actions.pop();
            Actions.auth();
        }, 1500);
    }

    render(){
        return(
            <View>
                <Text style={{color: 'red'}}>Please scan a valid QR code.</Text>
            </View>
        )
    }
}

export default DummyPage;