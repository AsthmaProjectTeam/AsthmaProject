import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
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
            error: null,
            activityButtonWidth: Dimensions.get('window').height*0.5,
            next_disabled: false,
            cancel_disabled: false
        };
        //this.onLayoutChange = this.onLayoutChange.bind(this);
    }


    // onLayoutChange(e) {
    //     let layout = e.nativeEvent.layout;
    //     this.setState({
    //         activityButtonWidth: (layout.height+65)*0.5
    //     });
    // }

    onClick(key, value){
        this.setState({
            key:key,
            value:value,
            error: null
        });
    }

    onBackButtonPress(){
        this.setState({
            cancel_disabled: true,
        });

        // enable after 5 second
        setTimeout(()=>{
            this.setState({
                cancel_disabled: false,
            });
        }, 1000);

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
                break;
            }
        }

        Actions.pop();
        //Actions.location();
    }

    onNextButtonPress() {
        this.setState({
            next_disabled: true,
        });

        // enable after 5 second
        setTimeout(()=>{
            this.setState({
                next_disabled: false,
            });
        }, 1000);

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
                    this.props.dispatch({
                        type: 'nextButtonClicked',
                        payload: {
                            currentquestion: question,
                            results: this.props.results,
                            history: this.props.history
                        }
                    });
                    //Actions.pop();
                    Actions.medication();
                    break;
                }
            }
        }
    }
    render(){
        const {
                activityButtonStyle,
                titleStyle,
                optionTextStyle,
                bottomButtonStyle,
                textStyle,
                errorStyle,
                answerTextStyle,
                imageStyle,
                colorBarStyle,
                instructionContainerStyle,
                answerTextStyleAndroid} = styles;
        const optionArray = this.props.currentquestion.question.options;
        let yourAnswer = this.state.error && Platform.OS === "android" ? <Text></Text> : <Text style={{alignSelf:'center', fontSize:30 }}>Your Answer:</Text>;
        let realAnswer = Platform.OS === "ios" ? <Text style={answerTextStyle}> {this.state.value}</Text> : <Text style={answerTextStyleAndroid}> {this.state.value}</Text>;

        return(
            <View style={{ backgroundColor: '#f5fffa', flex: 1, flexDirection: 'column', height: '100%', width: '100%'}}>
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
                <View style={{height: this.state.activityButtonWidth}}>
                    <ScrollView horizontal
                                decelerationRate="fast"
                                centerContent={true}
                                directionalLockEnabled
                                showsHorizontalScrollIndicator//={false}
                                overScrollMode="never"
                                snapToAlignment="center"
                                snapToInterval={this.state.activityButtonWidth + Dimensions.get('window').width*0.04}

                                //contentOffset={{x: Dimensions.get('window').width*(-0.07), y: 0}}
                    >
                        {/*<View style={{width: '1%'}}></View>*/}
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} onPress={() => this.onClick('F',optionArray[5].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_sleeping.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[5].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} focusedOpacity={1} onPress={() => this.onClick('A',optionArray[0].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_laying.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[0].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} onPress={() => this.onClick('B',optionArray[1].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_sitting.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[1].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} onPress={() => this.onClick('C',optionArray[2].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_standing.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[2].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} onPress={() => this.onClick('D',optionArray[3].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_room.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[3].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[activityButtonStyle, {width: this.state.activityButtonWidth}]} onPress={() => this.onClick('E',optionArray[4].value)}>
                            <Image
                                resizeMode='contain'
                                style={[imageStyle, {width: this.state.activityButtonWidth*0.7, height: this.state.activityButtonWidth*0.7}]}
                                source={require('../img/ActivityLevel_hallway.jpg')}
                            />
                            <Text style={optionTextStyle}>{optionArray[4].value}</Text>
                        </TouchableOpacity>
                        {/*<View style={{height: Dimensions.get('window').width/2, width:Dimensions.get('window').width*0.1}} />*/}
                    </ScrollView>
                </View>:<View></View>}

                <Text style={{marginTop: 10, alignSelf: "center", textAlign: "center"}}>
                    {yourAnswer}
                    {realAnswer}
                </Text>
                <Text style={errorStyle}> {this.state.error}</Text>
                <View style={{
                               flexDirection: 'row',
                               position: 'absolute',
                               left: 0, right: 0, bottom: 0}}>
                    <Button
                        large
                        disabled = {this.state.cancel_disabled}
                        warning
                        style={bottomButtonStyle}
                        onPress={() => this.onBackButtonPress()}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button
                        large
                        disabled = {this.state.next_disabled}
                        success
                        style={bottomButtonStyle}
                        onPress={() => this.onNextButtonPress()}>
                        <Text style={textStyle}>Next</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height*0.01,
    },
    activityButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width*0.02,
        marginRight: Dimensions.get('window').width*0.02,
        borderColor: '#6495ed',
        borderRadius: 4,
        borderWidth: 3,
        shadowColor: '#696969',
        shadowOpacity: 5
    },
    imageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin:5
        // borderColor: 'red',
        // borderWidth: 1
    },
    bottomButtonStyle: {
        flex: 0.3,
        margin: 5
    },
    textStyle: {
      color: 'white',
      fontSize: 50
    },
    optionStyle: {
        margin: 10,
        alignSelf: 'center'
    },
    errorStyle: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red',
        position: 'absolute',
        bottom: 85
    },
    answerTextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#6495ed'
    },
    answerTextStyleAndroid: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#6495ed',
        alignSelf: 'flex-end'
    },
    optionTextStyle: {
        fontSize: 30,
        marginTop: 2
    },
    colorBarStyle: {
        height: Dimensions.get('window').height*0.002,
        width: '93%',
        backgroundColor: 'black',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height*0.02
    },
    instructionContainerStyle: {
        marginTop: 5,
        alignSelf: 'center'
        //borderColor: 'black',
        //borderWidth: 2
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