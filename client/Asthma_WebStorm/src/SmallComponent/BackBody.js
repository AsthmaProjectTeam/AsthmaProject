import React, { Component } from 'react';
import { Image, TouchableOpacity  } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Row from './Row';
class BackBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 0 -> green.  1 -> red. Will toggle when touched
      upLeftBack:0,
      upRightBack:0,
      lowerBack: 0,
    }
  }

  dispatchLocation(location) {
    if(this.props.painLocation.back.has(location)) {
      this.props.painLocation.back.delete(location);
    }
    else this.props.painLocation.back.add(location);
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

      <Image resizeMode="contain" source={require('../img/back.jpeg')} style={styles.imageStyle}>
        <Row style={{marginTop: HEIGHT*0.18}}>

          <TouchableOpacity
            onPress={()=>{
              this.dispatchLocation('Upper Left Back');
              this.setState((state)=>{return {...state, upLeftBack:state.upLeftBack?0:1 }});
            }}
          >
            <Icon name='circle'
                  color={this.state.upLeftBack?'red':'green'}
                  size={50}
                  style={{marginLeft: WIDTH*0.28}}

            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              this.dispatchLocation('Upper Right Back');
              this.setState((state)=>{return {...state, upRightBack:state.upRightBack?0:1 }})}
            }
          >
            <Icon name='circle'
                  color={this.state.upRightBack?'red':'green'}
                  size={50}
                  style={{marginLeft: WIDTH*0.09}}

            />
          </TouchableOpacity>

        </Row>

        <Row style={{marginTop: HEIGHT*0.01}}>
          <TouchableOpacity
            onPress={()=>{
              this.dispatchLocation('Lower Back');
              this.setState((state)=>{return {...state, lowerBack:state.lowerBack?0:1 }})}
            }
          >
            <Icon name='circle'
                  color={this.state.lowerBack?'red':'green'}
                  size={50}
                  style={{marginLeft: WIDTH*0.37}}

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

export default connect(mapStateToProps)(BackBody);