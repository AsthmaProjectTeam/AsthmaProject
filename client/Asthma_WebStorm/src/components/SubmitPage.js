import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import Dimensions from 'Dimensions';
import Toast from 'react-native-simple-toast';

let savedToken = "";
class SubmitPage extends Component {

    async retrievetoken() {
        try {
            savedToken = await AsyncStorage.getItem('loginToken');
        } catch (error) {
            console.log(error)
        }
    }

    componentWillMount(){
        this.retrievetoken();
        // AsyncStorage.getItem('loginToken')
        //     .then(function (result) {
        //         savedToken = result.rawData;
        //     })
        //     .catch(error => console.log("error: " + error.message));
    }

    onButtonPress(){
        const dispatch = this.props.dispatch;
        fetch('http://10.67.89.36:8080/v2/patients/results', {
            method: 'POST',
            headers: {
                'Authorization': `token ${savedToken}`,
                //'Authorization': 'token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcwIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkyNzU1NzgsImV4cCI6MTUzMDg5NDYwMH0.zP8ee0xwqurrJjQZIG3SohFNThvSnSUMo-LileJhiaA',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'app':this.props.app,
                'results': this.props.results
            })
        }).then(function (response) {
            if(response.status == 200){
                Toast.show('Successfully Submit the Form!', Toast.SHORT);
            }
        }).then(
            dispatch({
                type: 'clearHistory',
                payload: {
                    results: null,
                    history: null
                }
            })).then(
                setTimeout(() => {
                    Actions.welcome();
                }, 2800))
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
        history: state.questions.history,
        showToast: state.questions.showToast
    }
};

export default connect(mapStateToProps)(SubmitPage);