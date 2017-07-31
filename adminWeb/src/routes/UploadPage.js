/**
 * Created by tengzhongwei on 7/13/17.
 */
import IndexLayout from '../components/IndexLayout'
import UploadCSVBox from '../components/UploadCSVBox'
import UploadSingleBox from '../components/UploadSingleBox'
import styles from '../styles/routes/UploadPage.less'
import { connect } from 'dva'
import {Row, Col, Switch} from 'antd'

class UploadPage extends React.Component{
    componentWillMount(){
        this.state = {uploadCsv:true};
        this.props.dispatch({type:'admin/menuClick', payload:{selectedMenu:'upload'}});
    }

    changeUpload(){
        this.setState({uploadCsv: !this.state.uploadCsv});
    }

    render(){
        return(
            <IndexLayout>


                <Row type="flex" justify="center" style={{marginTop:120}}>
                    <Col span={4} offset={2}>
                        <Switch unCheckedChildren="Create single patient" checkedChildren="Upload via csv"
                                defaultChecked={true} onChange={this.changeUpload.bind(this)}
                                style={{fontSize:22}}
                        />
                    </Col>
                    <Col span={16} >
                        {this.state.uploadCsv?
                            <UploadCSVBox/>
                            :<UploadSingleBox/>

                        }

                    </Col>
                </Row>
            </IndexLayout>
        );
    }
}



export default connect()(UploadPage);