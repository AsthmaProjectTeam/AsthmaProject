import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Right, Body, Left, CardItem } from 'native-base';
import Dimensions from 'Dimensions';
import { HOST } from '../CONST';

const hardcodeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTUwMTUxNTc2NSwiZXhwIjoxNTMzMDUxNzY1fQ.i9AjBKKjgGnqzjkDUvNJGwnwiSG3bHzZRF2r_omWut0';
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
                        'Authorization': `token ${hardcodeToken}`,
                        //'Authorization': `token ${savedToken}`,
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

        fetch(HOST+`/v2/question-set/${qset_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${hardcodeToken}`,
                //'Authorization': `token ${savedTokenfromPhone}`,
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
                'Authorization': `token ${hardcodeToken}`,
                //'Authorization': `token ${savedTokenfromPhone}`,
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

    render(){
        const { textStyle, messageContent, messageBox, messageBoxText, spinnerStyle, copyrightStyle } = styles;

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
            <View>
                <Modal
                    animationType={"slide"}
                    transparent
                    visible={this.state.modalShowing}
                    //presentationStyle='fullScreen'
                >
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width }}
                    >
                        <View style={{ width: Dimensions.get('window').width*0.8,
                                       height: Dimensions.get('window').height*0.8,
                                       alignSelf: 'center',
                                       backgroundColor: 'white',
                                       borderRadius: 3,
                                       borderWidth: 2,
                                       borderColor: 'dodgerblue' }}>
                            <Text>Instructions on using app...</Text>

                            <TouchableOpacity title={null} onPress={() => {this.setState({modalShowing: false})}}>
                                <Text>Okay, got it!</Text>
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
                    Welcome! Please tap on a questionnaire below to begin.
                </Text>

                {/*<View style={colorBarStyle}>*/}
                {/*</View>*/}

                <ScrollView
                    refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                    style={{height:Dimensions.get('window').height*0.72,
                            width: Dimensions.get('window').width*0.97,
                            alignSelf: 'center',
                            borderColor: 'dodgerblue',
                            borderWidth: 1,
                            shadowColor: '#778899',
                            shadowRadius: 3,
                            shadowOpacity: 0.2,
                            marginTop:Dimensions.get('window').height*0.01}}
                >
                    <View style={spinnerStyle}>
                        <ActivityIndicator animating={this.props.spinning}/>
                    </View>

                    {set}
                    {/*<TouchableOpacity style={{marginTop: 20, alignSelf: 'center'}} onPress={() => {AsyncStorage.getItem('loginToken')?AsyncStorage.removeItem('loginToken'):null; Actions.auth()}}>*/}
                        {/*<Text>log out</Text>*/}
                    {/*</TouchableOpacity>*/}
                </ScrollView>
                <View style={{ width: Dimensions.get('window').width,
                               height: Dimensions.get('window').height*0.095,
                               justifyContent: 'center' }}>
                    <CardItem>
                        <Text style={copyrightStyle}>             Copyright © 2017 by Vanderbilt University</Text>
                        <Right>
                            <TouchableOpacity title={null} onPress={this.setModalVisible.bind(this)}>
                                <Icon name="ios-help-circle-outline" style={{ color: 'dodgerblue', fontSize: 40 }}/>
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
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