/**
 * Created by tengzhongwei on 7/31/17.
 */
import { connect } from 'dva'
import {Row, Col, Card, Button} from 'antd';
import styles from '../styles/components/PatientCard.less';
import QRCode from 'qrcode.react';
class QRCodeBox extends React.Component{
    componentWillMount(){

        this.props.dispatch({type:'patient/getQrCodeToken', payload:{patient_id:this.props.params.patient_id}});
    }

    render(){
        console.log(this.props.qrcode_token);
        return(
            <Row type="flex" justify="center" style={{marginTop:100}}>
                <Card className = {styles.card}>
                    {this.props.qrcode_token?<QRCode value={ JSON.stringify({token:this.props.qrcode_token} )}/>
                        :null

                    }

                    <Row type="flex" justify="center" style={{marginTop:20}}>
                        <Col>
                            <Button type='primary'>
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