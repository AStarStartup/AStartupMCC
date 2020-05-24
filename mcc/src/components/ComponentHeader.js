import React, {StyleSheet} from './node_modules/react';

function ComponentHeader() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Astartup logo" />
        <p>
          Edit <code>src/App.js</code> and save to foo.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const styles = StyleSheet.create({
});

export default ComponentHeader;
