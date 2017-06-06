import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import QuestionsList from './components/QuestionList';
import WelcomePage from './components/WelcomePage';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="welcomePage" component={WelcomePage} title="Welcome to Asthma App" initial/>
            <Scene key="questionList" component={QuestionsList} title="Questions"/>
        </Router>
    );
};

export default RouterComponent;