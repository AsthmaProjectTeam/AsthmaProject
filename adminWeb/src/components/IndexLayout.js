/**
 * Created by tengzhongwei on 7/13/17.
 */
import {connect} from 'dva';
import LeftMenu from './LeftMenu';
import Container from "./Container";
import {Row, Col, Layout} from 'antd'
import styles from '../styles/components/IndexLayout.less'
const { Header, Content, Sider } = Layout;
import {browserHistory} from 'dva/router';
class IndexLayout extends React.Component{
    componentWillMount(){
        if(window.sessionStorage.getItem('token')===null) browserHistory.push('/expired');
    }


    render() {
        return (
            <Layout className={styles.container}>
                <Header >
                    <p className={styles.title}>Admin System</p>
                </Header>
                <Layout>
                    <Sider width={250} className={styles.sider}
                           breakpoint="lg"
                           collapsedWidth="0">
                        <LeftMenu className={styles.menu}/>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{
                          background: '#fff',
                          padding: 24,
                          margin: 0,
                          minHeight: 800,
                          minWidth: 800

                        }} >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}


export default connect()(IndexLayout);