import React, { Component } from 'react';
import Classes from './Accounts.css';
import Account from './Account';

class Accounts extends Component {

   shouldComponentUpdate(NextProps, NextState) {
     console.log('[Accounts.js] shouldComponentUpdate');
     return true;
   }

   getSnapshotBeforeUpdate(PrevProps, PrevState) {
      console.log('[Accounts.js] getSnapshotBeforeUpdate');
      return { message: 'Snapshot!' };
   }

   componentDidUpdate(PrevProps, PrevState, Snapshot) {
      console.log('[Accounts.js] componentDidUpdate');
   }

   componentWillUnmount() {
     console.log('[Accounts.js] componentWillUnmount');
   }

   render () {
      console.log('[Accounts.js] Rendering...');
      return  this.props.Accounts.map ((Target, Index) => {
         return <Account
                  Username={Target.Username}
                  ID={Target.ID}
                  Name={Target.Name}
                  Password={Target.Password}
                  Click={() => this.props.Click(Index)}
                  Change={(Event)=> this.props.Change(Event, Target.ID)}
                  Authentic={this.props.Authentic} />
      });
   }
}

export default Accounts;
