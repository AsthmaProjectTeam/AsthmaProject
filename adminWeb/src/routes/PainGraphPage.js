import IndexLayout from '../components/IndexLayout';
import { LineChart, Line, CartesianGrid,YAxis,XAxis, Tooltip, Legend } from 'recharts';
import {connect} from "dva/index";
import moment from 'moment';
import {Row,Col, Button, Card} from 'antd';
import {browserHistory} from "dva/router";



class QRCodePage extends React.Component{
  componentWillMount(){
    this.props.dispatch({type:'patient/getPainGraphData', payload:{patient_id:this.props.params.patient_id}});
  }

  render(){
    console.log(this.props.pain_level);
    return(
      <IndexLayout>
        <Row type="flex" justify="center" style={{marginTop:30}}>
          <Col>
            <Card title="Pain Level Graph">
              {this.props.pain_level?
                <LineChart width={600} height={400} data={this.props.pain_level}>
                  <XAxis dataKey="date" tickFormatter={timeStr => moment(timeStr).format('YYYY-MM-DDTHH:MM:SSZ')} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="pain" stroke="#8884d8" />
                </LineChart>
                :null
              }
            </Card>
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{marginTop:50}}>
          <Col>
            <Button type='primary' onClick={()=>{
              browserHistory.goBack();
            }}>
              Back
            </Button>
          </Col>
        </Row>

      </IndexLayout>
    );
  }
}


function mapStateToProps(state) {
  let updated_pain_level = [];
  if(state.patient.pain_level) {
    for (let p of state.patient.pain_level) {
      //let date = new Date(p.date);
      let pain = parseInt(p.pain);
      updated_pain_level.push({  date:p.date, pain});
    }
  }
  return {
    pain_level:updated_pain_level
  }
}

export default connect(mapStateToProps)(QRCodePage);