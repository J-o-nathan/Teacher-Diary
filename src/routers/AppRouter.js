import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LessonDashboardPage from '../components/LessonDashboardPage';
import AddLessonPage from '../components/AddLessonPage';
import Timetable from '../components/Timetable';
import Reminders from '../components/Reminders';
import EditLessonPage from '../components/EditLessonPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={LessonDashboardPage} />
        <PrivateRoute path="/create" component={AddLessonPage} />
        <PrivateRoute path="/edit/:id" component={EditLessonPage} />
        <PrivateRoute path="/timetable" component={Timetable} />
        <PrivateRoute path="/reminders" component={Reminders} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
