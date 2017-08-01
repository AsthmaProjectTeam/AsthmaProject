/**
 * Created by tengzhongwei on 7/31/17.
 */
import IndexLayout from '../components/IndexLayout';
import PatientCard from '../components/PatientCard';


class PatientProfilePage extends React.Component{

    render(){
        return(
            <IndexLayout>
                <PatientCard params = {this.props.params}/>
            </IndexLayout>
        );
    }
}

export default PatientProfilePage;