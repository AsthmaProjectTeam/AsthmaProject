import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';
import { connect } from 'react-redux';

class MedicationPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            date:null,
            checked: false,
            pickerIsDisabled: false
        }
    }

    checkBoxClicked(check){
        this.props.dispatch({
            type: 'clearError'
        });


        if(check){
            this.props.dispatch({
                type: 'optionSelected',
                payload: {
                    checked_option: 'I forgot',
                    checked_option_value: 'I forgot'
                }
            });
        }else{
            this.props.dispatch({
                type: 'unclickForgot'
            })
        }

        this.setState({
            checked: check
        });
        if(check){
            this.setState({
                pickerIsDisabled: true
            })
        }else{
            this.setState({
                pickerIsDisabled: false
            })
        }

    }

    onBackButtonPress(){
        this.props.results.pop();

        this.props.dispatch({
            type: 'medicationBackButtonClicked',
            payload: {
                results: this.props.results
            }
        });

        //Actions.pop();
        Actions.activity();
    }

    onNextButtonPress() {
        if (this.props.checked_option == null) {
            this.props.dispatch({
                type: 'optionBlankError',
                payload: {
                    error: 'Please select a date or check the checkbox above.'
                }
            })
        } else {
            if (this.state.checked) {
                this.props.results.push({
                    q_id: 12,
                    key: "time",
                    value: "I forgot",
                    description: "When did you take your medication last time"
                });
            } else {
                this.props.results.push({
                    q_id: 12,
                    key: "time",
                    value: this.state.date,
                    description: "When did you take your medication last time"
                });
            }
            this.props.dispatch({
                type: 'medicationBackButtonClicked',
                payload: {
                    results: this.props.results
                }
            });

            //Actions.pop();
            Actions.submit();
        }
    }

    onDateChange(date){
        this.setState({
            date: date
        });

        this.props.dispatch({
            type: 'clearError'
        });

        this.props.dispatch({
            type: 'optionSelected',
            payload: {
                checked_option: date,
                checked_option_value: date
            }
        });
    }

    render(){
        const { titleStyle, buttonStyle, buttonRowStyle, textStyle, errorStyle } = styles;

        const picker = (!this.state.pickerIsDisabled)?
            <DatePicker
                disabled={false}
                style={{width: 300}}
                date={this.state.date}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD HH:mm"
                minDate="2017-01-01 08:15"
                maxDate="2026-06-01 08:15"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
                onDateChange={(date) => this.onDateChange(date)}
            />:
            <DatePicker
                disabled={true}
                style={{width: 300}}
                date={"0000-00-00 00:00"}
                mode="datetime"
                customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
            />;

        return (
            <View>
                <Text style={titleStyle}>Q. When did you take your medication last time?</Text>
                <Image style={{width: '70%', height: '40%', alignSelf:'center'}} source={require('../img/thinking.png')}/>
                <View style={{alignItems: 'center', marginTop:40 }}>
                    {picker}
                </View>
                <CheckBox
                    center
                    title='I forgot.'
                    checked={this.state.checked}
                    onIconPress={() => this.checkBoxClicked(!this.state.checked)}
                />
                <Text style={errorStyle}>
                    {this.props.error}
                </Text>
                <View style={buttonRowStyle}>
                    <Button style={buttonStyle} success onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button style={buttonStyle} danger onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Summary</Text>
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
         flex: 1
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        marginTop: 10
    }
};

const mapStateToProps = state => {
    return {
        results: state.questions.results,
        error: state.questions.error,
        checked_option: state.questions.checked_option,
        checked_option_value: state.questions.checked_option_value
    };
};

export default connect(mapStateToProps)(MedicationPage);