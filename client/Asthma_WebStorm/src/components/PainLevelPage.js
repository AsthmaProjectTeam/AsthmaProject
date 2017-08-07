import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Image
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class PainLevelPage extends Component {

    componentWillMount(){
        this.state = {level: 0};
    }

    componentWillReceiveProps(){
        this.state = {level: 0};
    }

    getVal(val){
        this.setState({level:val});
    }

    onCancelButtonPress(){
        this.props.dispatch({
            type: 'clearHistory',
            payload: {
                results: [],
                history: [],
                checked_option: null
            }
        });
        Actions.pop();
        Actions.welcome();
    }

    onNextButtonPress(){
        this.props.results.push({
            q_id: this.props.currentquestion.question._id,
            key: this.state.level.toString(),
            value: this.state.level.toString(),
            description: this.props.currentquestion.question.description
        });

        for(let question of this.props.currentquestionset){
            if(question.question._id == this.props.currentquestion.next_question[0].question_id){
                this.props.history.push(question.question._id);
                this.props.dispatch({
                    type: 'nextButtonClicked',
                    payload: {
                        currentquestion: question,
                        results: this.props.results,
                        history: this.props.history
                    }
                });
                break;
            }
        }

        Actions.pop();
        Actions.location();
    }

    render() {
        const { containerStyle, titleStyle, imageStyle, welcomeStyle, instructionStyle, textStyle, bottomButtonStyle } = styles;
        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>{this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>
                <Image style={imageStyle} source={require('../img/painlevel.jpg')} />
                <Slider
                    style={{ width:Dimensions.get('window').width*0.9, marginTop: 20 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    value={this.state.level}
                    onSlidingComplete={ val => this.getVal(val)}
                />
                <Text style={welcomeStyle}>
                    {parseInt(this.state.level)}
                </Text>
                <Text style={instructionStyle}>
                    Please select your current pain level.
                </Text>
                <View style={{flexDirection: 'row', flex: 1, position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <Button danger style={bottomButtonStyle} onPress={this.onCancelButtonPress.bind(this)}>
                        <Text style={textStyle}>Cancel</Text>
                    </Button>

                    <Button success style={bottomButtonStyle} onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: Dimensions.get('window').width
    },
    welcomeStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructionStyle: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    imageStyle: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.3
    },
    textStyle: {
        color: 'white',
        fontSize: 16
    },
    bottomButtonStyle: {
        flex: 0.4,
        margin: 5
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

export default connect(mapStateToProps)(PainLevelPage);