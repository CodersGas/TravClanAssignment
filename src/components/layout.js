import React from 'react';
import {} from '@material-ui/core';
import NavBar from './navBar';
import PageTitle from './pageTitle';

const Layout = ({children, title}) => {

  return(
    <React.Fragment>
      <NavBar />
      <PageTitle title={title} />
      {children}
    </React.Fragment>
  )
}

export default Layout;