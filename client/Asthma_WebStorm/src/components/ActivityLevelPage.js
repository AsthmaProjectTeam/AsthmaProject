import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
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
            cancel_disabled: false,
            pressState: false
        };
        //this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    _onHideUnderlay(){
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay(){
        this.setState({ pressStatus: true });
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
        // setTimeout(()=>{
        //     this.setState({
        //         cancel_disabled: false,
        //     });
        // }, 1000);

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

      setTimeout(()=>{
        if (this.refs.root){
          this.setState({
            next_disabled: false,
          });
        }
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
            imageContainerStyle,
            activityButtonStyle,
            titleStyle,
            optionTextStyle,
            bottomButtonStyle,
            textStyle,
            errorStyle,
            answerTextStyle,
            optionContainerStyle,
            answerTextStyleAndroid} = styles;

        const optionArray = this.props.currentquestion.question.options;
        let yourAnswer = this.state.error && Platform.OS === "android" ? <Text></Text> : <Text style={{alignSelf:'center', fontSize:30 }}>Your Answer:</Text>;
        let realAnswer = Platform.OS === "ios" ? <Text style={answerTextStyle}> {this.state.value}</Text> : <Text style={answerTextStyleAndroid}> {this.state.value}</Text>;

        return(
            <View style={{ backgroundColor: '#f5fffa', flex: 1, flexDirection: 'column', height: '100%', width: '100%'}}
                  ref="root">
                <Text style={titleStyle}>{this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>

                {optionArray.length!=0?
                    <View style={imageContainerStyle}>
                        <View style={optionContainerStyle}>
                            <View style={{margin: 0, padding: 0}}>
                                <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('A',optionArray[0].value)}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../img/ActivityLevel_laying.jpg')}
                                    />
                                    {/*<Text style={optionTextStyle}>{optionArray[0].value}</Text>*/}
                                </TouchableOpacity>
                            </View>
                            <View style={{margin: 0, padding: 0}}>
                                <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('B',optionArray[1].value)}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../img/ActivityLevel_sitting.jpg')}
                                    />
                                    {/*<Text style={optionTextStyle}>{optionArray[1].value}</Text>*/}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={optionContainerStyle}>
                            <View style={{margin: 0, padding: 0}}>
                                <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('C',optionArray[2].value)}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../img/ActivityLevel_standing.jpg')}
                                    />
                                    {/*<Text style={optionTextStyle}>{optionArray[2].value}</Text>*/}
                                </TouchableOpacity>
                                {/*<TouchableHighlight*/}
                                    {/*style={ this.state.pressStatus ? styles.activityButtonPressedStyle : styles.activityButtonStyle }*/}
                                    {/*onHideUnderlay={this._onHideUnderlay.bind(this)}*/}
                                    {/*onShowUnderlay={this._onShowUnderlay.bind(this)}*/}
                                    {/*underlayColor={'#6495ed'}*/}
                                    {/*onPress={() => this.onClick('C',optionArray[2].value)}*/}
                                {/*>*/}
                                    {/*<Image*/}
                                        {/*resizeMode='contain'*/}
                                        {/*source={require('../img/ActivityLevel_standing.jpg')}*/}
                                    {/*/>*/}
                                {/*</TouchableHighlight>*/}
                            </View>
                            <View style={{margin: 0, padding: 0}}>
                                <TouchableOpacity style={activityButtonStyle} onPress={() => this.onClick('D',optionArray[4].value)}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../img/ActivityLevel_hallway.jpg')}
                                    />
                                    {/*<Text style={optionTextStyle}>{optionArray[4].value}</Text>*/}
                                </TouchableOpacity>
                            </View>
                        </View>
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
    imageContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: Dimensions.get('window').height*0.6,
        width: Dimensions.get('window').width*0.9,
        alignSelf: 'center'
    },
    activityButtonStyle: {
        padding: 0,
        borderColor: '#6495ed',
        borderRadius: 4,
        borderWidth: 3,
        shadowColor: '#696969',
        shadowOpacity: 5
    },
    activityButtonPressedStyle: {
        padding: 0,
        borderColor: '#6495ed',
        backgroundColor: '#6495ed',
        borderRadius: 4,
        borderWidth: 3,
        shadowColor: '#696969',
        shadowOpacity: 5
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
        fontSize: 16,
        alignSelf: 'center'
    },
    optionContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '50%',
        width: '100%',
        margin: 0,
        padding: 0
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