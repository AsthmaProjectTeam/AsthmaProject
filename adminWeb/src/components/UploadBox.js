/**
 * Created by tengzhongwei on 7/13/17.
 */
import { Upload, Icon, message, Progress } from 'antd';
const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class UploadBox extends React.Component{
    render(){
        return(
            <div style={{ marginTop: 16, height: 500 }}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>

                <Progress percent={50} status="active" />
            </div>
        )
    }
}

export default UploadBox;