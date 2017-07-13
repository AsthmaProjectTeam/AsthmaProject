/**
 * Created by tengzhongwei on 7/13/17.
 */
import {connect} from 'dva';
import { Menu, Icon} from 'antd';
import {Link} from 'dva/router'
import styles from '../styles/components/LeftMenu.less';

class LeftMenu extends React.Component {
    render() {
        return (
                <Menu
                    defaultSelectedKeys={['0']}
                    className = {styles.menu}
                >
                    <Menu.Item key="0">
                        <Link to="/index">
                            <Icon type="mail" />
                            Index
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to ='/upload'>
                            <Icon type="mail" />
                            Upload Patients Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/export">
                            <Icon type="calendar" />
                            Export Results
                        </Link>
                    </Menu.Item>
                </Menu>
        );
    }
}

export default connect()(LeftMenu);