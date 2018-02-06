import React, { Component } from 'react';
import { Image, TouchableOpacity  } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import  Row from './Row';
class FrontBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 0 -> green.  1 -> red. Will toggle when touched
      upLeft:0,
      upRight:0,
      belly: 0,
      downLeft: 0,
      downRight: 0

    }
  }

  dispatchLocation(location) {
    if(this.props.painLocation.front.has(location)) {
      this.props.painLocation.front.delete(location);
    }
    else this.props.painLocation.front.add(location);
    this.props.dispatch({
      type: 'updatePainLocation',
      payload: {
        painLocation: this.props.painLocation
      }
    });
  }

    render(){

    //Size of the screen. Only Consider the Vertical case
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
      return(

        <Image resizeMode="contain" source={require('../img/front.jpeg')} style={styles.imageStyle}>
          <Row style={{marginTop: HEIGHT*0.18}}>

            <TouchableOpacity
              onPress={()=>{
                this.dispatchLocation('Upper Left');
                this.setState((state)=>{return {...state, upLeft:state.upLeft?0:1 }});
              }}
            >
              <Icon name='circle'
                    color={this.state.upLeft?'red':'green'}
                    size={50}
                    style={{marginLeft: WIDTH*0.28}}

              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                this.dispatchLocation('Upper Right');
                this.setState((state)=>{return {...state, upRight:state.upRight?0:1 }})}
              }
            >
              <Icon name='circle'
                    color={this.state.upRight?'red':'green'}
                    size={50}
                    style={{marginLeft: WIDTH*0.05}}

              />
            </TouchableOpacity>

          </Row>

          <Row style={{marginTop: HEIGHT*0.06}}>
            <TouchableOpacity
              onPress={()=>{
                this.dispatchLocation('Belly');
                this.setState((state)=>{return {...state, belly:state.belly?0:1 }})}
              }
            >
              <Icon name='circle'
                    color={this.state.belly?'red':'green'}
                    size={50}
                    style={{marginLeft: WIDTH*0.35}}

              />
            </TouchableOpacity>
          </Row>

          <Row style={{marginTop: HEIGHT*0.06}}>

            <TouchableOpacity
              onPress={()=>{
                this.dispatchLocation('Left Leg');
                this.setState((state)=>{return {...state, downLeft:state.downLeft?0:1 }})}}
            >
              <Icon name='circle'
                    color={this.state.downLeft?'red':'green'}
                    size={50}
                    style={{marginLeft: WIDTH*0.28}}

              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                this.dispatchLocation('Right Leg');
                this.setState((state)=>{return {...state, downRight:state.downRight?0:1 }})}}
            >
              <Icon name='circle'
                    color={this.state.downRight?'red':'green'}
                    size={50}
                    style={{marginLeft: WIDTH*0.05}}

              />
            </TouchableOpacity>

          </Row>



        </Image>

      );
    }
}

const styles = {
  imageStyle: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height*0.55,
  },
};

const mapStateToProps = state => {
  return {
      painLocation: state.questions.painLocation
  };
};

export default connect(mapStateToProps)(FrontBody);