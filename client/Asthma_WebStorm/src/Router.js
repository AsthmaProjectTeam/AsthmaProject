import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import QuestionList from './components/QuestionList';
import ScanScreen from './components/ScanScreen';
import WelcomePage from './components/WelcomePage';
import EntrancePage from './components/EntrancePage';

const RouterComponent = () => {
    return (
        <Router>
            {/*<Scene key="entrance">*/}
                {/*<Scene key="entrancePage" component={EntrancePage} hideNavBar={true}/>*/}
            {/*</Scene>*/}
            {/*<Scene key="auth">*/}
                {/*<Scene style={{ paddingTop: 65 }} key="scanScreen" component={ScanScreen} title="Scan QR Code"/>*/}
            {/*</Scene>*/}

            <Scene key="welcome" >
                <Scene style={{ paddingTop: 65 }} key="welcomePage" component={WelcomePage} title="Welcome"/>
            </Scene>

            <Scene key="main">
                <Scene style={{ paddingTop: 65 }} key="questionList" component={QuestionList} title="Questions"/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;