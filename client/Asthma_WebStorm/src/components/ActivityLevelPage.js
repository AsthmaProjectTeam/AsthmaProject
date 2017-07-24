import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class ActivityLevelPage extends Component {
    onClick(key, value){
        this.props.dispatch({
            type: 'optionSelected',
            payload: {
                checked_option: key,
                checked_option_value: value
            }
        });
    }

    onBackButtonPress(){
        this.props.results.pop();
        this.props.history.pop();

        for(let question of this.props.currentquestionset){
            if(question.question._id == this.props.history[this.props.history.length-1]){
                this.props.dispatch({
                    type: 'backButtonClicked',
                    payload: {
                        results: this.props.results,
                        currentquestion: question,
                        history: this.props.history,
                    }
                });
            }
        }

        Actions.pop();
        Actions.location();
    }

    onNextButtonPress(){
        this.props.results.push({
            q_id: this.props.currentquestion.question._id,
            key: this.props.checked_option,
            value: this.props.checked_option_value,
            description: this.props.currentquestion.question.description
        });

        this.props.dispatch({
            type: 'lastQuestionReached',
            payload: {
                results: this.props.results
            }
        });

        Actions.pop();
        Actions.medication();
    }

    render(){
        const { buttonStyle, titleStyle, optionStyle, bottomButtonStyle, textStyle } = styles;
        const optionArray = this.props.currentquestion.question.options;
        return(
            <ScrollView>
                <Text style={titleStyle}>Q. {this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>
                <View style={optionStyle}>
                    <TouchableOpacity style={buttonStyle} onPress={() => this.onClick('A',optionArray[0].value)}>
                        <Image
                            style={buttonStyle}
                            source={require('../img/sleeping.jpg')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={buttonStyle} onPress={() => this.onClick('B',optionArray[1].value)}>
                        <Image
                            style={buttonStyle}
                            source={require('../img/walking.jpg')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={optionStyle}>
                    <Text>A.{optionArray[0].value}</Text>
                    <Text>B.{optionArray[1].value}</Text>
                </View>

                <View style={optionStyle}>
                    <TouchableOpacity style={buttonStyle} onPress={() => this.onClick('C',optionArray[2].value)}>
                        <Image
                            style={buttonStyle}
                            source={require('../img/running.jpg')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={buttonStyle} onPress={() => this.onClick('D',optionArray[3].value)}>
                        <Image
                            style={buttonStyle}
                            source={require('../img/exercising.jpg')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={optionStyle}>
                    <Text>C. {optionArray[2].value}</Text>
                    <Text>D. {optionArray[3].value}</Text>
                </View>
                <Text style={{marginTop: 20, alignSelf: 'center', fontSize: 16}}>Answer: {this.props.checked_option}</Text>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Button success style={bottomButtonStyle} onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button warning style={bottomButtonStyle} onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Next</Text>
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15
    },

    buttonStyle: {
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').width/3
    },

    bottomButtonStyle: {
        flex: 0.3,
        margin: 5
    },

    textStyle: {
      color: 'white',
      fontSize: 16
    },

    optionStyle: {
        margin: 10,
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width*0.8
    }
};

const mapStateToProps = state => {
    return {
        currentquestionset: state.questions.currentquestionset,
        questionset: state.questions.questionset,
        currentquestion: state.questions.currentquestion,
        checked_option : state.questions.checked_option,
        checked_option_value: state.questions.checked_option_value,
        results: state.questions.results,
        history:state.questions.history
    };
};

export default connect(mapStateToProps)(ActivityLevelPage);