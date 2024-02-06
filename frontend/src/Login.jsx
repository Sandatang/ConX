import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box
        p={4}
        boxShadow={3}
        borderRadius={8}
        bgcolor="white"
        maxWidth={400}
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
          <p className="mt-2 text-gray-600">
            Do you have an account? <a href="/Register">Register now</a>.
            
          </p>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
