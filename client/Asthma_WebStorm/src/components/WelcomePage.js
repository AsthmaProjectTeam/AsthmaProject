import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Right } from 'native-base';
import Dimensions from 'Dimensions';

let savedToken = "";
class WelcomePage extends Component {

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    async retrievetoken() {
        try {
            savedToken = await AsyncStorage.getItem('loginToken');
            console.log('AsyncStorage get Item to retrieve savedToken');
            console.log(savedToken);
        } catch (error) {
            console.log(error)
        }
    }

    componentWillMount(){
        const dispatch = this.props.dispatch;
        dispatch({
            type: 'clearHistory',
            payload: {
                results: [],
                history: []
            }
        });

        //this.retrievetoken();
        AsyncStorage.getItem('loginToken',(err,savedToken)=>{
            if(err) console.log(err);
            else {
                console.log('I am ready to fetch, my savedToken is: ');
                console.log(savedToken);
                fetch('http://10.67.89.36:8080/v2/patients/profile', {
                    method: 'GET',
                    headers: {
                        //'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkzNzgzOTgsImV4cCI6MTQ5OTQyMTU5OH0.UQRXgKKa4_08hlwi6GcOvaMOhuOfqUp311SGj-jxYaI',
                        'Authorization': `token ${savedToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => response.json())
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
                    console.log('error:' + error.message);
                });
            }
        });
        // AsyncStorage.getItem('loginToken')
        //     .then(function (result) {
        //         savedToken = result.rawData;
        //     })
        //     .catch(error => console.log("error: " + error.message));

    }

    onButtonPress(qset_id){
        const dispatch = this.props.dispatch;
        const history = this.props.history;

        fetch(`http://10.67.89.36:8080/v2/question-set/${qset_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${savedToken}`,
                //'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE0OTkzNzgzOTgsImV4cCI6MTQ5OTQyMTU5OH0.UQRXgKKa4_08hlwi6GcOvaMOhuOfqUp311SGj-jxYaI',
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        }).then(response => response.json())
            .then(response => response.question_set.content)
            .then(function (response) {
                history.push(response[0].question._id);
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
        history: state.questions.history,
        spinning: state.questions.spinning
    };
};

export default connect(mapStateToProps)(WelcomePage);