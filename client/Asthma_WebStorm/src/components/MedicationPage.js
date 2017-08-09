import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ListView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

class MedicationPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkedOption: null,
            checkedValue: null,
            error: null
        }
    }

    onSelect(key, value){
        this.setState({
            ...this.state,
            checkedOption:key,
            checkedValue:value,
            error:null
        });
    }

    async onBackButtonPress(){
        this.props.results.pop();
        this.props.history.pop();

        for(let question of this.props.currentquestionset){
            if(question.question._id == this.props.history[this.props.history.length-1]){
                await this.props.dispatch({
                    type: 'backButtonClicked',
                    payload: {
                        results: this.props.results,
                        currentquestion: question,
                        history: this.props.history,
                    }
                });
                break;
            }
        }

        Actions.pop();
        Actions.activity();
    }

    onNextButtonPress() {
        if(this.state.checkedOption == null){
            this.setState({...this.state, error: 'Please select a time.'});
        } else {
            this.props.results.push({
                q_id: this.props.currentquestion.question._id,
                key: this.state.checkedOption,
                value: this.state.checkedValue,
                description: this.props.currentquestion.question.description
            });

            Actions.pop();
            Actions.submit();
        }
    }


    render(){
        const { titleStyle, buttonStyle, buttonRowStyle, textStyle, errorStyle } = styles;

        return (
            <View style={{height: '100%'}}>
                <Text style={titleStyle}>{this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>

                <View style={{width: Dimensions.get('window').width*0.7, alignSelf:'center'}}>
                    {this.props.currentquestion.question.options.map((option) => {
                        return (
                            <CheckBox
                                checked={this.state.checkedOption == option.key}
                                onPress={() => this.onSelect(option.key, option.value)}
                                key={option.key}
                                title={option.value}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                textStyle={{fontSize: 18}}
                            />
                        )
                    })}
                </View>

                <Text style={errorStyle}>
                    {this.state.error}
                </Text>
                <View style={buttonRowStyle}>
                    <Button style={buttonStyle} warning onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button style={buttonStyle} success onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Review</Text>
                    </Button>
                </View>
            </View>
        )

    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15,
        alignSelf: 'center'
    },
    buttonStyle: {
        flex: 0.4,
        margin: 5
    },
    textStyle: {
        color: 'white',
        fontSize: 16
    },
    buttonRowStyle: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        position: 'absolute',
        bottom: 55
    }
};

const mapStateToProps = state => {
    return {
        results: state.questions.results,
        checked_option: state.questions.checked_option,
        checked_option_value: state.questions.checked_option_value,
        currentquestionset: state.questions.currentquestionset,
        questionset: state.questions.questionset,
        currentquestion: state.questions.currentquestion,
        history:state.questions.history
    };
};

export default connect(mapStateToProps)(MedicationPage);