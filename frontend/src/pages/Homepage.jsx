import { AccountCircle, Book, Group, People, Report, Update } from '@mui/icons-material';
import { AppBar, Button, IconButton, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import conxLogo from "../assets/logo.png";
import Forum from './Forum';
import ManageUsers from './ManageUsers';
import Newsfeed from './Newsfeed';
// import Reports from './Reports';
import Resources from './Resources.jsx';
// import Updates from './Updates';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: '#fff', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={conxLogo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
          <p style={{ color: '#333', fontWeight: 'bold' }}>Connecting and Empowering Women</p>
        </div>
        <IconButton style={{ color: 'black' }}>
          <AccountCircle fontSize="large" />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

const Homepage = () => {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section); 
    switch (section) {
      case 'Community':
        setContent(
          <>
            <div className="flex">
              <div className="w-3/4 mr-4">
                <Newsfeed />
              </div>
              <div className="w-1/4">
                <Forum />
              </div>
            </div>
          </>
        );
        break;
      case 'Resources':
        setContent(<Resources />);
        break;
      case 'Manage Users':
        setContent(<ManageUsers />);
        break;
      // case 'Reports':
      //   setContent(<Reports />);
      //   break;
      // case 'Updates':
      //   setContent(<Updates />);
      //   break;
      default:
        setContent(null);
        break;
    }
  };



  return (
    <>
      <Header />
      <div style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#f2f2f2', display: 'flex', paddingTop: '20px' }}>
        <div style={{ flex: '0 0 15%', backgroundColor: '#fff',   padding: '16px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
          <Stack spacing={3}>
            <Button 
              onClick={() => handleSectionClick('Community')} 
              variant={activeSection === 'Community' ? 'contained' : 'outlined'}
              style={{ backgroundColor: activeSection === 'Community' ? '#ff9ae6' : 'inherit', color: activeSection === 'Community' ? '#fff' : 'inherit', borderRadius: '20px', textTransform: 'none', marginBottom: '10px' }}
            >
              <Group fontSize="large" style={{ marginRight: '8px' }} />
              Community
            </Button>
            <Button 
              onClick={() => handleSectionClick('Resources')} 
              variant={activeSection === 'Resources' ? 'contained' : 'outlined'}
              style={{ backgroundColor: activeSection === 'Resources' ? '#ff9ae6' : 'inherit', color: activeSection === 'Resources' ? '#fff' : 'inherit', borderRadius: '20px', textTransform: 'none', marginBottom: '10px' }}
            >
              <Book fontSize="large" style={{ marginRight: '8px' }} />
              Resources
            </Button>
            <Button 
              onClick={() => handleSectionClick('Manage Users')} 
              variant={activeSection === 'Manage Users' ? 'contained' : 'outlined'}
              style={{ backgroundColor: activeSection === 'Manage Users' ? '#ff9ae6' : 'inherit', color: activeSection === 'Manage Users' ? '#fff' : 'inherit', borderRadius: '20px', textTransform: 'none', marginBottom: '10px' }}
            >
              <People fontSize="large" style={{ marginRight: '8px' }} />
              Manage Users
            </Button>
            <Button 
              onClick={() => handleSectionClick('Reports')} 
              variant={activeSection === 'Reports' ? 'contained' : 'outlined'}
              style={{ backgroundColor: activeSection === 'Reports' ? '#ff9ae6' : 'inherit', color: activeSection === 'Reports' ? '#fff' : 'inherit', borderRadius: '20px', textTransform: 'none', marginBottom: '10px' }}
            >
              <Report fontSize="large" style={{ marginRight: '8px' }} />
              Reports
            </Button>
            <Button 
              onClick={() => handleSectionClick('Updates')} 
              variant={activeSection === 'Updates' ? 'contained' : 'outlined'}
              style={{ backgroundColor: activeSection === 'Updates' ? '#ff9ae6' : 'inherit', color: activeSection === 'Updates' ? '#fff' : 'inherit', borderRadius: '20px', textTransform: 'none', marginBottom: '10px' }}
            >
              <Update fontSize="large" style={{ marginRight: '8px' }} />
              Updates
            </Button>
          </Stack>
          
        </div>
        <div style={{ 
          flex: '1', 
          //backgroundImage: `url(${image2})`, 
          //backgroundSize: 'cover', 
          backgroundColor: '#f4f4f3',
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        }}>
          {content}
        </div>
      </div>
    </>
  );
};

export default Homepage;
