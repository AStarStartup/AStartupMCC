import React from 'react';

const AuthContext = React.createContext ({
  Authentic: false,
  Login: () => {}
});

export default AuthContext;
