import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux';

let history = [];
class WelcomePage extends Component {

    componentWillMount(){
        const dispatch = this.props.dispatch;
        // AsyncStorage.getItem('loginToken')
        //     .then(
        //         (result) => {
        fetch('http://192.168.100.7:8080/v2/patients/profile', {
            method: 'GET',
            headers: {
                //'Authorization': `token ${result}`
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXVpZCI6InJlcXVpcmUifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJ1dWlkIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MiwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiaW5pdGlhdG9ycyI6WzJdLCJjcmVhdGVkX2RhdGUiOiIyMDE3LTA2LTI4VDIwOjM3OjM0LjcxNVoiLCJyb2xlIjoicGF0aWVudCIsInJlc3VsdF9zZXQiOltdLCJxdWVzdGlvbl9zZXQiOltdLCJ1dWlkIjoiYTdlODU1NDQtODhhZS00MDU4LTkxMjUtYTE0ZWU5NGQ5ODg3IiwiX2lkIjo1MiwiX192IjowfSwiaWF0IjoxNDk4NjgyMjU0LCJleHAiOjE1MzAyMTgyNTR9.nzjxWoVuCD5eWwYSffu693LGub4cDkq8DX_nolrxgKw',
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

    onButtonPress(qset){
        const dispatch = this.props.dispatch;
        // AsyncStorage.getItem('loginToken')
        //     .then(
        //         (result) => {
        fetch(`http://192.168.100.7:8080/v2/question-set/${qset}`, {
            method: 'GET',
            headers: {
                //'Authorization': `token ${result}`
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXVpZCI6InJlcXVpcmUifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJ1dWlkIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MiwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiaW5pdGlhdG9ycyI6WzJdLCJjcmVhdGVkX2RhdGUiOiIyMDE3LTA2LTI4VDIwOjM3OjM0LjcxNVoiLCJyb2xlIjoicGF0aWVudCIsInJlc3VsdF9zZXQiOltdLCJxdWVzdGlvbl9zZXQiOltdLCJ1dWlkIjoiYTdlODU1NDQtODhhZS00MDU4LTkxMjUtYTE0ZWU5NGQ5ODg3IiwiX2lkIjo1MiwiX192IjowfSwiaWF0IjoxNDk4NjgyMjU0LCJleHAiOjE1MzAyMTgyNTR9.nzjxWoVuCD5eWwYSffu693LGub4cDkq8DX_nolrxgKw',
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        }).then(response => response.json())
            .then(response => response.question_set.content)
            .then(function (response) {
                history.push(response[0].question._id); // problem: 第一次back没问题，第二次back会push两个问题0，第三次3个。。
                dispatch({
                    type: 'startButtonClicked',
                    payload: {
                        currentquestionset: response,
                        currentquestion: response[0],
                        app: response[0].question.app,
                        checked_option: null,
                        history: history
                    }
                });
            }).then(Actions.main())
            .catch((error) => {
            console.log('error:' + error.message);
        });
        // }
        // )
    }

    render(){
        const set = this.props.questionset?this.props.questionset.map(qset => {
            return (
                <View key={qset._id}>
                    <Button onPress={() => this.onButtonPress(qset._id)}>
                        {qset.title}
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
}

const mapStateToProps = state => {
    return {
        questionset: state.questions.questionset,
        currentquestionset: state.questions.currentquestionset,
        currentquestion: state.questions.currentquestion,
        app: state.questions.app,
        title: state.questions.title,
        checked_option: state.questions.checked_option,
        history: state.questions.history
    };
};

export default connect(mapStateToProps)(WelcomePage);