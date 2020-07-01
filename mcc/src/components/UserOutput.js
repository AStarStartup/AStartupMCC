import React from 'react';
import './UserOutput.css';

const UserOutput = (Props) => {
  return (
    <div className="UserOutput">
      <p>Username: {Props.Username}</p>
      <p>UID: {Props.UID}</p>
      <p>Name: {Props.Name}</p>
      <p>Password: {Props.Password}</p>
    </div>
  );
}

export default UserOutput;
