import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Right } from 'native-base';

class WelcomePage extends Component {

    componentWillMount(){
        const dispatch = this.props.dispatch;
        dispatch({
            type: 'clearHistory',
            payload: {
                results: null,
                history: []
            }
        });
        // AsyncStorage.getItem('loginToken')
        //     .then(
        //         (result) => {
        fetch('http://127.0.0.1:8080/v2/patients/profile', {
            method: 'GET',
            headers: {
                //'Authorization': `token ${result}`
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkyNzU1NzgsImV4cCI6MTQ5OTMxODc3OH0.yeMQQbcE9vNrq2ywT0oGHXM792uzdL1l1kTjTsoS694',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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

    onButtonPress(qset_id){
        const dispatch = this.props.dispatch;
        const history = this.props.history;
        // AsyncStorage.getItem('loginToken')
        //     .then(
        //         (result) => {
        fetch(`http://127.0.0.1:8080/v2/question-set/${qset_id}`, {
            method: 'GET',
            headers: {
                //'Authorization': `token ${result}`
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkyNzU1NzgsImV4cCI6MTQ5OTMxODc3OH0.yeMQQbcE9vNrq2ywT0oGHXM792uzdL1l1kTjTsoS694',
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
                        history: history,
                        results:[],
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
        const { textStyle } = styles;

        const listcolor = function get_random_color() {
            let letters = 'BCDEF'.split('');
            let color = '#';
            for (let i=0; i<6; i++ ) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };

        const set = this.props.questionset?this.props.questionset.map(qset => {
            return (
                <Button
                    block
                    key={qset._id}
                    onPress={() => this.onButtonPress(qset._id)}
                    style={{backgroundColor: listcolor(), flex:1, margin: 10}}
                >
                   <Text style={textStyle}>{qset.title}</Text>
                   <Right>
                       <Icon name="ios-arrow-dropright-circle" style={{color: '#515151'}}/>
                   </Right>

                </Button>
            )}):<Text>No question to answer</Text>;

        return (
            <ScrollView style={{flex: 1}}>
                {set}
            </ScrollView>


        )
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#515151'
    }
};

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