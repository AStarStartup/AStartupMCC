import React, { Component } from 'react';
import Classes from './Account.css';
import PropTypes from 'prop-types';
import AuthContext from '../Context/auth-context';

class Account extends Component {

  constructor (props) {
    super (props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context.Authentic);
  }

  render() {
    console.log('[Account.js] Rendering...');
    return (
      <React.Fragment>
        <div className={Classes.Account}>
            <p>{this.props.Username}</p>
            <p>ID: {this.props.ID}</p>
            <p>Name: {this.props.Name}</p>
            <p>Password: {this.props.Password}</p>
            <p key='i2'>{this.props.children}</p>
            <p>Authenticated: <AuthContext.Consumer>
              {(Context) => Context.Authentic ? 'Yes' : 'No'}
              </AuthContext.Consumer>
            </p>
            <div>
              <input type='text' 
                key='i3'
                //ref={(Focus) => {this.Focus = Focus}}
                ref={this.inputElementRef}
                onChange={this.props.changed} 
                value={this.props.Name} />
              <p>Ok</p>
            </div>
            <p click='this.props.DeleteAccountHandler'>Delete</p>
          </div>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  Username: PropTypes.string,
  Id: PropTypes.number,
  Name: PropTypes.string,
  Password: PropTypes.string,
  Click: PropTypes.func,
  Change: PropTypes.func,
}

export default Account;
