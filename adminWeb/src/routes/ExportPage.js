/**
 * Created by tengzhongwei on 7/13/17.
 */
import IndexLayout from '../components/IndexLayout';
import { connect } from 'dva';
import ExportBox from '../components/ExportBox';
import {Row, Col, Card} from 'antd';
import styles from '../styles/routes/ExportPage.less'

class ExportPage extends React.Component{
    componentWillMount(){
        this.props.dispatch({type:'admin/menuClick', payload:{selectedMenu:'export'}});
    }

    render(){
        return(
            <IndexLayout>
                <Row type="flex" justify="center">
                    <Card className={styles.card}>
                        <ExportBox/>
                    </Card>
                </Row>
            </IndexLayout>
        );
    }
}

export default connect()(ExportPage);