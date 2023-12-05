// NavBar.jsx
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { appBarColor } from '../pages/styles';

const Navbar = () => {
  return (
    
    <AppBar position="static" color={appBarColor}>
      <Toolbar style={{ justifyContent: 'space-between', color: appBarColor  }}>
        <Typography variant="h6">Smart Hospital</Typography>
        <Box>
        <Button color="inherit" component={Link} to="/">
            <HomeIcon /> 
          </Button>
          <Button color="inherit" component={Link} to="/newPatient">
            New Patient
          </Button>
          
          <Button color="inherit" component={Link} to="/patientRecords">
            Patient Records
          </Button>
          <Button color="inherit" component={Link} to="/Pharmacy">
            Pharmacy
          </Button>
          <Button color="inherit" component={Link} to="/AddToCart">
            <ShoppingCartIcon /> 
          </Button>
        </Box>
        <Button color="inherit" component={Link} to="/Login">
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
