import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from './common/Button';
import QuestionList from './QuestionList';

class QuestionPage extends Component {
    render() {
        return (
            <View>
                <QuestionList/>
            </View>
        );
    }
}

export default QuestionPage;