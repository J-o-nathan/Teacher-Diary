import React from 'react';

// import styles from './Button.module.css';
// import styled from 'styled-components';

// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

export const ButtonLogin = props => {
  return (
    <button type={props.type} className="button" id={props.id || ''} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export const Button = props => {
  return (
    <button type={props.type} className="button" id={props.id || ''} onClick={props.onClick}>
      {props.children}
    </button>
  );
};









// import React from 'react'
// import { connect } from 'react-redux'

// //The button has it's onClick hander defined by the props passed in from the parent component.
// //The title and id of the button are also defined by props from the parent.

// const Button = ({ onClick, title, id }) => (
//     <div id="button-container">
//         <button className="btn" id={id} onClick={onClick}>{title}</button>
//     </div>
// )

// const mapStateToProps = (state) => {
//     return {
//         loggedIn: !!state.auth.uid
//     }
// }


// export default connect(mapStateToProps)(Button)