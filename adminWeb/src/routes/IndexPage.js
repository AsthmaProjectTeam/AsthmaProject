/**
 * Created by tengzhongwei on 7/13/17.
 */
import IndexLayout from '../components/IndexLayout'
import styles from '../styles/routes/IndexPage.less'

class IndexPage extends React.Component{
    render(){
        return(
        <IndexLayout>
            <div className={styles.welcome}>
                Welcome to Admin System
            </div>
        </IndexLayout>
        );
    }
}

export default IndexPage;