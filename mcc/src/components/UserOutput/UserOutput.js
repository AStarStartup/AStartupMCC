import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Username: {props.Username}</p>
      <p>UID: {props.UID}</p>
      <p>Name: {props.Name}</p>
      <p>Password: {props.Password}</p>
    </div>
  );
}

export default UserOutput;
