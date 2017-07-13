/**
 * Created by tengzhongwei on 7/13/17.
 */
import IndexLayout from '../components/IndexLayout'
import UploadField from '../components/UploadBox'
import styles from '../styles/routes/UploadPage.less'
import {Row, Col} from 'antd'

class UploadPage extends React.Component{
    render(){
        return(
            <IndexLayout>

                <Row type="flex" justify="center" >
                    <Col>
                        <p className={styles.title}>Upload Your CSV file here!</p>
                        <UploadField className={styles.uploadBox}/>
                    </Col>

                </Row>


            </IndexLayout>
        );
    }
}

export default UploadPage;