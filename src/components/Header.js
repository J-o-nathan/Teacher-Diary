import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import { startLogout } from '../actions/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFile, faBell, faTable, faSignOut } from '@fortawesome/free-solid-svg-icons'



export const Header = ({ startLogout }) => {

  //Header needs to access history to know the route. Hide the button based on the URL
  //history stores the pathname on it. Import history from AppRouter, where it was created as a variable.
  let location = history.location.pathname
  console.log(location)

  const goHome = () => history.push('/')
  const goCreate = () => history.push('/create')
  const goReminder = () => history.push('/reminders')
  const goTable = () => history.push('/timetable')


  return (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        {/* <Link className="header__title" to="/dashboard">
          <h1>Online High School Diary</h1>
        </Link> */}
        <div hidden={location === "/dashboard"}>
          <FontAwesomeIcon onClick={goHome} className='header-icon show-on-mobile' icon={faHome} />
          <Link className="button button--link show-on-desktop" to="/dashboard">Home</Link>
        </div>
        <div hidden={location === "/create" || location.includes('edit')}>
          <FontAwesomeIcon onClick={goCreate} className='header-icon show-on-mobile' icon={faFile} />
          <Link className="button button--link show-on-desktop" to="/create">Add Lesson</Link>
        </div>
        <div hidden={location === '/reminders'}>
          <FontAwesomeIcon onClick={goReminder} className='header-icon show-on-mobile' icon={faBell} />
          <Link className="button button--link show-on-desktop" to="/reminders">Reminders</Link>
        </div>
        <div hidden={location === '/timetable'}>
          <FontAwesomeIcon onClick={goTable} className='header-icon show-on-mobile' icon={faTable} />
          <Link className="button button--link show-on-desktop" to="/timetable">Timetable</Link>
        </div>
        {/* <div hidden={location === "/dashboard"} className='show-for-mobile'>
          <Link className="button button--link" to="/">Dashboard</Link>
        </div> */}
        <FontAwesomeIcon onClick={startLogout} className='header-icon show-on-mobile' icon={faSignOut} />
        <button className="button button--link show-on-desktop" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);
  }

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(undefined, mapDispatchToProps)(Header);
