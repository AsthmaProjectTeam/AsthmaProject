import React, { Component } from 'react';
import { View, AsyncStorage, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import Dimensions from 'Dimensions';
import Toast from 'react-native-simple-toast';
import { HOST } from '../CONST';

const hardcodeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTUwMTUxNTc2NSwiZXhwIjoxNTMzMDUxNzY1fQ.i9AjBKKjgGnqzjkDUvNJGwnwiSG3bHzZRF2r_omWut0';
let savedToken = "";
class SubmitPage extends Component {

    async retrievetoken() {
        try {
            savedToken = await AsyncStorage.getItem('loginToken');
        } catch (error) {
            //.log(error)
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
            if(response.status === 200){
                Toast.show('Answers successfully submitted!', Toast.SHORT);
            }
        }).then(
                () => {
                    Actions.pop();
                    Actions.welcome();
                })
            .catch(error => {
               // console.log(error);
            });
    }

    render() {
        const { messageBoxText,summaryStyle, buttonListStyle, buttonStyle } = styles;
        return (
            <View style={{height: '100%'}}>
                <Text style={messageBoxText}>You have finished this questionnaire, review your answers and submit below.</Text>

                <ListView
                    dataSource={this.dataSource}
                    renderRow={(r) => {
                        return(
                            <View style={summaryStyle}>
                                {/*<TouchableOpacity>*/}
                                    <Text style={{marginBottom: 3, fontSize:30}}>{r.description} </Text>
                                    <Text style={{marginTop: 3, fontSize:30, marginBottom: 3, fontWeight: '700'}}>

                                      {Array.isArray(r.value)? r.value.join(', '):
                                        r.value
                                      }
                                      </Text>
                                {/*</TouchableOpacity>*/}
                            </View>
                        )
                    }}
                />

                <View style={buttonListStyle}>
                    <Button
                        large
                        block
                        danger
                        style={buttonStyle}
                        onPress={() => this.cancelButtonClicked()}>
                        <Text style={{fontSize:45}}>Cancel</Text>
                    </Button>
                    <Button
                        large
                        block
                        info
                        onPress={() => this.submitButtonClicked()}
                        style={buttonStyle}>
                        <Text style={{fontSize:45}}>Submit</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = {
    messageBoxText:{
        marginTop: 10,
        marginBottom: 10,
        marginRight: 4,
        marginLeft: 4,
        fontWeight:'bold',
        textAlign:'center',
        fontSize: 30
    },
    summaryStyle: {
        width: '90%',
        borderBottomWidth: 2,
        borderBottomColor: '#dddadf',
        alignSelf: 'center',
        marginTop: 5,
    },
    buttonListStyle: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    buttonStyle: {
        flex: 0.4,
        margin: 5,
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