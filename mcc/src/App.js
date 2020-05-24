import React, { Component } from 'react';
import Classes from './App.module.css';
import Radium, { StyleRoot } from 'radium';
import Accounts from './Components/Accounts/Accounts';
import UserInput from './Components/UserInput';
import AccountValidator from './Components/AccountValidator';
import Hud from './Components/Hud/Hud'

class App extends Component {
  constructor(Props) {
    super(Props);
    console.log('[App.js] constructor');
  }

  state = {
    AppTitle: 'Astartup Mission Control Center',
    StartupName: 'My Startup',
    Accounts: [
      { Username: 'Root', ID: 0, Name: 'Super user', Password: '0' },
      { Username: 'Foo',  ID: 1, Name: 'Mr Foo',     Password: '1' },
      { Username: 'Bar',  ID: 2, Name: 'Mr Bar',     Password: '2' },
    ],
    ShowAccounts: true
  };

  static getDerivedStateFromProps(Props, State) {
    console.log('[App.js] getDerivedStateFromProps', Props);
    return State;
  }
  
  HandleAccountNameChange = (event, id) => {
    const AccountIndex = this.state.Accounts.findIndex(p => {
      return p.id === id;
    });

    const Target = { ...this.state.Accounts[AccountIndex]};

    Target.Name = event.target.value;

    const Accounts = [...this.state.Accounts];
    Accounts[AccountIndex] = Target;

    this.setState({Accounts: event.target.Accounts});
  }

  HandleAccountDelete = (AccountIndex) => {
    window.alert('Works :-)');
    //const AccountsState = this.state.Accounts.slice(); //< Better to do:
    const Accounts = [...this.state.Accounts];
    PermissionStatus.splice(AccountIndex, 1);
    this.setState({Accounts: Accounts});
  }

  HandleToggleShowAccounts = () => {
    const VisibleState = !this.state.ShowAccounts;
    this.setState({ShowAccounts: VisibleState});
  }

  render() {

    let AccountsView = null;
    if (this.state.ShowAccounts) {
      AccountsView = (
        <Accounts 
          Accounts={this.state.Accounts}
          Click={this.HandleAccountDelete}
          Change={this.HandleAccountNameChange} />
      );
    }
    
    return (
      <StyleRoot>
        <div className={Classes.App}>
          <Hud 
            AppTitle={this.state.AppTitle}
            ShowAccounts={this.state.ShowAccounts}
            Accounts={this.state.Accounts}
            Clicked={this.HandleToggleShowAccounts} />
          {AccountsView}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
