import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetLessons } from './actions/lessons';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

//
// JSON web tokens for login? Have a timeout.
// firebase rules for storage
// storagebucket data kept in env.development, not in the firebase file
// tests
// Memory leak for unmounted state updates
// Make it look good on phone
//

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetLessons()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});


// {
// "rules": {
//   ".read": false,
//   ".write": false,
//     "users": {
//       "$user_id": {
//       ".read": "$user_id === auth.uid",
//       ".write": "$user_id === auth.uid",
//       "lessons": {
//         "$lesson_id": {
//           ".validate": "newData.hasChildren(['period', 'note', 'createdAt', 'year'])",
//           "period": {
//             ".validate": "newData.isString() && newData.val().length > 0"
//           },
//           "note": {
//             ".validate": "newData.isString()"
//           },
//           "createdAt": {
//             ".validate": "newData.isNumber()"
//           },
//           "year": {
//             ".validate": "newData.isNumber()"
//           },
//           "$other": {
//           ".validate": false
//         } 
//         }
//       },
//         "$other": {
//           ".validate": false
//         }
//     }
// }
// }}