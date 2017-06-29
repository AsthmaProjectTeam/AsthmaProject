import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Card  from './common/Card';
import { CardSection } from './common/CardSection';
import { List, Radio } from 'antd-mobile';
import Button from './common/Button';
import { Input } from './common/Input';
import { Actions } from 'react-native-router-flux';

const RadioItem = Radio.RadioItem;
let results = [];
class QuestionList extends Component {

    onBackButtonPress(){
        console.log(this.props.results);
        if(this.props.results.length){ // problem: 这里写this.props.results为啥不行。。这样的话当results为null时会报错
            console.log('s');
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
                    results: null, //problem: 这里清空results就不应该能back了，但貌似没用，回到welcome页面又有了

                    history: null
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

    // fetchCurrentQuestion(q_id, dispatch){
    //     fetch(`http://10.67.125.236:8080/v2/questions/?id=${q_id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7InJlc3VsdF9zZXQiOnsicGFpbl9jaGVjayI6W119fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwic2NvcGUiOnsiX192IjowLCJfaWQiOjQ1LCJ1dWlkIjoiYjQ1MDY0NGEtOGJiMy00NDFkLWE4MDItODIwNTc0M2I1ZjY5IiwicXVlc3Rpb25fc2V0IjpbXSwicmVzdWx0X3NldCI6eyJwYWluX2NoZWNrIjpbXX0sInJvbGUiOiJwYXRpZW50IiwiY3JlYXRlZF9kYXRlIjoiMjAxNy0wNi0yNlQxNjoyMjowMy45MzdaIiwiaW5pdGlhdG9ycyI6WzBdfSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXVpZCI6InJlcXVpcmUifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJ1dWlkIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MiwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiaW5pdGlhdG9ycyI6WzBdLCJjcmVhdGVkX2RhdGUiOiIyMDE3LTA2LTI2VDE2OjIyOjAzLjkzN1oiLCJyb2xlIjoicGF0aWVudCIsInJlc3VsdF9zZXQiOnsicGFpbl9jaGVjayI6W119LCJxdWVzdGlvbl9zZXQiOltdLCJ1dWlkIjoiYjQ1MDY0NGEtOGJiMy00NDFkLWE4MDItODIwNTc0M2I1ZjY5IiwiX2lkIjo0NSwiX192IjowfSwiaWF0IjoxNDk4NDk0MTI0LCJleHAiOjE0OTg1OTk2MTF9.eOtrctGp9h2FFSu2bwEininD9YRV8IFDKp7uRlDJTLI'
    //         }
    //     }).then(response => response.json())
    //         .then(response => response.question)
    //         .then(function (response) {
    //             dispatch({
    //                 type: 'displayCurrentQuestion',
    //                 payload: {
    //                     currentquestion: response
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             console.log('error:' + error.message);
    //         });
    // }

    render() {
        console.log(this.props.history);

        const { titleStyle } = styles;
        let { checked_option } = this.props;

        // questionType = (type) => {
        //     if(type === "option"){
        //         return (
        //             <View>
        //                 <List>
        //                     {this.props.questions.currentquestionset[0].options.map(i => (
        //                         <RadioItem
        //                             key={i.key}
        //                             checked={value === i.key}
        //                             onChange={() => this.onChange(i.value)}
        //                         >
        //                             {i.value}
        //                         </RadioItem>
        //                     ))}
        //                 </List>
        //             </View>
        //         )
        //     }
        //
        //     else if(type === "fillinblanks") {
        //         return (
        //             <Input
        //                 placeholder="put your answer here"
        //             />
        //         );
        //     }
        // };
        //
        // ifSubmit = (questionId) => {
        //     if( questionId === 17){
        //         return(
        //             <View>
        //                 <Button>This is the last question, click to submit.</Button>
        //             </View>
        //         )
        //     } else {
        //         return(
        //             <View>
        //                 <Button  onPress={this.onButtonPress.bind(this)}>Next</Button>
        //             </View>
        //         )
        //     }
        // };
        return(
            <View>
                <Card>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props.currentquestion?this.props.currentquestion.question.description:"no question"}
                        </Text>
                    </CardSection>
                    <CardSection>
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
                    </CardSection>
                    <View>
                        <Button onPress={this.onBackButtonPress.bind(this)}>
                            Back
                        </Button>
                        <Button onPress={this.onNextButtonPress.bind(this)}>
                            Next
                        </Button>
                    </View>

                </Card>
            </View>
        );

    }
}

// class QuestionList extends Component {
//     componentWillMount() {
//         const ds = new ListView.DataSource({
//             rowHasChanged: (r1, r2) => r1 !== r2
//         });
//         this.dataSource = ds.cloneWithRows(this.props.questions);
//     }
//
//     renderRow(question) {
//         return <ListItem question = {question} />;
//     }
//
//     renderFooter() {
//         return (
//             <View>
//                 <Button
//                     onPress={console.log("yes")}
//                 >
//                     Submit
//                 </Button>
//             </View>
//         )
//     }
//
//     render() {
//
//         return (
//             <ListView
//                 dataSource={this.dataSource}
//                 renderRow={this.renderRow}
//                 renderFooter={this.renderFooter}
//             />
//         );
//     }
// }

const styles = {
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15
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