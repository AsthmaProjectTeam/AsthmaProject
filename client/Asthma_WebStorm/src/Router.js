import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import QuestionList from './components/QuestionList';
import LoginPage from './components/LoginPage';
import ScanScreen from './components/ScanScreen';
import WelcomePage from './components/WelcomePage';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="auth">
                <Scene key="loginPage" component={LoginPage} title="Log in" initial/>
                <Scene key="scanScreen" component={ScanScreen} title="Scan QR Code"/>
            </Scene>

            <Scene key="main">
                <Scene key="welcomePage" component={WelcomePage} title="Welcome"/>
                <Scene key="questionList" component={QuestionList} title="Questions"/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;