import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import RouterComponent from './Router';

class App extends Component {

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