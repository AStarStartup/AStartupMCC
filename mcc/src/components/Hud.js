import React, { useEffect, useRef, useContext } from 'react';
import Classes from './Hud.css'
import AuthContext from '../Context/auth-context';

const Hud = (Props) => {
  const ToggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);
  
  console.log(authContext.Authentic);

  useEffect(() => {
    console.log ('[Hud.js] useEffect');
    // Fake Http request...
    // setTimeout(() => {
    //   alert ('Saved data to cloud.');
    // }, 1000);
    ToggleButtonRef.current.click();
    return () => {
      console.log('[Hud.js] Cleaning up in useEffect...');
    }
  }, []);

  const AssignedClasses = [];
  let ButtonClass = '';
  if (Props.AccountCount <= 1) {
    AssignedClasses.push(Classes.Red);
  }
  if (Props.AccountCount.length <= 2) {
    AssignedClasses.push(Classes.Bold);
  }
  if (Props.ShowAccounts) {
    ButtonClass = Classes.Red;
  }

  return (
    <div className={Classes.Hud}>
      <h1 className={AssignedClasses.join(' ')}>{Props.AppTitle}</h1>
      <button ref ={ToggleButtonRef} 
        className={ButtonClass} alt={Props.ShowAccounts} 
        onClick={Props.Clicked}>
        {Props.ShowAccounts ? 'Hide' : 'Show'} Accounts
      </button>
      <button onClick={authContext.Login}>Log in</button>
    </div>
  );
};

export default React.memo(Hud);
