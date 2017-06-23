import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux';

class WelcomePage extends Component {

    componentWillMount(){
        const dispatch = this.props.dispatch;
        // AsyncStorage.getItem('loginToken')
        //     .then(
        //         (result) => {
        fetch('http://10.67.218.204:8080/v2/patients/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7InJlc3VsdF9zZXQiOnsicGFpbl9jaGVjayI6W119fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwic2NvcGUiOnsiX192IjowLCJfaWQiOjQzLCJ1dWlkIjoiYTQ1MDY0NGEtOGJiMy00NDFkLWE4MDItODIwNTc0M2I1ZjY5IiwicXVlc3Rpb25fc2V0IjpbXSwicmVzdWx0X3NldCI6eyJwYWluX2NoZWNrIjpbXX0sInJvbGUiOiJwYXRpZW50IiwiY3JlYXRlZF9kYXRlIjoiMjAxNy0wNi0yM1QxODowODo0MC4xNjJaIiwiaW5pdGlhdG9ycyI6WzBdfSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXVpZCI6InJlcXVpcmUifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJ1dWlkIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MiwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiaW5pdGlhdG9ycyI6WzBdLCJjcmVhdGVkX2RhdGUiOiIyMDE3LTA2LTIzVDE4OjA4OjQwLjE2MloiLCJyb2xlIjoicGF0aWVudCIsInJlc3VsdF9zZXQiOnsicGFpbl9jaGVjayI6W119LCJxdWVzdGlvbl9zZXQiOltdLCJ1dWlkIjoiYTQ1MDY0NGEtOGJiMy00NDFkLWE4MDItODIwNTc0M2I1ZjY5IiwiX2lkIjo0MywiX192IjowfSwiaWF0IjoxNDk4MjQxMzIwLCJleHAiOjE0OTgyODQ1MjB9.xcaaqzSOKbwOO6luMr09HgHSr-3Q-8eJ4izYEIlaZrk',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(response => response.patient.question_set)
            .then(function (response) {
                dispatch({
                    type: 'getAllQuestionSets',
                    payload: {
                        questionset: response
                    }
                });
            }).catch((error) => {
            console.log('error:' + error.message);
        });
        // }
        // )
    }

    render(){


        const set = this.props.questionset?this.props.questionset.map(qset => {
            return (
                <View key={qset}>
                    <Button>
                        click to answer question set {qset}
                    </Button>
                </View>
            )
            }):<Text>No question to answer</Text>;
        return (
            <View>
            {set}
            </View>
        )
    }
};

const mapStateToProps = state => {
    return { questionset: state.questions.questionset };
};

export default connect(mapStateToProps)(WelcomePage);