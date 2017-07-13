/**
 * Created by tengzhongwei on 7/13/17.
 */
import styles from '../styles/components/Container.less';

class Container extends React.Component {
    render(){
        return(
            <div className={styles.page}>
                {this.props.children}
            </div>
        )
    }
}

export default Container