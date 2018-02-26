/**
 * Created by tengzhongwei on 7/31/17.
 */
import { connect } from 'dva'
import {Row, Col, Card, Button} from 'antd';
import { browserHistory } from 'dva/router';
import styles from '../styles/components/PatientCard.less';
import QRCode from 'qrcode.react';
class QRCodeBox extends React.Component{
    componentWillMount(){

        this.props.dispatch({type:'patient/getQrCodeToken', payload:{patient_id:this.props.params.patient_id}});
    }

    render(){
        return(
            <Row type="flex" justify="center" style={{marginTop:100}}>
                <Card className = {styles.card} title="Let Patient Scan QR Code Below To Login">
                    {/*<p>Let Patient Scan QR Code Below To Login</p>*/}
                    <Row type="flex" justify="center" style={{marginTop:30}}>

                        {this.props.qrcode_token?<QRCode value={ JSON.stringify({token:this.props.qrcode_token} )}/>
                            :null
                        }
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
                </Card>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        qrcode_token: state.patient.qrcode_token
    }
}

export default connect(mapStateToProps)(QRCodeBox)