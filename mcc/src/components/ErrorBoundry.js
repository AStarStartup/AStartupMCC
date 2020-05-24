import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    HasError: false,
    ErrorMessage: '',
  };

  componentDidCatch = (error, info) => {
    this.setState({HasError: true, ErrorMessage: error});
  }

  render() {
    if (this.state.HasError) {
      return <h1>Something went wrong! :-(</h1>
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
