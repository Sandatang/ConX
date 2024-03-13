import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import conxLogo from "../assets/logo.png";
import { useAuth } from '../utils/AuthContext';
const Login = () => {
  const navigate = useNavigate()
  const { loginUser, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const { register, handleSubmit, formState: { isValid, errors, isDirty } } = useForm({ mode: "onChange" });

  async function signIn(data) {
    try {
      const result = await loginUser(data)
      if (result === true) {
        navigate("/settings");
      }
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <Stack className='md:!flex-row !justify-evenly'>
      <Stack className='!items-center !justify-center'>
        <img src={conxLogo} className="object-contain" alt="ConX logo" />
        <h1 className="hidden md:!block text-center">
          ConX: Connecting and Empowering Female Communities
          <br />
          within the Barangay of Metro Cebu
        </h1>
      </Stack>
      <h1 className="block mt-[-20px] mb-2 md:!hidden text-center">
        ConX: Connecting and Empowering Female Communities
        <br />
        within the Barangay of Metro Cebu
      </h1>
      <Box className="!flex !flex-col md:!justify-center !items-center" minHeight="100vh">
        <Box
          p={4}
          boxShadow={3}
          borderRadius={8}
          bgcolor="white"
          maxWidth={450}
          width="100%"
        >
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>

          {/* Response error message */}
          <Typography variant="caption" color="error">
            {errors.failed?.message}
            {error && <span>{error}</span>}
          </Typography>

          <form className="mt-2" onSubmit={handleSubmit(signIn)}>

            {/* Username text field */}
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              fullWidth
              margin="normal"
              {...register("username", { required: "Required" })}
            />
            {/* Username error required message */}
            <Typography variant="caption" color="error">{errors.username?.message}</Typography>

            {/* Password text field */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              name="password"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", { required: "Required" })}
            />

            {/* Password error required message */}
            <Typography variant="caption" color="error">
              {errors.password?.message}
            </Typography>

            <Button
              type="submit"
              style={{ backgroundColor: '#FF4081', color: 'white' }}
              variant="contained"
              disabled={!isDirty || !isValid}
              fullWidth
              className='!mt-2'
            >
              Login
            </Button>

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