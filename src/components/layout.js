import React from 'react';
import {} from '@material-ui/core';
import NavBar from './navBar';

const Layout = ({children}) => {

  return(
    <React.Fragment>
      <NavBar />
      {children}
    </React.Fragment>
  )
}

export default Layout;