import React, { Component } from 'react';
import { View, Text, Image, Switch } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';
import { connect } from 'react-redux';

const radio_props_head = [
    {label: 'Head', value: 'Head' }
];

const radio_props_back_head = [
    {label: 'Back of Head', value: 'Back of Head' }
];

const radio_props_upper = [
    {label: 'Left Shoulder', value: 'Left Shoulder' },
    {label: 'Chest', value: 'Chest' },
    {label: 'Right Shoulder', value: 'Right Shoulder' }
];

const radio_props_back_upper = [
    {label: 'Back - Upper Left', value: 'Back - Upper Left' },
    {label: 'Back', value: 'Back' },
    {label: 'Back - Upper Right', value: 'Back - Upper Right' }
];

const radio_props_middle = [
    {label: 'Belly', value: 'Belly' }
];

const radio_props_back_middle = [
    {label: 'Lower Back', value: 'Lower Back' }
];

const radio_props_bottom = [
    {label: 'Left Leg', value: 'Left Leg' },
    {label: 'Right Leg', value: 'Right Leg' }
];

const radio_props_back_bottom = [
    {label: 'Back  of Left Leg', value: 'Back of Left Leg' },
    {label: 'Back of Right Leg', value: 'Back of Right Leg' }
];

class PainLocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true,
            checked: null,
            error: null
        }
    }

    toggleSwtich(value){
        this.setState({ switchValue: value });
    }

    locatePain(value){
        this.setState({...this.state, checked:value, error:null});
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
        Actions.pain();
    }

    async onNextButtonPress(){
        if(this.state.checked == null){
            this.setState({...this.state, error: 'Please make a selection.'});
        }else{
            this.props.results.push({
                q_id: this.props.currentquestion.question._id,
                key: this.state.checked,
                value: this.state.checked,
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
                    Actions.activity();
                    break;
                }
            }
         }
    }

    render() {
        const { containerStyle, headButtonStyle, upperButtonStyle, bottomButtonStyle, middleButtonStyle, switchTextStyle, buttonStyle, textStyle, buttonRowStyle, errorStyle } = styles;
        const frontOrback = this.state.switchValue?
            <Image style={containerStyle} source={require('../img/bodymap_front.png')}>
                <Switch onValueChange = {() => this.toggleSwtich(!this.state.switchValue)} value = {this.state.switchValue}/>
                <Text style={switchTextStyle}>{this.state.switchValue ? 'Front' : 'Back'}</Text>
                <View style={headButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_head}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={upperButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_upper}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={middleButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_middle}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={bottomButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_bottom}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <Text style={errorStyle}>{this.state.error}</Text>
            </Image>:
            <Image style={containerStyle} source={require('../img/bodymap_back.png')}>
                <Switch onValueChange = {() => this.toggleSwtich(!this.state.switchValue)} value = {this.state.switchValue}/>
                <Text style={switchTextStyle}>{this.state.switchValue ? 'Front' : 'Back'}</Text>
                <View style={headButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_back_head}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={upperButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_back_upper}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={middleButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_back_middle}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <View style={bottomButtonStyle}>
                    <RadioForm
                        radio_props={radio_props_back_bottom}
                        initial={null}
                        onPress={(value) => this.locatePain(value)}
                        formHorizontal={true}
                    />
                </View>
                <Text style={errorStyle}>{this.state.error}</Text>
            </Image>;

            return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {frontOrback}
                    <View style={buttonRowStyle}>
                        <Button style={buttonStyle} warning onPress={this.onBackButtonPress.bind(this)}>
                            <Text style={textStyle}>Back</Text>
                        </Button>

                        <Button style={buttonStyle} success onPress={this.onNextButtonPress.bind(this)}>
                            <Text style={textStyle}>Next</Text>
                        </Button>
                    </View>
                </View>

            )
        }
}

const styles = {
    containerStyle: {
        backgroundColor: 'transparent',
        flex: 1,
        resizeMode: 'stretch',
        position: 'absolute',
        width: '100%',
        height: '85%',
    },
    headButtonStyle: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 30
    },
    upperButtonStyle: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height/3.5+10,
        justifyContent: 'space-between'
    },
    middleButtonStyle:{
        position: 'absolute',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height/2.5,
    },
    bottomButtonStyle:{
        position: 'absolute',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height/1.9,
    },
    switchTextStyle: {
        fontSize: 20,
        color: 'red'
    },
    buttonStyle: {
        flex: 0.4, margin: 5
    },
    textStyle: {
        color: 'white',
        fontSize: 16
    },
    buttonRowStyle: {
        flexDirection: 'row',
        flex: 1,
        marginTop: Dimensions.get('window').height*0.8
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginTop: Dimensions.get('window').height*0.62
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

export default connect(mapStateToProps)(PainLocationPage);