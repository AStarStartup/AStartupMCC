import React, { Component } from 'react';
import Classes from './App.module.css';
import Radium, { StyleRoot } from 'radium';
import Accounts from './Components/Accounts';
import UserInput from './Components/UserInput';
import AccountValidator from './Components/AccountValidator';
import Hud from './Components/Hud';
import AuthContext from './Context/auth-context';

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
    ShowAccounts: true,
    ShowHud: true,
    Authentic: false,
  };

  static getDerivedStateFromProps(Props, State) {
    console.log('[App.js] getDerivedStateFromProps', Props);
    return State;
  }

  componentDidMount() {
    console.log('[App.js] Component did mount.');
  }

  shouldComponentUpdate(NextProps, NextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  };

  componentDidUpdate(PrevProps, PrevState, Snapshot) {
     console.log('[App.js] componentDidUpdate');
  }
  
  HandleAccountNameChange = (Event, Id) => {
    const AccountIndex = this.state.Accounts.findIndex(P => {
      return P.Id === Id;
    });

    const Target = { ...this.state.Accounts[AccountIndex]};

    Target.Name = Event.target.value;

    const Accounts = [...this.state.Accounts];
    Accounts[AccountIndex] = Target;

    this.setState({Accounts: Event.target.Accounts});
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

  HandleLogin = () => {
    this.setState({Authenticated: true});
  }

  render() {

    let AccountsView = null;
    if (this.state.ShowAccounts) {
      AccountsView = (
        <Accounts 
          Accounts={this.state.Accounts}
          Click={this.HandleAccountDelete}
          Change={this.HandleAccountNameChange}
          Authentic={this.state.Authentic} />
      );
    }
    
    return (
      <StyleRoot>
        <div className={Classes.App}>
          <button onClick={() => {
            this.setState({ ShowHud: false });
          }}>{this.state.ShowHud ? 'Hide' : 'Show'} Hud</button>
          <AuthContext.Provider value={{Authentic: false, Login: this.LoginHandler}}>            
            { this.state.ShowHud ? (<Hud 
              AppTitle={this.state.AppTitle}
              ShowAccounts={this.state.ShowAccounts}
              AccountCount={this.state.Accounts.length}
              Accounts={this.state.Accounts}
              Clicked={this.HandleToggleShowAccounts} />) : null}
            {AccountsView}
          </AuthContext.Provider>
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
