import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import RouterComponent from './Router';
import globalerrorhandling from './components/GlobalErrorHandler';
//import Instabug from 'instabug-reactnative';
import {BackAndroid} from 'react-native'
class App extends Component {
    // componentWillMount(){
    //     Instabug.startWithToken('e14409db9e7a772099b678b9c9e8e98c', Instabug.invocationEvent.shake);
    // }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
      return true;
    }
    render(){
        return (
            <Provider store={createStore(reducers)}>
                <View style={{ flex: 1 }}>
                    <RouterComponent/>
                </View>
            </Provider>

        );
    }
};

export default App;