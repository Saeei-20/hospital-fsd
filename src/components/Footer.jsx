// Footer.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { appBarColor } from '../pages/styles';


const Footer = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '20vh' }}>
    <AppBar position="static" color={appBarColor} style={{ marginTop: 'auto' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © 2023 Smart Hospital | Address: 123 Main St, Pune
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
  );
};

export default Footer;



