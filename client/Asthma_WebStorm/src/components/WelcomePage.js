import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button';
import { startButtonClicked } from '../actions/index';
import { Actions } from 'react-native-router-flux';

class WelcomePage extends Component {
    onButtonPress(){
        this.props.dispatch({type: 'startButtonClicked'});
        Actions.questionList();
    }

    render(){
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Click to start answer questions
            </Button>
        );
    }
};

export default connect()(WelcomePage);