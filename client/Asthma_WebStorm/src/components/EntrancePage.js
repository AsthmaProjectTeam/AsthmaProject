import React, { Component } from 'react';
import { View } from 'react-native';
import Entrance from './Entrance';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

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
                    if (result === null) {
                        setTimeout(() => {
                            console.log('cannot find saved data, be ready to scan screen');
                            Actions.auth();
                        }, 2800)
                    } else {
                        console.log("access to saved data");
                        setTimeout(() => {
                            Actions.welcome();
                        }, 2800);
                    }
                })
            .catch((error) => {
                console.log('error:' + error.message);
            });
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

export default connect()(EntrancePage);