import React from 'react';
import {AppBar, Toolbar, Typography, Avatar} from '@material-ui/core';
import '../App.css';

const NavBar = (props) => {

  return(
    <AppBar position='static' >
      <Toolbar className="toolbar" >
        <Typography>
          TravClan
        </Typography>

        <Avatar />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;