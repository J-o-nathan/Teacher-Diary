import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { ButtonLogin } from './Button'


export const LoginPage = ({ startLogin }) => (
  
  <div className="body-container" id="home-container">
           <div id="main-heading">
                <h1 id="main-heading-1">High School Teacher Diary</h1>
                <h3 id="main-heading-2">Online Lesson Management</h3>
            </div>
            
            <ButtonLogin onClick={startLogin} title="LOGIN" id="main-login-button"  
            />
          </div>  

);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
