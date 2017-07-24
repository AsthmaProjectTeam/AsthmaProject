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
    constructor(props) {
        super(props);
        this.state = { pain: 0 }
    }

    getVal(val){
        this.props.dispatch({
            type: 'optionSelected',
            payload: {
                checked_option: val,
                checked_option_value: val
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
        Actions.activity();
    }

    render() {
        const { containerStyle, titleStyle, imageStyle, welcomeStyle, instructionStyle, textStyle, bottomButtonStyle } = styles;
        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>Q. {this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>
                <Image style={imageStyle} source={require('../img/painlevel.jpg')} />
                <Slider
                    style={{ width:Dimensions.get('window').width*0.9, marginTop: 20 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    value={this.state.pain}
                    onValueChange={val => this.setState({ pain: val })}
                    onSlidingComplete={ val => this.getVal(val)}
                />
                <Text style={welcomeStyle}>
                    {this.state.pain}
                </Text>
                <Text style={instructionStyle}>
                    Please select your current pain level.
                </Text>
                <View style={{flexDirection: 'row', flex: 1, marginTop: 20}}>
                    <Button success style={bottomButtonStyle} onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button warning style={bottomButtonStyle}>
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
        width: Dimensions.get('window').width*0.95,
        height: 200
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