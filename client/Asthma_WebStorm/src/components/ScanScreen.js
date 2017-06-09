// 'use strict';
//
// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
//     VibrationIOS,
// } from 'react-native';
//
// import Camera from 'react-native-camera';
//
// var ScanScreen = React.createClass({
//
//     propTypes: {
//         cancelButtonVisible: React.PropTypes.bool,
//         cancelButtonTitle: React.PropTypes.string,
//         onSucess: React.PropTypes.func,
//         onCancel: React.PropTypes.func,
//     },
//
//     getDefaultProps: function() {
//         return {
//             cancelButtonVisible: false,
//             cancelButtonTitle: 'Cancel',
//         };
//     },
//
//     _onPressCancel: function() {
//         var $this = this;
//         requestAnimationFrame(function() {
//             $this.props.navigator.pop();
//             if ($this.props.onCancel) {
//                 $this.props.onCancel();
//             }
//         });
//     },
//
//     _onBarCodeRead: function(result) {
//         var $this = this;
//
//         if (this.barCodeFlag) {
//             this.barCodeFlag = false;
//
//             setTimeout(function() {
//                 VibrationIOS.vibrate();
//                 $this.props.navigator.pop();
//                 $this.props.onSucess(result.data);
//             }, 1000);
//         }
//     },
//
//     render: function() {
//         var cancelButton = null;
//         this.barCodeFlag = true;
//
//         if (this.props.cancelButtonVisible) {
//             cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
//         }
//
//         return (
//             <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
//                 <View style={styles.rectangleContainer}>
//                     <View style={styles.rectangle}/>
//                 </View>
//                 {cancelButton}
//             </Camera>
//         );
//     },
// });
//
// var CancelButton = React.createClass({
//     render: function() {
//         return (
//             <View style={styles.cancelButton}>
//                 <TouchableOpacity onPress={this.props.onPress}>
//                     <Text style={styles.cancelButtonText}>{this.props.title}</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     },
// });
//
// var styles = StyleSheet.create({
//
//     camera: {
//         height: 568,
//         alignItems: 'center',
//     },
//
//     rectangleContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'transparent',
//     },
//
//     rectangle: {
//         height: 250,
//         width: 250,
//         borderWidth: 2,
//         borderColor: '#00FF00',
//         backgroundColor: 'transparent',
//     },
//
//     cancelButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         borderRadius: 3,
//         padding: 15,
//         width: 100,
//         bottom: 10,
//     },
//     cancelButtonText: {
//         fontSize: 17,
//         fontWeight: '500',
//         color: '#0097CE',
//     },
// });
//
// module.exports = ScanScreen;

import BarcodeScanner from 'react-native-barcode-scanner-universal'

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform
} from 'react-native';

export default class ScanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "None"
        };
        this._show = this._show.bind(this);
    }

    render() {
        let scanArea = null;
        if (Platform.OS === 'ios') {
            scanArea = (
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                </View>
            )
        }
        return (
            <View>
                <Text style={ [{color:"red"},{fontSize:16}] }>{this.state.code}</Text>
                <View
                    onBarCodeRead={ (code) => this._show(code)}
                    style={styles.camera}>
                    {scanArea}
                </View>
            </View>
        )
    }

    _show(val) {
        this.setState({
            code:val.data
        })
    }
}

var styles = StyleSheet.create({
    camera: {
        flex: 1,
        paddingTop: 150
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
});