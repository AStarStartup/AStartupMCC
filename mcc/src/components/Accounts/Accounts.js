import React from 'react';
import Classes from './Accounts.module.css';
import Account from '../Account/Account';

const Accounts = (Props) => //{
 // <div className='Accounts'>
    Props.Accounts.map ((Target, Index) => {
      return <Account
                Username={Target.Username}
                ID={Target.ID}
                Name={Target.Name}
                Password={Target.Password}
                Click={() => Props.Click(Index)}
                Change={(Event)=> Props.Change(Event, Target.ID)} />
   });
// </div>
//}
export default Accounts;
