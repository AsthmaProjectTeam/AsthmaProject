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
                (result) => {
                    if(result == null){
                        setTimeout(() => {
                            console.log('cannot find saved data, be ready to scan screen');
                            Actions.auth();
                        }, 2800)
                    } else {
                        // fetch('http://10.67.218.204:8080/v2/patients/profile', {
                        //     method: 'GET',
                        //     headers: {
                        //         'Authorization': `token ${result}`,
                        //         'Content-Type': 'application/json',
                        //     }
                        // }).then(response => response.json())
                        //     .then(function (response) {
                        //         AsyncStorage.getItem('uuid').then(json=>{
                        //             if(json == response.uuid){
                        //                 console.log(this);
                                        console.log("access to saved data");
                                        setTimeout(() => {
                                            Actions.welcome();
                                        }, 2800);
                                    // } else {
                                    //     console.log("patient's profile doesn't match, please register");
                                    //     setTimeout(() => {
                                    //         Actions.auth();
                                    //     }, 2800)
                                    // }
                //                 });
                //             }).catch((error) => {
                //             console.log('error:' + error.message);
                //         })
                    }
                }
            ).catch((error) => {
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