import React, { Component } from 'react';
import { Image, TouchableOpacity  } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Row} from 'react-native-easy-grid';
class RightBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0 -> green.  1 -> red. Will toggle when touched
      rightSide:0,
    }
  }

  dispatchLocation(location) {
    if(this.props.painLocation.right.has(location)) {
      this.props.painLocation.right.delete(location);
    }
    else this.props.painLocation.right.add(location);
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

      <Image resizeMode="contain" source={require('../img/rightside.jpeg')} style={styles.imageStyle}>
        <Row style={{marginTop: HEIGHT*0.22}}>

          <TouchableOpacity
            onPress={()=>{
              this.dispatchLocation('Right Side');
              this.setState((state)=>{return {...state, rightSide:state.rightSide?0:1 }});
            }}
          >
            <Icon name='circle'
                  color={this.state.rightSide?'red':'green'}
                  size={50}
                  style={{marginLeft: WIDTH*0.3}}

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

export default connect(mapStateToProps)(RightBody);