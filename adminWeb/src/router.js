import React from 'react';
import { Router, Route } from 'dva/router';
import WebRoutes from './routes';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={WebRoutes.LoginPage} />
        {/*<Route path="/welcome" component={WebRoutes.IndexPage} />*/}
        <Route path="/upload" component={WebRoutes.UploadPage}/>
        <Route path="/export" component={WebRoutes.ExportPage}/>
        <Route path='/expired' component={WebRoutes.ExpiredPage} />
        <Route path='/my/patients' components={WebRoutes.PatientListPage}/>
        <Route path='/my/patients/profile/:patient_id' components={WebRoutes.PatientProfilePage}/>
        <Route path='/my/patients/append' components={WebRoutes.AppendPatientsPage}/>
        <Route path='/my/patients/profile/:patient_id/qr-code' components={WebRoutes.QRCodePage}/>
    </Router>
  );
}

export default RouterConfig;
