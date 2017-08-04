import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import QuestionList from './components/QuestionList';
import ScanScreen from './components/ScanScreen';
import WelcomePage from './components/WelcomePage';
import EntrancePage from './components/EntrancePage';
import SubmitPage from './components/SubmitPage';
import DummyPage from './components/DummyPage';
import ActivityLevelPage from './components/ActivityLevelPage';
import PainLevelPage from './components/PainLevelPage';
import PainLocationPage from './components/PainLocationPage';
import MedicationPage from './components/MedicationPage';

const RouterComponent = () => {
    return (
        <Router panHandlers={null}>
            <Scene key="entrance">
                <Scene key="entrancePage" component={EntrancePage} hideNavBar={true}/>
            </Scene>
            <Scene key="dummy">
                <Scene style={{ paddingTop: 65 }} key="dummyPage" component={DummyPage} title="Scan QR Code"/>
            </Scene>
            <Scene key="auth">
                <Scene style={{ paddingTop: 65 }} key="scanScreen" component={ScanScreen} title="Scan QR Code"/>
            </Scene>
            <Scene direction="leftToRight" key="welcome">
                <Scene style={{ paddingTop: 65 }} key="welcomePage" component={WelcomePage} title="Home"/>
            </Scene>
            <Scene key="pain">
                <Scene style={{ paddingTop: 65 }} key="painLevel" component={PainLevelPage} title="Pain Level"/>
            </Scene>
            <Scene key="location">
                <Scene style={{ paddingTop: 65 }} key="painLocation" component={PainLocationPage} title="Pain Location"/>
            </Scene>
            <Scene key="activity">
                <Scene style={{ paddingTop: 65 }} key="activityLevel" component={ActivityLevelPage} title="Activity Level"/>
            </Scene>
            <Scene key="medication">
                <Scene style={{ paddingTop: 65 }} key="medicationPage" component={MedicationPage} title="Last Medicated"/>
            </Scene>
            <Scene key="main">
                <Scene style={{ paddingTop: 65 }} key="questionList" component={QuestionList} title="Questions"/>
            </Scene>
            <Scene key="submit">
                <Scene style={{ paddingTop: 65 }} key="submitPage" component={SubmitPage} title="Summary"/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;