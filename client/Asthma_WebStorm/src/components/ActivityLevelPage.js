import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class ActivityLevelPage extends Component {
    componentWillMount(){
        this.state = {
            key: null,
            value: null,
            error: null
        };
    }



    onClick(key, value){
        this.setState({
            key:key,
            value:value,
            error: null
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
        Actions.location();
    }

    async onNextButtonPress() {
        if (this.state.key == null) {
            this.setState({error: "Please make a selection."});
        } else {
            this.props.results.push({
                q_id: this.props.currentquestion.question._id,
                key: this.state.key,
                value: this.state.value,
                description: this.props.currentquestion.question.description
            });

            for(let question of this.props.currentquestionset){
                if(question.question._id == this.props.currentquestion.next_question[0].question_id){
                    this.props.history.push(question.question._id);
                    await this.props.dispatch({
                        type: 'nextButtonClicked',
                        payload: {
                            currentquestion: question,
                            results: this.props.results,
                            history: this.props.history
                        }
                    });
                    Actions.pop();
                    Actions.medication();
                    break;
                }
            }
        }
    }
    render(){
        const { scrollViewContainerStyle,
                activityButtonStyle,
                titleStyle,
                optionStyle,
                bottomButtonStyle,
                textStyle,
                errorStyle,
                insets,
                imageStyle } = styles;
        const optionArray = this.props.currentquestion.question.options;

        return(
            <View>
                <Text style={titleStyle}>Q. {this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>

                <ScrollView horizontal
                            decelerationRate={0}
                            centerContent
                            directionalLockEnabled
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            style={scrollViewContainerStyle}
                            //contentInset={insets}
                            //scrollIndicatorInsets={insets}
                            snapToAlignment="start"
                            snapToInterval={Dimensions.get('window').width*0.84}
                            //contentOffset={{x: Dimensions.get('window').width*(-0.07), y: 0}}
                >
                    <View style={{height: Dimensions.get('window').width/2, width:Dimensions.get('window').width*0.07}} />
                    <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('A',optionArray[0].value)}>
                        <Image
                            style={imageStyle}
                            source={require('../img/sleeping.jpg')}
                        />
                        <Text>A.{optionArray[0].value}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('B',optionArray[1].value)}>
                        <Image
                            style={imageStyle}
                            source={require('../img/walking.jpg')}
                        />
                        <Text>B.{optionArray[1].value}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('C',optionArray[2].value)}>
                        <Image
                            style={imageStyle}
                            source={require('../img/running.jpg')}
                        />
                        <Text>C. {optionArray[2].value}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('D',optionArray[3].value)}>
                        <Image
                            style={imageStyle}
                            source={require('../img/exercising.jpg')}
                        />
                        <Text>D. {optionArray[3].value}</Text>
                    </TouchableOpacity>
                    <View style={{height: Dimensions.get('window').width/2, width:Dimensions.get('window').width*0.07}} />
                </ScrollView>

                <Text style={{marginTop: 20, alignSelf: 'center', fontSize: 16}}>Answer: {this.state.key}</Text>
                <Text style={errorStyle}>
                    {this.state.error}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Button warning style={bottomButtonStyle} onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button success style={bottomButtonStyle} onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Next</Text>
                    </Button>
                </View>
            </View>
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
    activityButtonStyle: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').width*0.7,
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: Dimensions.get('window').width*0.02,
        marginRight: Dimensions.get('window').width*0.02,
        //borderColor: '#696969',
        //borderRadius: 3,
        //borderWidth: 1
    },
    imageStyle: {
        width: Dimensions.get('window').width*0.6,
        height: Dimensions.get('window').width*0.6
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
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    },
    scrollViewContainerStyle: {
        //borderColor: '#1e90ff',
        //borderWidth: 2,
        alignSelf: 'center',
        width: Dimensions.get('window').width*0.98,
        height: Dimensions.get('window').height*0.4
    },
    insets: {
        top: Dimensions.get('window').height*0.02,
        left: Dimensions.get('window').width*0.02,
        bottom: Dimensions.get('window').width*0.02,
        right: Dimensions.get('window').width*0.02
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