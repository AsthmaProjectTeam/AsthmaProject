/**
 * Created by tengzhongwei on 7/13/17.
 */
import {connect} from 'dva';
import LeftMenu from './LeftMenu';
import Container from "./Container";
import {Row, Col} from 'antd'
import styles from '../styles/components/IndexLayout.less'

class IndexLayout extends React.Component{

    render() {
        return (
            <Container>
                <Row className={styles.container}>
                    <Col span={3} className={styles.container}>
                        <p className={styles.title}>Admin System</p>
                        <LeftMenu className={styles.menu} />
                    </Col>
                    <Col span={21}>
                    {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(IndexLayout);