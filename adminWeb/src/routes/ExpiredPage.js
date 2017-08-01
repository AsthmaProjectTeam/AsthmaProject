/**
 * Created by tengzhongwei on 7/23/17.
 */
import {browserHistory} from 'dva/router';

class ExportPage extends React.Component{
    componentDidMount(){
        setTimeout(()=>{
            browserHistory.push('/');
        }, 1500);
    }

    render(){
        return(
                <div>
                    Login Expired! Please relogin
                </div>
            )
    }
}

export default ExportPage;