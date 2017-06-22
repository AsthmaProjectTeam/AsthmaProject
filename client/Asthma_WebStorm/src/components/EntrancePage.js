import React, { Component } from 'react';
import { View } from 'react-native';
import Entrance from './Entrance';
import Storage from '../../src/Storage';
import { AsyncStorage } from 'react-native';
import ScanScreen from './ScanScreen';
import { Actions } from 'react-native-router-flux';

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
                (result) => {
                    if(result == null){
                        setTimeout(() => {
                            console.log('cannot find saved data, be ready to scan screen');
                            Actions.auth();
                        }, 2800)
                    } else {
                        console.log("access to saved data successfully, and saved permanent login token is: " + result);
                        Actions.welcome();
                    }
                }
            ).catch((error) => {
                console.log('error:' + error.message);
            });
        // storage.load({
        //     key: 'loginToken',
        //     autoSync: true,
        //     syncInBackground: false
        // }).then(ret => {
        //     console.log("666" + ret.token);
        //     Actions.welcome();
        // }).catch(err => {
        //     console.log(err.message);
        //     switch(err.name){
        //         case 'NotFoundError':
        //             console.log('NotFoundError');
        //             break;
        //         case 'ExpiredError':
        //             console.log('ExpiredError');
        //             break;
        //     }
        // })
    }

    _hideEntrance() {
        this.setState({
            show:false
        })
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         Actions.auth();
    //     }, 2800);
    // }

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