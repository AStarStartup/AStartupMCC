import React from 'react';
import Classes from './Layout.css'

const Layout = (Props) => (
  <React.Fragment>
    <div>Toolbar</div>
    <div>SideDrawer</div>
    <div>Backdrop</div>
    <main className={Classes.Content}>
      {Props.children}
    </main>
  </React.Fragment>
);

export default Layout;
