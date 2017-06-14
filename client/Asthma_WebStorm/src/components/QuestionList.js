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
class QuestionList extends Component {

    onButtonPress(){
        let { index } = this.props;
        index++;
        this.props.dispatch({
            type: 'nextButtonClicked',
            payload: {
                index: index
            }
        });
    }

    onChange = (value) => {
        this.props.dispatch({
            type: 'optionSelected',
            payload: {
                value: value
            }
        })
    }

    render() {
        const { titleStyle } = styles;
        const { value } = this.props;

        questionType = (type) => {
            if(type === "option"){
                return (
                    <View>
                        <List>
                            {this.props.questions[this.props.index].options.map(i => (
                                <RadioItem
                                    key={i.option}
                                    checked={value === i.option}
                                    onChange={() => this.onChange(i.option)}
                                >
                                    {i.detail}
                                </RadioItem>
                            ))}
                        </List>
                    </View>
                )
            }

            else if(type === "fillinblanks") {
                return (
                    <Input
                        placeholder="put your answer here"
                    />
                );
            }
        };

        ifSubmit = (questionId) => {
            if( questionId === 17){
                return(
                    <View>
                        <Button>This is the last question, click to submit.</Button>
                    </View>
                )
            } else {
                return(
                    <View>
                        <Button  onPress={this.onButtonPress.bind(this)}>Next</Button>
                    </View>
                )
            }
        }

        return (
            <View>
                <Card>
                    <CardSection>
                        <Text style={titleStyle}>
                            {this.props.questions[this.props.index].content}
                        </Text>
                    </CardSection>

                    <CardSection>
                        {questionType(this.props.questions[this.props.index].type)}
                    </CardSection>
                </Card>

                <View>
                    {ifSubmit(this.props.questions[this.props.index]._id)}
                </View>
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
    return { questions: state.questions, index: state.questions.index };
};

export default connect(mapStateToProps)(QuestionList);