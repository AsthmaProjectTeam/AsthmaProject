import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { Tabs, Flex, Tag } from 'antd-mobile';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { MAP } from '../CONST';

class PainLocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tmpresult: [],
            selectedTab: '1'
        }
    }

    handleTouch(evt){
        let min = Number.MAX_SAFE_INTEGER;
        let location = "";
        let newtmpresult = this.state.tmpresult;
        let map = {};

        switch (this.state.selectedTab){
            case "1":
                map = MAP['1'];
                break;
            case "2":
                map = MAP['2'];
                break;
            case "3":
                map = MAP['3'];
                break;
            case "4":
                map = MAP['4'];
                break;
        }

        for(let key of Object.keys(map)){
            for(let coor of map[key]){
                let a = evt.nativeEvent.locationX - coor[0];
                let b = evt.nativeEvent.locationY - coor[1];
                let distance = Math.sqrt(a*a + b*b);
                if(distance < min) {
                    min = distance;
                    location = key;
                }
            }
        }

        if(newtmpresult.includes(location) || min>50){}
        else {
            newtmpresult.push(location);
        }

        this.setState({
            error: null,
            tmpresult: newtmpresult
        });
    }

    removeItem(item){
        let newtmpresult = this.state.tmpresult;
        let index = newtmpresult.indexOf(item);
        newtmpresult.splice(index, 1);
        this.setState({
            tmpresult: newtmpresult
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
        Actions.pain();
    }

    async onNextButtonPress(){
        if(this.state.tmpresult.length == 0){
            this.setState({...this.state, error: 'Please locate your pain area.'});
        }else{
            this.props.results.push({
                q_id: this.props.currentquestion.question._id,
                key: "pain location",
                value: this.state.tmpresult,
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

                    break;
                }
            }

            Actions.pop();
            Actions.activity();
         }
    }

    render(){
        const TabPane = Tabs.TabPane;
        const { imageStyle, errorStyle, buttonStyle, textStyle, resultContainerStyle } = styles;
        return(
            <Flex direction="column">

                <Flex>
                    <Tabs activeKey={this.state.selectedTab} animated={false}
                          onTabClick={(key)=>{
                               this.setState({...this.state, selectedTab:key});
                          }}>
                        <TabPane tab="Front" key="1">
                            <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                <Image style={imageStyle} source={require('../img/front.jpeg')}/>
                            </TouchableWithoutFeedback>
                        </TabPane>
                        <TabPane tab="Back" key="2">
                            <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                <Image style={imageStyle} source={require('../img/back.jpeg')}/>
                            </TouchableWithoutFeedback>
                        </TabPane>
                        <TabPane tab="Left Side" key="3">
                            <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                <Image style={imageStyle} source={require('../img/leftside.jpeg')}/>
                            </TouchableWithoutFeedback>
                        </TabPane>
                        <TabPane tab="Right Side" key="4">
                            <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                <Image style={imageStyle} source={require('../img/rightside.jpeg')}/>
                            </TouchableWithoutFeedback>
                        </TabPane>
                    </Tabs>
                </Flex>
                <Flex style={resultContainerStyle} >
                    {this.state.tmpresult.map((r) => {
                        return(
                            <Tag closable key={r} onClose={() => this.removeItem(r)}>{r}</Tag>
                        )
                    })}
                </Flex>
                <Text style={errorStyle}>{this.state.error}</Text>
                <Flex>
                    <Button  style={buttonStyle} warning onPress={this.onBackButtonPress.bind(this)}>
                        <Text style={textStyle}>Back</Text>
                    </Button>

                    <Button  style={buttonStyle} success onPress={this.onNextButtonPress.bind(this)}>
                        <Text style={textStyle}>Next</Text>
                    </Button>
                </Flex>
            </Flex>
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
        height: '88%',
    },
    buttonStyle: {
        flex: 0.4,
        margin: 5
    },
    textStyle: {
        color: 'white',
        fontSize: 16
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    resultContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width*0.9,
        alignSelf:'center',
    },
    imageStyle: {
        width:Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.6,
        alignSelf: 'center',
        marginTop: 5
    }

};

const mapStateToProps = state => {
    return {
        currentquestionset: state.questions.currentquestionset,
        questionset: state.questions.questionset,
        currentquestion: state.questions.currentquestion,
        results: state.questions.results,
        history:state.questions.history
    };
};

export default connect(mapStateToProps)(PainLocationPage);