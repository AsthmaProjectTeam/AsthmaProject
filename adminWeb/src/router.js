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
        <Route path='/my/patients/:patient_id/profile' components={WebRoutes.PatientProfilePage}/>
        <Route path='/my/patients/append' components={WebRoutes.AppendPatientsPage}/>
        <Route path='/my/patients/:patient_id/profile/qr-code' components={WebRoutes.QRCodePage}/>
        <Route path='/my/patients/:patient_id/pain-checker' components={WebRoutes.PainCheckerPage}/>
      <Route path='/my/patients/:patient_id/pain-graph' components={WebRoutes.PainGraphPage}/>
    </Router>
  );
}

export default RouterConfig;
