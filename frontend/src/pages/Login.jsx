import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import conxLogo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Stack className='!flex-row !justify-evenly'>
      <Stack className='!items-center !justify-center'>
        <img src={conxLogo} className="logo ConX" alt="ConX logo"  />
        <h1 className="text-center">
          ConX: Connecting and Empowering Female Communities
          <br />
          within the Barangay of Metro Cebu
        </h1>
      </Stack>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Box
          p={4}
          boxShadow={3}
          borderRadius={8}
          bgcolor="white"
          maxWidth={450}
          width="100%"
        >
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
          <form>
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ style: { color: 'gray' } }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { color: 'gray' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button style={{ backgroundColor: '#FF4081', color: 'white' }} variant="contained" fullWidth> Login </Button>

            <div className="text-center mt-4">
              <a href="#">Forgot Password?</a>
            </div>
            <hr className="my-6 border-gray-300 w-full" />
            <p className="mt-2 text-gray-600 text-center">
              Do you have an account? <Link className='text-blue-500' to="/register">Register</Link>.

            </p>
          </form>
        </Box>
      </Box>
    </Stack>
  )
}

export default Login