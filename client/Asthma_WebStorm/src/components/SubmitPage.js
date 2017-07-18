import React, { Component } from 'react';
import { View, AsyncStorage, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import Dimensions from 'Dimensions';
import Toast from 'react-native-simple-toast';
import { HOST } from '../CONST';

//const hardcodeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAzLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTQ5OTk2NzAzNSwiZXhwIjoxNTMxNTc5NTg5fQ.zs_ilRGgwDt9V7DVN4jyVsYwUo0ZnJDwJ8hWlrGn_TQ';
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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.results);
    }

    cancelButtonClicked(){
        Actions.pop();
        Actions.welcome();
    }

    submitButtonClicked(){
        const dispatch = this.props.dispatch;
        fetch(HOST+'/v2/patients/results', {
            method: 'POST',
            headers: {
                'Authorization': `token ${savedToken}`,
                //'Authorization': `token ${hardcodeToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'app':this.props.app,
                'results': this.props.results
            })
        }).then(response => globalerrorhandling(response))
            .then(function (response) {
            console.log({response});
            if(response.status == 200){
                Toast.show('Successfully Submit the Form!', Toast.SHORT);
            }
        }).then(
                setTimeout(() => {
                    Actions.pop();
                    Actions.welcome();
                }, 2800))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { messageBoxText,summaryStyle, buttonListStyle, buttonStyle } = styles;
        return (
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={(r) => {
                        return(
                            <View style={summaryStyle}>
                                {/*<TouchableOpacity>*/}
                                    <Text style={{marginBottom: 3}}>{r.description} </Text>
                                    <Text style={{marginTop: 3, marginBottom: 3, color: '#9e9e9e'}}>{r.key}. {r.value} </Text>
                                {/*</TouchableOpacity>*/}
                            </View>
                        )
                    }}
                />

                <Text style={messageBoxText}>You have finished this question set, click button below to submit or cancel.</Text>

                <View style={buttonListStyle}>
                    <Button block danger style={buttonStyle} onPress={this.cancelButtonClicked.bind(this)}>
                        <Text>Cancel</Text>
                    </Button>
                    <Button block info onPress={this.submitButtonClicked.bind(this)} style={buttonStyle}>
                        <Text>Submit</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = {
    messageBoxText:{
        width:Dimensions.get('window').width*0.9,
        marginTop: 10,
        marginBottom: 10,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:16
    },
    summaryStyle: {
        width: Dimensions.get('window').width*0.9,
        borderBottomWidth: 2,
        borderBottomColor: '#dddadf',
        alignSelf: 'center',
        marginTop: 5
    },
    buttonListStyle: {
        flexDirection: 'row',
        padding: 5,
        alignSelf: 'center'
    },
    buttonStyle: {
        margin: 10,
        width: Dimensions.get('window').width*0.45
    },
};

const mapStateToProps = state => {
    return {
        app: state.questions.app,
        results: state.questions.results,
        history: state.questions.history,
        showToast: state.questions.showToast,
        currentquestionset: state.questions.currentquestionset
    }
};

export default connect(mapStateToProps)(SubmitPage);