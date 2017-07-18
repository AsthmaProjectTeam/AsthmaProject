import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Right } from 'native-base';
import Dimensions from 'Dimensions';
import { HOST } from '../CONST';

//const hardcodeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAzLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTQ5OTk2NzAzNSwiZXhwIjoxNTMxNTc5NTg5fQ.zs_ilRGgwDt9V7DVN4jyVsYwUo0ZnJDwJ8hWlrGn_TQ';
let savedTokenfromPhone = "";
class WelcomePage extends Component {

    componentDidMount(){
        const dispatch = this.props.dispatch;
        dispatch({
            type: 'clearHistory',
            payload: {
                results: [],
                history: []
            }
        });

        AsyncStorage.getItem('loginToken',(err,savedToken)=>{
            if(err) {
                console.log('err at getItem');
                console.log(err);
            }
            else {
                savedTokenfromPhone = savedToken;
                // if(moment.unix(jwtDecode(savedTokenfinal).exp) < moment()){
                //   fetch('http://127.0.0.1:8080/v2/admin/refresh', {
                //       method: 'GET',
                //       headers: {
                //           'Authorization': `token ${savedTokenfinal}`,
                //           'Content-Type': 'application/json',
                //           'Accept': 'application/json'
                //       }
                //   }) .then(response => globalerrorhandling(response))
                //       .then(function(response){
                //       savedTokenfinal = response.json().token;
                //       AsyncStorage.setItem('loginToken', savedTokenfinal);
                //   })
                // }

                fetch(HOST+'/v2/patients/profile', {
                    method: 'GET',
                    headers: {
                        //'Authorization': `token ${hardcodeToken}`,
                        'Authorization': `token ${savedToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => globalerrorhandling(response))
                    .then(response => response.json())
                    .then(response => response.patient.question_set)
                    .then(function (response) {
                        dispatch({
                            type: 'getAllQuestionSets',
                            payload: {
                                questionset: response,
                                spinning: false
                            }
                        });
                    }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

     onButtonPress(qset_id){
        const dispatch = this.props.dispatch;
        const history = this.props.history;

        // savedTokenfinal = savedTokenfromPhone;
        // if(moment.unix(jwtDecode(savedTokenfromPhone).exp) < moment()){
        //     fetch('http://127.0.0.1:8080/v2/admin/refresh', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `token ${savedTokenfromPhone}`,
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         }
        //     }) .then(response => globalerrorhandling(response))
        //         .then(function(response){
        //             savedTokenfinal = response.json().token;
        //             AsyncStorage.setItem('loginToken', savedTokenfinal);
        //         })
        // }

        fetch(HOST+`/v2/question-set/${qset_id}`, {
            method: 'GET',
            headers: {
                //'Authorization': `token ${hardcodeToken}`,
                'Authorization': `token ${savedTokenfromPhone}`,
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        }).then(response => globalerrorhandling(response))
            .then(response => response.json())
            .then(response => response.question_set.content)
            .then(function (response) {
                history.push(response[0].question._id);
                dispatch({
                    type: 'startButtonClicked',
                    payload: {
                        currentquestionset: response,
                        currentquestion: response[0],
                        app: response[0].question.app,
                        history: history,
                        results:[],
                    }
                });
            }).then(function(){
                Actions.pop();
                Actions.main()
             })
            .catch((error) => {
            console.log('error:' + error.message);
        });
    }

    render(){
        const { textStyle, messageContent, messageBox, messageBoxText, spinnerStyle } = styles;

        const listcolor = function get_random_color() {
            let letters = 'BCDEF'.split('');
            let color = '#';
            for (let i=0; i<6; i++ ) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };

        const set = (this.props.questionset.length!=0)?this.props.questionset.map(qset => {
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
            )}):
                <View style={messageContent}>
                    <View style={messageBox}>
                        <View>
                            <Text style={messageBoxText}>You have no questions to answer</Text>
                        </View>
                    </View>
                </View>;

        return (
            <ScrollView style={{flex: 1}}>
                <View style={spinnerStyle}>
                    <ActivityIndicator animating={this.props.spinning}/>
                </View>
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
    },
    messageContent:{
        marginTop: Dimensions.get('window').height*0.1,
        alignItems:'center'
    },
    messageBox:{
        backgroundColor:'#777',
        width:300,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:10
    },
    messageBoxText:{
        fontWeight:'bold',
        color:'#eee',
        textAlign:'center',
        fontSize:16
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 5
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
        checked_option_value: state.questions.checked_option_value,
        history: state.questions.history,
        spinning: state.questions.spinning
    };
};

export default connect(mapStateToProps)(WelcomePage);