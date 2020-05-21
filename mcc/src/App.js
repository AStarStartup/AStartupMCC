import React, { Component } from "react";
import "./App.css";
import UserInput from "./UserInput";
import UserOutput from "./UserOutput/UserOutput";

class App extends Component {
  state = {
    username: 'A-Star'
  };

  HandleChangeUsername = (event) => {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <h1>Astartup Mission Control Center</h1>
        <UserInput 
          changed={this.HandleChangeUsername}
          CurrentName={this.state.username} />
        <UserOutput 
          username={this.state.username} />
        <UserOutput 
          username="" />
        <UserOutput 
          username="" />
      </div>
    );
  }
}

export default App;
