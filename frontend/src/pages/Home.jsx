import { Book, Group, People, Report, Update } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Forum from './Forum.jsx';
import ManageUsers from './ManageUsers.jsx';
import Newsfeed from './Newsfeed.jsx';
// import Reports from './Reports';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { useAuth } from '../utils/AuthContext.jsx';
import Resources from './Resources.jsx';
// import Updates from './Updates';



const Home = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth();
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

  useEffect(() => {
    const result = isLoggedIn()
    if (result) { navigate("/home") }
    else { navigate("/login") }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <Header />
      <Stack className="!flex-row min-h-screen bg-gray-200 flex pt-2">
        {/* SIDE NAVIGATION */}
        <Stack className="!flex-row flex-none w-1/7 bg-white p-4 rounded-lg shadow-md mr-4">
          <Stack spacing={2}>
            <Button
              onClick={() => handleSectionClick('Community')}
              variant={activeSection === 'Community' ? 'contained' : 'outlined'}
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Community' ? '' : '!text-black'}`}
            >
              <Group fontSize="medium" /> Community </Button>
            <Button
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Bulletin Board' ? '' : '!text-black'}`}
              variant='outlined'> <Group fontSize="medium" /> Bulletin Board </Button>
            <Button
              onClick={() => handleSectionClick('Resources')}
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Resources' ? '' : '!text-black'}`}
              variant={activeSection === 'Resources' ? 'contained' : 'outlined'}
            >
              <Book fontSize="medium" style={{ marginRight: '8px' }} />
              Resources
            </Button>
            <Button
              onClick={() => handleSectionClick('Manage Users')}
              variant={activeSection === 'Manage Users' ? 'contained' : 'outlined'}
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Manage Users' ? '' : '!text-black'}`}
            >
              <People fontSize="medium" style={{ marginRight: '8px' }} />
              Manage Users
            </Button>
            <Button
              onClick={() => handleSectionClick('Reports')}
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Reports' ? '' : '!text-black'}`}
              variant={activeSection === 'Reports' ? 'contained' : 'outlined'}
            >
              <Report fontSize="medium" style={{ marginRight: '8px' }} />
              Reports
            </Button>
            <Button
              onClick={() => handleSectionClick('Updates')}
              className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === 'Updates' ? '' : '!text-black'}`}
              variant={activeSection === 'Updates' ? 'contained' : 'outlined'}
            >
              <Update fontSize="medium" style={{ marginRight: '8px' }} />
              Updates
            </Button>
          </Stack>

        </Stack>
        {/* END OF SIDE NAVIGATION */}
        <div style={{
          flex: '1',
          backgroundColor: '#f4f4f3',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          {content}
        </div>
      </Stack>
    </>
  );
};

export default Home;
