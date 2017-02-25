import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Root from './components/Root.jsx';
import App from './components/App.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ShowProject from './components/ShowProject.jsx';
import NotFound from './components/NotFound.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={App} />
      <Route path='signup' component={Signup} />
      <Route path='login' component={Login} />
      <Route path='dashboard' component={Dashboard} />
      <Route path='dashboard/projects/:id' component={ShowProject} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
