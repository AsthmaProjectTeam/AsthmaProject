/**
 * Created by tengzhongwei on 7/13/17.
 */
import { connect } from 'dva';
import { Upload, Icon, message, Progress, Card } from 'antd';
const Dragger = Upload.Dragger;
import {SERVER_HOST} from '../CONST';

const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: SERVER_HOST+'/v2/csv/patients/profile',
};

class UploadCSVBox extends React.Component{

    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            this.props.dispatch({type:'admin/uploadFinish', payload:{uploadProgress:50}});
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            this.props.dispatch({type:'admin/uploadFinish', payload:{uploadProgress:100}});
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    render(){

        return(

                <Card style={{ width: 400, height:400, marginTop:32 }} >
                    <div style={{ height: 350, width:350 }}>
                        <Dragger {...props} onChange = {this.onChange.bind(this)}
                                // disabled={this.props.uploadProgress!==0}
                        >
                            {
                                this.props.uploadProgress===0?
                                    <div>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">Click or drag patients.csv to this area to upload</p>
                                    </div>:
                                    this.props.uploadProgress===100?
                                        <p className="ant-upload-text">Upload Success!</p>
                                        :
                                        <p className="ant-upload-text">Uploading....</p>

                            }

                        </Dragger>
                        <Progress percent={this.props.uploadProgress} status="active" />
                    </div>
                    </Card>

        )
    }
}


function mapStateToPros(state) {
    return{
        uploadProgress: state.admin.uploadProgress
    }
}

export default connect(mapStateToPros)(UploadCSVBox);