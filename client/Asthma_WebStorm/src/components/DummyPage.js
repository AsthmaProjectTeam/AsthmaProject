import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';

class DummyPage extends Component {
    componentWillMount(){
        setTimeout(() => {
            Actions.pop();
            Actions.auth();
        }, 2500);
    }

    render(){
        const { imageStyle, messageContent, messageBox, messageBoxText } = styles;
        return(
            <View>
                <View style={messageContent}>
                    <View style={messageBox}>
                        <View>
                            <Text style={messageBoxText}>Sorry your login info is invalid. Please scan a valid QR code to login.</Text>
                        </View>
                    </View>
                </View>
                <Image style={imageStyle} source={require('../img/error.png')} />
            </View>
        )
    }
}

const styles = {
    imageStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    messageContent:{
        alignItems:'center'
    },
    messageBox:{
        backgroundColor:'#519acb',
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.1,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
    },
    messageBoxText:{
        fontWeight:'bold',
        color:'#eee',
        textAlign:'center',
        fontSize:16
    }
};

export default DummyPage;