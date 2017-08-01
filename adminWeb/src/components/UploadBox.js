/**
 * Created by tengzhongwei on 7/23/17.
 */
import {Row, Col, Switch} from 'antd';
import UploadCSVBox from '../components/UploadBox';

class UploadBox extends React.Component{
    componentWillMount(){
        this.state = {uploadMethod: null}
    }

    onClick(){
        this.setState({uploadMethod:'L'});
    }


    render(){
        return(
                <Row type="flex" justify="center">
                    <UploadCSVBox/>
                </Row>
            )

    }
}

export default UploadBox;