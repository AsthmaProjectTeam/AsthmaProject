/**
 * Created by tengzhongwei on 7/31/17.
 */
import {Card, Row, Col, Avatar, Button} from 'antd';
import {connect} from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import styles from '../styles/components/PatientCard.less'

class PatientCard extends React.Component{
    componentWillMount(){
        this.props.dispatch({type:'patient/getPatientProfile', payload:{patient_id:this.props.params.patient_id}});
    }

    render(){
        const p = this.props.patient_profile;

        return(
            <Row type="flex" justify="center" style={{marginTop:100}}>
                <Card className = {styles.card}>
                    <Row>
                        <Col span={5} offset={1}>
                            <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className={styles.avarta} />
                        </Col>
                        <Col span={18}>
                            {
                                p?
                                    <div>

                                        <Row>
                                            <Col span={8} >First Name:</Col>
                                            <Col offset={2} span={8}>{p.first_name}</Col>
                                        </Row>
                                        <Row>
                                            <Col  span={8} >Last Name:</Col>
                                            <Col offset={2} span={8}>{p.last_name}</Col>
                                        </Row>
                                        <Row>
                                            <Col  span={8} >MRN:</Col>
                                            <Col offset={2} span={8}>{p.mrn}</Col>
                                        </Row>
                                        <Row>
                                            <Col  span={8} >Date Of Birth:</Col>
                                            <Col offset={2} span={8}>{moment(p.date_of_birth).format('YYYY-MM-DD')}</Col>
                                        </Row>
                                    </div>
                                    :null
                            }
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{marginTop:20}}>
                        <Col>
                            <Link to = { '/my/patients/'+this.props.params.patient_id+'/profile/qr-code'}>
                                <Button type='primary'>
                                    Show QR Code
                                </Button>
                            </Link>
                        </Col>
                        <Col offset={2}>
                            <Link to = { '/my/patients/'+this.props.params.patient_id+'/pain-checker'}>
                                <Button type='primary'>
                                    Submit Pain Check
                                </Button>
                        </Link>

                        </Col>
                    </Row>
                  <Row type="flex" justify="center" style={{marginTop:20}}>
                    <Col>
                      <Link to = { '/my/patients/'+this.props.params.patient_id+'/pain-graph'}>
                        <Button type='primary'>
                          Pain Graph
                        </Button>
                      </Link>
                    </Col>
                  </Row>

                </Card>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        patient_profile:state.patient.patient_profile
    }
}

export default connect(mapStateToProps)(PatientCard);