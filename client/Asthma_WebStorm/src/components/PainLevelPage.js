import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class PainLevelPage extends Component {

    componentWillMount(){
        this.state = {
            level: 0
        };
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

    onClick(value){
        console.log(value);
        console.log(this.state.level);
        console.log(parseInt(value));
        this.setState({
            level: parseInt(value)
        });
    }

    // helper(height, width){
    //     if(height / width > 1)
    //         return '80%';
    //     else
    //         return '50%';
    // };

    render() {
        const { containerStyle, titleStyle, imageStyle, welcomeStyle, instructionStyle, textStyle, bottomButtonStyle } = styles;
        //const w = helper(Dimensions.get('window').height, Dimensions.get('window').width);
        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>{this.props.currentquestion?this.props.currentquestion.question.description:"no question"}</Text>
                <View style={{ height: Dimensions.get('window').height*0.15}}>
                <ScrollView
                    horizontal
                    decelerationRate="fast"
                    centerContent={true}
                    overScrollMode="never"
                    showsHorizontalScrollIndicator = {false}
                    style = {{
                        width: '90%',
                        paddingTop: 50,
                        flex: 1
                        //backgroundColor: 'red'
                    }}
                >
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('0')}>
                        <Image source={require('../img/face0.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('1')}>
                        <Image source={require('../img/face1.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('2')}>
                        <Image source={require('../img/face2.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('3')}>
                        <Image source={require('../img/face3.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('4')}>
                        <Image source={require('../img/face4.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 2}} onPress={() => this.onClick('5')}>
                        <Image source={require('../img/face5.png')}/>
                    </TouchableOpacity>
                    </ScrollView>
                </View>
                <Image style={imageStyle} resizeMode="contain" source={require('../img/painlevel3.png')} />

                {/*<Slider*/}
                    {/*style={{width: '80%', marginTop: 20 }}*/}
                    {/*step={1}*/}
                    {/*minimumValue={0}*/}
                    {/*maximumValue={10}*/}
                    {/*value={this.state.level}*/}
                    {/*onSlidingComplete={ val => this.getVal(val)}*/}
                {/*/>*/}
                <Text style={welcomeStyle}>
                    {parseInt(this.state.level)}
                </Text>
                <Text style={instructionStyle}>
                    Please tab a face to rate your current pain level.
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
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15
        //borderWidth: 1,
        //borderColor: 'red'
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        //backgroundColor: 'yellow',
        alignSelf: 'center'
    },
    welcomeStyle: {
        fontSize: 36,
        textAlign: 'center',
        margin: 10
    },
    instructionStyle: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 36,
    },
    imageStyle: {
        width: '90%',
        //height: '30%',
        // marginTop: 50,
        // paddingTop: 30,
        //borderWidth: 1,
        //borderColor: 'green'
    },
    textStyle: {
        color: 'white',
        fontSize: 30
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