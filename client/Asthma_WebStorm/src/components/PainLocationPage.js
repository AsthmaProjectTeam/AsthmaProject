import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { Tabs, Flex, Tag } from 'antd-mobile';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';

class PainLocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tmpresult: [],
            selectedTab: '1',
            imageHeight: Dimensions.get('window').height*0.6,
            // initialLayoutisVertical: Dimensions.get('window').height > Dimensions.get('window').width
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    async onLayoutChange(e) {
        let layout = e.nativeEvent.layout;
        await this.setState({
            imageHeight: (layout.height+65)*0.6,
            MAP: layout.height > layout.width?this.props.MAP_V:this.props.MAP_H
        });
        //console.log(this.state.isPortrait);
    }

    async handleTouch(evt){
        //console.log(this.state.isPortrait);
        // console.log(Dimensions.get('window').width);
        // console.log(Dimensions.get('window').height);
        // console.log(evt.nativeEvent.locationX);
        // console.log(evt.nativeEvent.locationY);
        let min = Number.MAX_SAFE_INTEGER;
        let location = "";
        let newtmpresult = this.state.tmpresult;
        let map = {};
        //console.log(MAP);

        switch (this.state.selectedTab){
            case "1":
                map = this.state.MAP['1'];
                break;
            case "2":
                map = this.state.MAP['2'];
                break;
            case "3":
                map = this.state.MAP['3'];
                break;
            case "4":
                map = this.state.MAP['4'];
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

        if(newtmpresult.includes(location) && min > 50){
            alert("Sorry, you are out of range.");
        }
        else if(newtmpresult.includes(location)){
            alert(`You have selected "${location}", please remove it or select a different location.`);
        }
        else if(min > 70){
            alert("Sorry, you are out of range.");
        }
        else {
            newtmpresult.push(location);
        }

        await this.setState({
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
        const { imageStyle, errorStyle, buttonStyle, textStyle, resultContainerStyle, messageStyle } = styles;
        return(
            <View style={{height: '100%', width: '100%'}} onLayout={(evt) => this.onLayoutChange(evt)}>
                <Flex direction="column" style={{height: '100%', width: '100%'}}>
                    <Flex>
                        <Tabs activeKey={this.state.selectedTab} animated={false}
                              onTabClick={(key)=>{
                                   this.setState({...this.state, selectedTab:key});
                              }}

                        >
                            <TabPane tab="Front" key="1">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                    <Image resizeMode="contain" style={[imageStyle, {height: this.state.imageHeight}]} source={require('../img/front.jpeg')}/>
                                </TouchableWithoutFeedback>
                            </TabPane>
                            <TabPane tab="Back" key="2">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                    <Image resizeMode="contain" style={[imageStyle, {height: this.state.imageHeight}]} source={require('../img/back.jpeg')}/>
                                </TouchableWithoutFeedback>
                            </TabPane>
                            <TabPane tab="Left Side" key="3">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                    <Image resizeMode="contain" style={[imageStyle, {height: this.state.imageHeight}]} source={require('../img/leftside.jpeg')}/>
                                </TouchableWithoutFeedback>
                            </TabPane>
                            <TabPane tab="Right Side" key="4">
                                <Text style={messageStyle}>Please select the areas(s) of your pain</Text>
                                <TouchableWithoutFeedback onPress={(evt) => this.handleTouch(evt)}>
                                    <Image resizeMode="contain" style={[imageStyle, {height: this.state.imageHeight}]} source={require('../img/rightside.jpeg')}/>
                                </TouchableWithoutFeedback>
                            </TabPane>
                        </Tabs>
                    </Flex>

                    <ScrollView style={{position:'absolute', bottom: 59, height: 90}}>
                        <View style={resultContainerStyle}>
                            {this.state.tmpresult.map((r) => {
                                // return(
                                //     <Tag  closable key={r} onClose={() => this.removeItem(r)}>{r}</Tag>
                                // )
                                return (
                                  <Button key={r} onPress={() => this.removeItem(r)}><Text style={textStyle}>{r}</Text></Button>
                                )
                            })}
                        </View>
                    </ScrollView>


                    <Text style={errorStyle}>{this.state.error}</Text>

                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', flex: 1}}>
                        <Button  style={buttonStyle} warning onPress={this.onBackButtonPress.bind(this)}>
                            <Text style={textStyle}>Back</Text>
                        </Button>

                        <Button  style={buttonStyle} success onPress={this.onNextButtonPress.bind(this)}>
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
        fontSize: 30
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
        // borderColor: 'blue',
        // borderWidth: 1,
        marginTop: 4,

    },
    // imageFrameStyle: {
    //     alignSelf:'center'
    // },
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
        MAP_H : state.questions.MAP_H
    };
};

export default connect(mapStateToProps)(PainLocationPage);