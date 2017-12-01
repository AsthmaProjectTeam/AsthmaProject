import React, { Component } from 'react';
import { View } from 'react-native';
import Entrance from './Entrance';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { MAP_V, MAP_H, MAP_VH, MAP_HV } from '../CONST';

class EntrancePage extends Component {
    constructor() {
        super();
        this.state = {
            show:true
        };
    }

    componentWillMount(){
        AsyncStorage.getItem('loginToken')
            .then(
                function (result) {
                    if (result === 1) { //change back to null
                        setTimeout(() => {
                            Actions.pop();
                            Actions.auth();
                        }, 5000)
                    } else {
                        setTimeout(() => {
                            Actions.pop();
                            Actions.welcome();
                        }, 2800);
                    }
                })
            .catch((error) => {
                console.log('error:' + error.message);
            });

        this.props.dispatch({
            type: 'initialLayout',
            payload: {
                MAP_V: Dimensions.get('window').height > Dimensions.get('window').width?MAP_V:MAP_HV,
                MAP_H: Dimensions.get('window').height < Dimensions.get('window').width?MAP_H:MAP_VH
            }
        })
    }

    _hideEntrance() {
        this.setState({
            show:false
        })
    }

    render(){
        let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>

        return (
            <View>
                {entrance}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        MAP_V : state.questions.MAP_V,
        MAP_H : state.questions.MAP_H
    };
};

export default connect(mapStateToProps)(EntrancePage);