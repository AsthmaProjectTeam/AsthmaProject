import React, { Component } from 'react';
import { View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { List, Radio } from 'antd-mobile';
import { Actions } from 'react-native-router-flux';
import { Button, Text, ListItem, Right } from 'native-base';

const RadioItem = Radio.RadioItem;
let results = [];
class QuestionList extends Component {

    onBackButtonPress(){
        if(this.props.results.length){ // problem: 这里写this.props.results为啥不行。。这样的话当results为null时会报错
            this.props.results.pop();
            this.props.history.pop();

            for(let question of this.props.currentquestionset){
                if(question.question._id == this.props.history[this.props.history.length-1]){
                    this.props.dispatch({
                        type: 'backButtonClicked',
                        payload: {
                            results: this.props.results,
                            currentquestion: question,
                            checked_option: null,
                            history: this.props.history
                        }
                    });
                }
            }
        } else {
            this.props.dispatch({
                type: 'clearHistory',
                payload: {
                    results: null,
                    history: []
                }
            });
            Actions.welcome();
        }
    }

    onNextButtonPress(){
        if(this.props.currentquestion.end_question){
            results.push({
                q_id: this.props.currentquestion.question._id,
                value: this.props.checked_option
            });
            this.props.dispatch({
                type: 'lastQuestionReached',
                payload: {
                    results: results
                }
            });
            Actions.submit();
        } else {
            for(let next of this.props.currentquestion.next_question){
                if(next.prerequisite.option == this.props.checked_option){
                    results.push({
                        q_id: this.props.currentquestion.question._id,
                        value: this.props.checked_option
                    });

                    for(let question of this.props.currentquestionset){
                        if(question.question._id == next.question_id){
                            this.props.history.push(question.question._id);
                            this.props.dispatch({
                                type: 'nextButtonClicked',
                                payload: {
                                    results: results,
                                    currentquestion: question,
                                    checked_option: null,
                                    history: this.props.history
                                }
                            });
                        }
                    }

                }
            }
        }
    }

    onChange = (key) => {
        this.props.dispatch({
            type: 'optionSelected',
            payload: {
                checked_option: key
            }
        });
    };

    render() {
        // this is a problem for now: seems this page renders multiple times when gets back
        // console.log(this.props.history);
        const { titleStyle, buttonStyle } = styles;
        let { checked_option } = this.props;

        return(
            <View>
                <View>
                    <Text style={titleStyle}>
                        {this.props.currentquestion?this.props.currentquestion.question.description:"no question"}
                    </Text>
                </View>

                {/*<View>*/}
                    {/*{this.props.currentquestion?this.props.currentquestion.question.options.map(i => {*/}
                        {/*return (*/}
                            {/*<ListItem>*/}
                                {/*<Text>{i.key}. {i.value}</Text>*/}
                                {/*<Right>*/}
                                    {/*<Radio selected={checked_option === i.key}/>*/}
                                {/*</Right>*/}
                            {/*</ListItem>*/}
                        {/*)*/}
                        {/*}):<ListItem>*/}
                            {/*<Text>*/}
                                {/*not available*/}
                            {/*</Text>*/}
                            {/*<Right>*/}
                                {/*<Radio selected={false}/>*/}
                            {/*</Right>*/}
                        {/*</ListItem>}*/}
                {/*</View>*/}

                <List>
                    {this.props.currentquestion?this.props.currentquestion.question.options.map(i => {
                            return <RadioItem
                                key={i.key}
                                checked={checked_option === i.key}
                                onChange={() => this.onChange(i.key)}
                            >
                                {i.key}.  {i.value}
                            </RadioItem>
                        }):<Text>not available</Text>}
                </List>

                <View style={{flexDirection: 'row', flex: 1}}>
                    <Button success onPress={this.onBackButtonPress.bind(this)} style={buttonStyle}>
                        <Text>Back</Text>
                    </Button>
                    <Button warning onPress={this.onNextButtonPress.bind(this)} style={buttonStyle}>
                        <Text>Next</Text>
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

    buttonStyle: {
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
        results: state.questions.results,
        history:state.questions.history
    };
};

export default connect(mapStateToProps)(QuestionList);