/**
 * Created by tengzhongwei on 7/13/17.
 */
import {connect} from 'dva';
import { Menu, Icon} from 'antd';
import {Link} from 'dva/router'
import styles from '../styles/components/LeftMenu.less';

class LeftMenu extends React.Component {
    onClick(e){
        this.props.dispatch({type:'admin/menuClick', payload:{selectedMenu:e.key}});
    }

    render() {
        return (
                <Menu
                    selectedKeys={[this.props.selectedMenu]}
                    className = {styles.menu}
                    theme ='dark'
                    onClick={this.onClick.bind(this)}
                >
                    {/*<Menu.Item key="welcome" >*/}
                        {/*<Link to="/welcome" className={styles.item}>*/}
                            {/*<Icon type="mail" />*/}
                            {/*Index*/}
                        {/*</Link>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="upload">
                        <Link to ='/upload' className={styles.item}>
                            <Icon type="mail" />
                            Upload Patients Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="export" >
                        <Link to="/export" className={styles.item}>
                            <Icon type="calendar" />
                            Export Results
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="my_patients" >
                        <Link to="/my/patients" className={styles.item}>
                            <Icon type="user" />
                            My Patient
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="append_patients" >
                        <Link to="/my/patients/append" className={styles.item}>
                            <Icon type="plus-circle-o" />
                            Append Patients
                        </Link>
                    </Menu.Item>


                </Menu>
        );
    }
}

function mapStateToProps(state) {
    return{
        selectedMenu: state.admin.selectedMenu
    }
}

export default connect(mapStateToProps)(LeftMenu);