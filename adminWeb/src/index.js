import dva from 'dva';
import './index.css';
import {browserHistory} from 'dva/router'
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import ReactDOM from 'react-dom';


// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(e) {


        switch (e.response.status){
            case 401:
                browserHistory.push('/expired');
                break;
            default:
                return null;
        }
    },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/admin-model'));
app.model(require('./models/patient-model'));


// 4. Router
app.router(require('./router'));

// 5. Start
//app.start('#root');

const App = app.start();
ReactDOM.render(<LocaleProvider locale={enUS}><App /></LocaleProvider>, document.getElementById('root'));