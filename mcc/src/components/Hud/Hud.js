import React from 'react';
import Classes from './Hud.module.css'

const Hud = (Props) => {
  const AssignedClasses = [];
  let ButtonClass = '';
  if (Props.Accounts.length <= 1) {
    AssignedClasses.push(Classes.Red);
  }
  if (Props.Accounts.length <= 2) {
    AssignedClasses.push(Classes.Bold);
  }
  if (Props.ShowAccounts) {
    ButtonClass = Classes.Red;
  }

  return (
    <div className={Classes.Hud}>
      <h1 className={AssignedClasses.join(' ')}>{Props.AppTitle}</h1>
      <button className={ButtonClass} alt={Props.ShowAccounts} 
        onClick={Props.Clicked}>
        {Props.ShowAccounts ? 'Hide' : 'Show'} Accounts
      </button>
    </div>
  );
};

export default Hud;
