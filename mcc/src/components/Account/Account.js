import React from 'react';
import Radium from 'radium';
import styled from 'styled-components';

import Classes from './Account.module.css';

const Account = (props) => {
  return (
    <div className={Classes.Account}>
      <p>{props.Username}</p>
      <p>ID: {props.ID}</p>
      <p>Name: {props.Name}</p>
      <p>Password: {props.Password}</p>
      <p>{props.children}</p>
      <div>
        <input type="text" 
          onChange={props.changed} 
          value={props.Name} />
        <p>Ok</p>
      </div>
      <p click="props.DeleteAccountHandler">Delete</p>
    </div>
  )
};

export default Radium(Account);
