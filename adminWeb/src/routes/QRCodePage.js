/**
 * Created by tengzhongwei on 7/31/17.
 */
import IndexLayout from '../components/IndexLayout';
import QRCodeBox from '../components/QRCodeBox';


class QRCodePage extends React.Component{

    render(){
        return(
            <IndexLayout>
                <QRCodeBox params = {this.props.params}/>
            </IndexLayout>
        );
    }
}

export default QRCodePage;