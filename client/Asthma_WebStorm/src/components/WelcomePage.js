import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Right, Body, Left, CardItem } from 'native-base';
import Dimensions from 'Dimensions';
import { HOST } from '../CONST';

const hardcodeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTUxNTc4NDQ4MCwiZXhwIjoxNTQ3MzIwNDgwfQ.f3sP2MSNxd5yuD4__Qyc7svrACLkcMlhPHqS5r-WMII';
let savedTokenfromPhone = "";

class WelcomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            modalShowing: false
        };
    }

    componentDidMount(){
        const dispatch = this.props.dispatch;
        dispatch({
            type: 'clearHistory',
            payload: {
                results: [],
                history: [],
                checked_option:null
            }
        });

        AsyncStorage.getItem('loginToken',(err,savedToken)=>{
            if(err) {
                console.log('err at getItem');
                console.log(err);
            }
            else {
                savedTokenfromPhone = savedToken;

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
                    .then(response => response.patient)
                    .then(function (response) {
                        dispatch({
                            type: 'getAllQuestionSets',
                            payload: {
                                questionset: response.question_set,
                                spinning: false,
                                patientName: `${response.first_name}`
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
                Actions.pain();
                // Actions.main()
             })
            .catch((error) => {
            console.log('error:' + error.message);
        });
    }

    _onRefresh(){
        this.setState({refreshing: true});
        const dispatch = this.props.dispatch;
        //const setState = this.setState;

        fetch(HOST+'/v2/patients/profile', {
            method: 'GET',
            headers: {
                //'Authorization': `token ${hardcodeToken}`,
                'Authorization': `token ${savedTokenfromPhone}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => globalerrorhandling(response))
            .then(response => response.json())
            .then(response => response.patient)
            .then(function (response) {
                dispatch({
                    type: 'getAllQuestionSets',
                    payload: {
                        questionset: response.question_set,
                        spinning: false,
                        patientName: `${response.first_name}`
                    }
                });
            })
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        refreshing: false,
                    });
                }, 1000);
            })
            .catch((error) => {
            console.log(error);
        });
    }

    setModalVisible() {
        this.setState({modalShowing: true});
    }

    backString() {
        return (this.props.patientName.length===0)?
            ("!")
        :(" back, ");
    }

    nameString() {
        return (this.props.patientName.length===0)?
            ("")
        :(`${this.props.patientName}!`);
    }

    render(){
        const { textStyle,
                messageContent,
                messageBox,
                messageBoxText,
                spinnerStyle,
                copyrightStyle,
                questionSetListContainer,
                modalContainerStyle,
                instructionContainerStyle,
                instructionTitleStyle,
                instructionStyle,
                closeModalButtonStyle,
                nameStyle } = styles;

        const listcolor = function get_random_color() {
            let letters = 'BCDEF'.split('');
            let color = '#';
            for (let i=0; i<6; i++ ) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };

        const set = (this.props.questionset.length!==0)?this.props.questionset.map(qset => {
            return (
                <Button
                    block
                    key={qset._id}
                    onPress={() => this.onButtonPress(qset._id)}
                    style={{backgroundColor: listcolor(), flex:1, margin: 10, marginTop: 5}}
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
                            <Text style={messageBoxText}>You have no assigned Question Sets.</Text>
                        </View>
                    </View>
                </View>;

        return (
            <View style={{height: '100%', width: '100%'}}>
                <Modal
                    animationType={"slide"}
                    transparent
                    visible={this.state.modalShowing}
                    onRequestClose={() => {this.setState({modalShowing: false})}}
                    //presentationStyle='fullScreen'
                >
                    <View style={ modalContainerStyle }>
                        <View style={ instructionContainerStyle }>
                            <Text style={ instructionTitleStyle }>How to use the app...</Text>
                            <Text style={ instructionStyle }>
                                {'- Select the questionnaire you wish to answer\n\n' +
                                 '- Follow the prompts and answer the questions accordingly,' +
                                 ' using the "Back" and "Next" buttons to progress through the' +
                                 ' questionnaire\n\n' +
                                 '- After reviewing your answers, press "Submit" and your information' +
                                 ' will be instantly sent to your healthcare provider\n\n' +
                                 '- You may continue to answer questionnaires as you like or' +
                                 ' as instructed by your doctor\n\n\n'}
                            </Text>

                            <TouchableOpacity title={null}
                                              onPress={() => {this.setState({modalShowing: false})}}
                                              style={ closeModalButtonStyle }
                            >
                                <Text style={{ ...instructionStyle,
                                               alignSelf: 'center',
                                               textAlign: 'center',
                                               fontWeight: '500',
                                               color: 'white' }}>
                                    Okay, got it!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 60 }}>

                    </View>
                </Modal>

                <Text style={{ ...textStyle,
                    color: 'dodgerblue',
                    marginTop: 10,
                    fontWeight: '500',
                    marginRight: 8,
                    marginLeft: 8}}>
                    <Text>{`Welcome${this.backString()}`}</Text>
                    <Text style={ nameStyle }>{`${this.nameString()}`}</Text>
                    <Text> Please tap on a questionnaire below to begin.</Text>
                </Text>

                <ScrollView
                    refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                    style={ questionSetListContainer }
                >
                    <View style={spinnerStyle}>
                        <ActivityIndicator animating={this.props.spinning}/>
                    </View>

                    {set}
                    <TouchableOpacity style={{marginTop: 20, alignSelf: 'center'}} onPress={() => {AsyncStorage.getItem('loginToken')?AsyncStorage.removeItem('loginToken'):null; Actions.auth()}}>
                        <Text>log out</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ width: '100%',
                               height: '95%',
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               marginTop: 8,
                               flexDirection: 'row',
                               flex: 1}}>
                    <View></View>
                    <Text style={copyrightStyle}>Copyright © 2017 by Vanderbilt University</Text>
                    <TouchableOpacity title={null} onPress={this.setModalVisible.bind(this)}>
                        <Icon name="ios-help-circle-outline" style={{ color: 'dodgerblue', fontSize: 40, marginRight: 15 }}/>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#515151'
    },
    messageContent:{
        marginTop: 10,
        alignItems:'center'
    },
    messageBox:{
        backgroundColor:'#777',
        width:Dimensions.get('window').width*0.93,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:5
    },
    messageBoxText:{
        fontWeight:'bold',
        color:'#eee',
        textAlign:'center',
        fontSize:16
    },
    colorBarStyle: {
        marginTop: 4,
        height: Dimensions.get('window').height*0.002,
        width: Dimensions.get('window').width*0.93,
        backgroundColor: 'dodgerblue',
        alignSelf: 'center'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 5
    },
    copyrightStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 13,
        color: '#777'
    },
    questionSetListContainer: {
        height: '78%',
        width: '97%',
        alignSelf: 'center',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        shadowColor: '#778899',
        shadowRadius: 3,
        shadowOpacity: 0.2,
        marginTop:Dimensions.get('window').height*0.01
    },
    modalContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
        height: '100%',
        width: '100%'
    },
    instructionContainerStyle: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 4,
        borderColor: 'dodgerblue'
    },
    instructionTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#13263a',
        fontSize: 24,
        marginTop: Dimensions.get('window').height*0.02,
        marginBottom: Dimensions.get('window').height*0.02,
        textDecorationLine: 'underline'
    },
    instructionStyle: {
        marginLeft: Dimensions.get('window').width*0.03,
        marginRight: Dimensions.get('window').width*0.03,
        fontSize: 18,
        color: '#13263a'
    },
    closeModalButtonStyle: {
        backgroundColor: 'dodgerblue',
        height: Dimensions.get('window').height*0.08,
        width: Dimensions.get('window').width*0.4,
        margin: Dimensions.get('window').width*0.04,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        borderRadius: 6,
        justifyContent: 'center'
    },
    nameStyle: {
        color: '#ffa85b',
        fontWeight: '600'
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
        spinning: state.questions.spinning,
        patientName: state.questions.patientName
    };
};

export default connect(mapStateToProps)(WelcomePage);