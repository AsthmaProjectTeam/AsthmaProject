{/*import React, { Component } from 'react';*/}
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
// import { StackNavigator } from 'react-navigation';
// import Button from './components/common/Button';
//
// class HomeScreen extends Component {
//     static navigationOptions = {
//         title: 'Welcome'
//     };
//
//     render(){
//         const { navigate } = this.props.navigation;
//
//         return(
//             <View>
//                 <Text>
//                     Hello, Asthma App!
//                 </Text>
//                 <Button
//                     onPress={() => navigate('Question',{index_id:0, question_id: 11 })}>
//                     Start to answer questions
//                 </Button>
//             </View>
//         );
//     };
// }
//
// class QuestionScreen extends Component {
//     static navigationOptions = ({ navigation }) => ({
//         title: `Question No. ${++navigation.state.params.index_id}`,
//     });
//
//     render() {
//         const { params } = this.props.navigation.state;
//         const { navigate } = this.props.navigation;
//         let data =
//
//         const options = data[params.question_id].self.options.map(option=>{
//             return (
//                 <View key={option._id}>
//                     <Button
//                         onPress={() => navigate('Question', { index_id: params.index_id, question_id:data[params.question_id].flow[option.option]})}>
//                         {option.option.toString()}. {option.detail}
//                     </Button>
//                 </View>
//             );
//         });
//
//         return (
//             <View>
//                 <Text>(test: this is question_id: {params.question_id})</Text>
//                 <Text style={styles.textStyle}>{data[params.question_id].self.content}</Text>
//                 {options}
//             </View>
//         );
//     }
// }
//
// class SubmitScreen extends Component {
//     static navigationOptions = {
//         title: 'Submit the form'
//     };
//
//     render(){
//         const { navigate } = this.props.navigation;
//
//         return(
//             <View>
//                 <Button
//                     onPress={() => navigate('Submit')}>
//                     Submit
//                 </Button>
//             </View>
//         );
//     };
// }
//
// const App = StackNavigator({
//     Home: { screen: HomeScreen },
//     Question: { screen: QuestionScreen },
//     Submit: { screen: SubmitScreen }
// });
//
// const styles = StyleSheet.create({
//     textStyle: {
//         fontSize: 26,
//         textAlign: 'center',
//         margin: 10
//     }
// });
//
// export default App;

import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import RouterComponent from './Router';

const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View style={{ flex: 1 }}>
                <RouterComponent/>
            </View>
        </Provider>
    );
};

export default App;