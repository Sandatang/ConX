import React, { useState } from 'react';
import { Button, Stack, Typography, AppBar, Toolbar, IconButton, Container, Grid } from '@mui/material';
import { AccountCircle, Group, Book, People, Report, Update, ExitToApp } from '@mui/icons-material';
import conxLogo from "../assets/logo.png";
import Newsfeed from './Newsfeed'; 
import Forum from './Forum'; 
import Resources from './Resources.jsx'; 
import ManageUsers from './ManageUsers'; 
import Reports from './Reports'; 
import Updates from './Updates'; 

const Homepage = () => {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    switch (section) {
      case 'Community':
        setContent(
          <>
            <Newsfeed />
            <Forum />
          </>
        );
        break;
      case 'Resources':
        setContent(<Resources />);
        break;
      case 'Manage Users':
        setContent(<ManageUsers />);
        break;
      case 'Reports':
        setContent(<Reports />);
        break;
      case 'Updates':
        setContent(<Updates />);
        break;
      default:
        setContent(null);
        break;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fefcff' }}>
      <AppBar position="sticky" color="inherit" elevation={2}>
        <Toolbar>
          <img src={conxLogo} alt="ConX logo" style={{ height: '32px', marginRight: '16px' }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Connecting and Empowering Female Communities
          </Typography>
          <IconButton>
            <AccountCircle fontSize="large" style={{ color: '#333' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container style={{ paddingTop: '16px', paddingLeft: 0, paddingRight: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Stack spacing={2}>
              <Button 
                onClick={() => handleSectionClick('Community')} 
                variant={activeSection === 'Community' ? 'contained' : 'outlined'}
                style={{ backgroundColor: activeSection === 'Community' ? '#ff9ae6' : 'inherit', color: activeSection === 'Community' ? '#fff' : 'inherit' }}
              >
                <Group fontSize="large" style={{ marginRight: '8px' }} />
                Community
              </Button>
              <Button 
                onClick={() => handleSectionClick('Resources')} 
                variant={activeSection === 'Resources' ? 'contained' : 'outlined'}
                style={{ backgroundColor: activeSection === 'Resources' ? '#ff9ae6' : 'inherit', color: activeSection === 'Resources' ? '#fff' : 'inherit' }}
              >
                <Book fontSize="large" style={{ marginRight: '8px' }} />
                Resources
              </Button>
              <Button 
                onClick={() => handleSectionClick('Manage Users')} 
                variant={activeSection === 'Manage Users' ? 'contained' : 'outlined'}
                style={{ backgroundColor: activeSection === 'Manage Users' ? '#ff9ae6' : 'inherit', color: activeSection === 'Manage Users' ? '#fff' : 'inherit' }}
              >
                <People fontSize="large" style={{ marginRight: '8px' }} />
                Manage Users
              </Button>
              <Button 
                onClick={() => handleSectionClick('Reports')} 
                variant={activeSection === 'Reports' ? 'contained' : 'outlined'}
                style={{ backgroundColor: activeSection === 'Reports' ? '#ff9ae6' : 'inherit', color: activeSection === 'Reports' ? '#fff' : 'inherit' }}
              >
                <Report fontSize="large" style={{ marginRight: '8px' }} />
                Reports
              </Button>
              <Button 
                onClick={() => handleSectionClick('Updates')} 
                variant={activeSection === 'Updates' ? 'contained' : 'outlined'}
                style={{ backgroundColor: activeSection === 'Updates' ? '#ff9ae6' : 'inherit', color: activeSection === 'Updates' ? '#fff' : 'inherit' }}
              >
                <Update fontSize="large" style={{ marginRight: '8px' }} />
                Updates
              </Button>
              <Button onClick={() => handleLogout()} variant="outlined">
                <ExitToApp fontSize="large" style={{ marginRight: '8px' }} />
                Logout
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {content}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Homepage;
