import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';

class DummyPage extends Component {
    componentWillMount(){
        setTimeout(() => {
            //Actions.pop();
            Actions.auth();
        }, 2500);
    }

    render(){
        const { imageStyle } = styles;
        return(
            <View>
                <Image style={imageStyle} source={require('../img/error.jpeg')} />
            </View>
        )
    }
}

const styles = {
    imageStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    }
};

export default DummyPage;