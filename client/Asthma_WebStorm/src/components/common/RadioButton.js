// import React from 'react';
// import { Text, View } from 'react-native';
// import RadioForm from 'react-native-radio-form';
//
// const RadioButton = ({ label, value, onPress }) => {
//     return (
//         <Text >
//             <RadioForm
//                 itemShowKey={label}
//                 itemRealKey={value}
//                 circleSize={16}
//                 initial={1}
//                 formHorizontal={true}
//                 labelHorizontal={true}
//                 onPress={onPress}
//                 style={{borderColor: 'red', width: 20, height: 20, textColor: 'black'}}
//             />
//         </Text>
//     )
// };

// class RadioButton extends Component {
//     render( children ){
//         const radio_props = [{children}];
//         getInitialState = () => {
//             return {
//                 value: 0,
//             }
//         };
//
//         return(
//             <View>
//                 <RadioForm
//                     radio_props={radio_props}
//                     initial={0}
//                     onPress={(value) => {this.setState({value:value})}}
//                 />
//             </View>
//         );
//     }
//
// }

//export { RadioButton };