import React, { Component } from 'react';
import { View } from 'react-native';
import Entrance from './Entrance';
import { Actions } from 'react-native-router-flux';

class EntrancePage extends Component {
    constructor() {
        super();
        this.state = {
            show:true
        };
    }

    _hideEntrance() {
        this.setState({
            show:false
        })
    }

    componentDidMount() {
        setTimeout(() => {
            Actions.auth();
        }, 2800);
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

export default EntrancePage;