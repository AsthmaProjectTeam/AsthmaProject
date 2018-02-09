import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { Tabs, Flex, Tag } from 'antd-mobile';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import FrontBody from '../SmallComponent/FrontBody';
import BackBody from '../SmallComponent/BackBody';
import LeftBody from '../SmallComponent/LeftBody';
import RightBody from '../SmallComponent/RightBody';

class PainLocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tmpresult: [],
            selectedTab: '1',
            imageHeight: Dimensions.get('window').height*0.6,
            next_disabled: false,
            cancel_disabled: false
            // initialLayoutisVertical: Dimensions.get('window').height > Dimensions.get('window').width
        };
        //this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentWillMount() {
      //Clear Previous Location Information
      this.props.dispatch({
        type: 'updatePainLocation',
        payload: {
          painLocation:{
            front:new Set(),
            back:new Set(),
            left:new Set(),
            right:new Set(),
          }
        }
      });
    }

    // onLayoutChange(e) {
    //     let layout = e.nativeEvent.layout;
    //     this.setState({
    //         imageHeight: (layout.height+65)*0.6,
    //         MAP: layout.height > layout.width?this.props.MAP_V:this.props.MAP_H
    //     });
    //     //console.log(this.state.isPortrait);
    // }

    removeItem(item){
        let newtmpresult = this.state.tmpresult;
        let index = newtmpresult.indexOf(item);
        newtmpresult.splice(index, 1);
        this.setState({
            tmpresult: newtmpresult
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
        //Actions.pain();
    }

    onNextButtonPress(){
        this.setState({
            next_disabled: true,
        });

        // enable after 5 second
        setTimeout(()=>{
            this.setState({
                next_disabled: false,
            });
        }, 1000);

        if(!this.props.painLocation.length===0){
          this.props.result.push({
              value: "No Pain"
          });
        }else{
            this.props.results.push({
                q_id: this.props.currentquestion.question._id,
                key: "pain location",
                value: this.props.painLocation,
                description: this.props.currentquestion.question.description
            });
        }

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

          //Actions.pop();
          Actions.activity();

    }

    render(){
        const TabPane = Tabs.TabPane;
        const { imageStyle, errorStyle, buttonStyle, textStyle, resultContainerStyle, messageStyle, answersBoxStyle } = styles;
        return(
            <View style={{height: '100%', width: '100%'}}>
                <Flex direction="column" style={{height: '100%', width: '100%'}}>
                    <Flex>
                        <Tabs activeKey={this.state.selectedTab} animated={false}
                              onTabClick={(key)=>{
                                   this.setState({...this.state, selectedTab:key});
                              }}

                        >
                            <TabPane tab="Front" key="1">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <FrontBody />
                            </TabPane>
                            <TabPane tab="Back" key="2">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <BackBody/>
                            </TabPane>
                            <TabPane tab="Left Side" key="3">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <LeftBody/>
                            </TabPane>
                            <TabPane tab="Right Side" key="4">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <RightBody/>
                            </TabPane>
                        </Tabs>
                    </Flex>

                    <View style={{width: Dimensions.get('window').width, height: 42}}>
                        <Text style={{textAlign: 'center', alignSelf:'center', fontSize:40, color: 'orange', marginTop: 2}}>Your Answers:</Text>
                    </View>
                    <View style={ answersBoxStyle }>
                        <ScrollView >
                            <View style={resultContainerStyle} minHeight={60}>
                                {this.props.painLocation?this.props.painLocation.map((r) => {
                                    return (
                                      <Button key={r} onPress={() => this.removeItem(r)} style={{marginRight:10, marginTop:5}}><Text style={{color: 'white', fontSize: 30}}>{r}</Text></Button>
                                    )
                                }):null
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <Text style={errorStyle}>{this.state.error}</Text>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', flex: 1}}>
                        <Button
                            large
                            disabled = {this.state.cancel_disabled}
                            style={buttonStyle}
                            warning
                            onPress={() => this.onBackButtonPress()}>
                            <Text style={textStyle}>Back</Text>
                        </Button>

                        <Button
                            large
                            disabled = {this.state.next_disabled}
                            style={buttonStyle}
                            success
                            onPress={() => this.onNextButtonPress()}>
                            <Text style={textStyle}>Next</Text>
                        </Button>
                    </View>
                </Flex>
            </View>
        )
    }
}

const styles = {
    buttonStyle: {
        flex: 0.4,
        margin: 5
    },
    textStyle: {
        color: 'white',
        fontSize: 50
    },
    errorStyle: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red',
        position: 'absolute',
        bottom: 55
    },
    resultContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf:'center',
        // borderColor: 'orange',
        // borderWidth: 2,
        // borderRadius: 3
        // marginTop: 4,

    },
    answersBoxStyle: {
        alignSelf:'center',
        position: 'absolute',
        bottom: 85,
        height: 100,
        width: '92%',
        borderColor: 'mediumblue',
        borderWidth: 2,
        borderRadius: 3
    },
    imageStyle: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center'
        // borderWidth: 1,
        // borderColor:'red'
    },
    messageStyle: {
        fontSize: 30,
        fontWeight:'bold',
        alignSelf: 'center',
        textAlign: 'center'
    }

};

const mapStateToProps = state => {
    return {
        currentquestionset: state.questions.currentquestionset,
        questionset: state.questions.questionset,
        currentquestion: state.questions.currentquestion,
        results: state.questions.results,
        history:state.questions.history,
        MAP_V : state.questions.MAP_V,
        MAP_H : state.questions.MAP_H,

        painLocation: [
          ...state.questions.painLocation.front,
          ...state.questions.painLocation.back,
          ...state.questions.painLocation.left,
          ...state.questions.painLocation.right,
        ]
    };
};

export default connect(mapStateToProps)(PainLocationPage);