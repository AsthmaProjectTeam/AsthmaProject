import React, { Component } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component {
    static propTypes = {
        hideThis: React.PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            transformAnim: new Animated.Value(1),
            opacityAnim: new Animated.Value(1)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.transformAnim,
            {toValue: 50,
                duration: 1200,
                delay:2000,
                easing: Easing.elastic(1),
            },
        ).start();
        Animated.timing(
            this.state.opacityAnim,
            {toValue: 0,
                duration: 800,
                easing: Easing.elastic(1),
                delay:2200,
            },
        ).start();
        setTimeout(() => {
            this.props.hideThis();
        }, 2800);
    }

    render () {
        return(
            <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
                <AnimatedIcon size={80} style={[styles.body,{transform:[{scale:this.state.transformAnim}]}]} name="ios-body"></AnimatedIcon>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    entrance:{
        position: "absolute",
        top:0, left:0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor:"#1b95e0",
        alignItems:"center",
        justifyContent:"center"
    },
    body:{
        color:"#fff",
        position:"relative",
        top: -20,
        left: 10,
        textAlign: "center"
    }
});

export default Entrance;