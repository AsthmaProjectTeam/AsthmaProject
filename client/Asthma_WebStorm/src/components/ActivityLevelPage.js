import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/EvilIcons';

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

        const {
                scrollViewContainerStyle,
                activityButtonStyle,
                titleStyle,
                optionTextStyle,
                bottomButtonStyle,
                textStyle,
                errorStyle,
                answerTextStyle,
                imageStyle,
                colorBarStyle,
                instructionContainerStyle } = styles;
        const optionArray = this.props.currentquestion.question.options;

        return(
            <View style={{ backgroundColor: '#f5fffa', flex: 1, flexDirection: 'column'}}>
                <Text style={titleStyle}>{this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>
                <View style={colorBarStyle}></View>

                <View style={instructionContainerStyle}>
                    <Text style={{ fontSize: 15 }}>Swipe and tap to make selection.</Text>
                    <View style={{ flexDirection: 'row',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   alignSelf: 'center' }}>
                        <Icon name="chevron-left" size={30} color="black" />
                        <Icon name="pointer" size={30} color="black" />
                        <Icon name="chevron-right" size={30} color="black" />
                    </View>
                </View>

                {optionArray.length!=0?
                <View style={scrollViewContainerStyle}>
                    <ScrollView horizontal
                                decelerationRate={0}
                                centerContent
                                directionalLockEnabled
                                showsHorizontalScrollIndicator//={false}
                                overScrollMode="never"
                                snapToAlignment="start"
                                snapToInterval={Dimensions.get('window').width*0.84}

                                //contentOffset={{x: Dimensions.get('window').width*(-0.07), y: 0}}
                    >
                        <View style={{width:Dimensions.get('window').width*0.08}} />
                        <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('F',optionArray[5].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_sleeping.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[5].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity focusedOpacity={1} style={activityButtonStyle} onPress={() => this.onClick('A',optionArray[0].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_laying.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[0].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('B',optionArray[1].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_sitting.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[1].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('C',optionArray[2].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_standing.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[2].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('D',optionArray[3].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_room.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[3].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('E',optionArray[4].value)}>
                            <Image
                                style={imageStyle}
                                source={require('../img/ActivityLevel_hallway.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[4].value}</Text>
                        </TouchableOpacity>
                        <View style={{height: Dimensions.get('window').width/2, width:Dimensions.get('window').width*0.08}} />
                    </ScrollView>
                </View>:<View></View>}

                <View style={{marginTop: 10}}>
                    <Text style={{alignSelf:'center', fontSize:16 }}>Your Answer:</Text>
                    <Text style={answerTextStyle}> {this.state.value}</Text>
                </View>
                <Text style={errorStyle}> {this.state.error}</Text>
                <View style={{
                               flexDirection: 'row',
                               position: 'absolute',
                               left: 0, right: 0, bottom: 0}}>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.01,
    },
    activityButtonStyle: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').width*0.8,
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: Dimensions.get('window').width*0.02,
        marginRight: Dimensions.get('window').width*0.02,
        borderColor: '#6495ed',
        borderRadius: 4,
        borderWidth: 3,
        shadowColor: '#696969',
        shadowOpacity: 5
    },
    imageStyle: {
        width: Dimensions.get('window').width*0.57,
        height: Dimensions.get('window').width*0.57,
        marginTop: Dimensions.get('window').width*0.03
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
        alignSelf: 'center'
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        position: 'absolute',
        bottom: 55
    },
    answerTextStyle: {
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#6495ed'
    },
    optionTextStyle: {
        fontSize: 16,
        marginTop: 2
    },
    colorBarStyle: {
        height: Dimensions.get('window').height*0.002,
        width: Dimensions.get('window').width*0.93,
        backgroundColor: 'black',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height*0.02
    },
    instructionContainerStyle: {
        marginTop: 5,
        alignSelf: 'center'
        //borderColor: 'black',
        //borderWidth: 2
    },
    scrollViewContainerStyle:{
        //backgroundColor: 'yellow',
        height: Dimensions.get('window').width*0.8
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