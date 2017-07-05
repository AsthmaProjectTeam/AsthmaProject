import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import Dimensions from 'Dimensions';

class SubmitPage extends Component {

    onButtonPress(){
        const dispatch = this.props.dispatch;
        fetch('http://127.0.0.1:8080/v2/patients/results', {
            method: 'POST',
            headers: {
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkyNzU1NzgsImV4cCI6MTQ5OTMxODc3OH0.yeMQQbcE9vNrq2ywT0oGHXM792uzdL1l1kTjTsoS694',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'app':this.props.app,
                'results': this.props.results
            })
        }).then(function (response) {
            if(response.status == 200){
                console.log('successfully submited the form!');
            }
        }).then(
            dispatch({
                type: 'clearHistory',
                payload: {
                    results: null,
                    history: null
                }
            })).then(Actions.welcome())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View>
                <Button
                    block
                    info
                    onPress={this.onButtonPress.bind(this)}
                    style={{width:Dimensions.get('window').width*0.9, alignSelf:'center', marginTop: 20}}
                >
                    <Text>Submit Form</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.questions.app,
        results: state.questions.results,
        history: state.questions.history
    }
};

export default connect(mapStateToProps)(SubmitPage);