import React from 'react';
import { Router, Route } from 'dva/router';
import WebRoutes from './routes';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={WebRoutes.LoginPage} />
        <Route path="/index" component={WebRoutes.IndexPage} />
        <Route path="/upload" component={WebRoutes.UploadPage}/>
    </Router>
  );
}

export default RouterConfig;
