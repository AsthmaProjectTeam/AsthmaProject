/**
 * Created by tengzhongwei on 8/3/17.
 */
import IndexLayout from '../components/IndexLayout';
import PainCheckerBox  from '../components/PainCheckerBox';


class PainCheckerPage extends React.Component{

    render(){
        return(
            <IndexLayout>
                <PainCheckerBox params = {this.props.params}/>
            </IndexLayout>
        );
    }
}

export default PainCheckerPage;