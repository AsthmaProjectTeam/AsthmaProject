/**
 * Created by tengzhongwei on 7/28/17.
 */
import IndexLayout from '../components/IndexLayout';
import PatientListTable from '../components/PatientListTable';


class PatientListPage extends React.Component{

    render(){
        return(
            <IndexLayout>
                <PatientListTable/>
            </IndexLayout>
        );
    }
}

export default PatientListPage;