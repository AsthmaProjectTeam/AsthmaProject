import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import QuestionList from './components/QuestionList';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="loginPage" component={LoginPage} title="Log in" initial/>
            <Scene key="welcomePage" component={WelcomePage} title="Welcome"/>
            <Scene key="questionList" component={QuestionList} title="Questions"/>
        </Router>
    );
};

export default RouterComponent;