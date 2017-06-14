import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux';

class SubmitPage extends Component {
    render() {
        return (
            <View>
                <Button
                    onPress={ Actions.welcomePage() }
                >
                    Submit Form
                </Button>
            </View>
        );
    }
}

export default SubmitPage;