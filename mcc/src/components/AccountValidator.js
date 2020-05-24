import React from 'react';

const AccountValidator = (props) => {
  let ValidOrNot = "Ok";
  if (props.inputLength > 5) ValidOrNot = "Too short";
  return (<div><p>{ValidOrNot}</p></div>)
}

export default AccountValidator;
