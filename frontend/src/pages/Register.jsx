/* eslint-disable react/no-unknown-property */
import { PendingOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import conxLogo from "../assets/logo.png";
import * as UserApi from "../network/user_api";


const Register = () => {

  const { register, setValue, handleSubmit, reset, setError, formState: { isSubmitting, errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [success, setSuccess] = useState("")
  const togglePassword = () => setShowPassword(!showPassword);

  const handleCheckboxChange1 = (event) => {
    setChecked1(event.target.checked);
  };


  async function addWomen(data) {
    const response = await UserApi.registerWomen(data)
    if (response.field) {
      setError(response.field, {
        type: "manual",
        message: response.message
      })
    }

    if (response.status === 400) {
      setError("password", {
        type: "manual",
        message: response.errors.ConfirmPassword.toString()
      })
    }

    if (response.ok) {
      setSuccess(response.message)
      reset()
    }
  }

  return (
    <Stack className='!flex-row !justify-evenly'>
      <Stack className='!items-center !justify-center'>
        <img src={conxLogo} className="logo ConX" alt="ConX logo" />
        <h1 className="text-center">
          ConX: Connecting and Empowering Female Communities
          <br />
          within the Barangay of Metro Cebu
        </h1>
      </Stack>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" >
        <Box
          p={4}
          boxShadow={3}
          borderRadius={8}
          bgcolor="white"
          maxWidth={450}
          width="100%"
        >
          <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
          {errors && (
            Object.keys(errors).map((field) => (
              <Typography key={field} variant="caption" color="error">
                {errors[field].message}
              </Typography>
            ))
          )}
          {success && (
            <Typography variant="caption" color="success">
              {success}
            </Typography>
          )}
          <form className='mt-2' onSubmit={handleSubmit(addWomen)}>

            <TextField
              label="Username"
              name="username"
              variant="outlined"
              {...register("username", { required: "Required" })}
              fullWidth
            />

            <Stack className='!flex-row gap-2 mt-2'>
              <Stack className='gap-2'>
                <TextField
                  label="Firstname"
                  name="firstname"
                  variant="outlined"
                  {...register("firstname", { required: "Required" })}
                  fullWidth
                />
                <TextField
                  label="Middlename"
                  name="middlename"
                  variant="outlined"
                  {...register("middlename")}
                  fullWidth
                />
                <TextField
                  label="Lastname"
                  name="lastname"
                  className='border-r'
                  variant="outlined"
                  {...register("lastname", { required: "Required" })}
                  fullWidth
                />


                <TextField
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  {...register("email", { required: "Required" })}
                  fullWidth
                />

              </Stack>

              <Stack className='gap-2'>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", { required: "Required" })}
                />

                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirmPassword", { required: "Required" })}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoItem>
                    <DatePicker name="birthdate" label="Birthdate" disabledTime onChange={(date) => { setValue('birthdate', date, { shouldValidate: true }); }} />
                  </DemoItem>
                </LocalizationProvider>

                <TextField
                  label="Phone Number"
                  name="phonenumber"
                  variant="outlined"
                  {...register("phonenumber", { required: "Required" })}
                  fullWidth

                />
              </Stack>
            </Stack>

            <FormControlLabel
              control={<Checkbox checked={checked1} onChange={handleCheckboxChange1} name="checkbox1" />}
              label="I agree to the Terms and Conditions"
            />

            <Button
              disabled={isSubmitting} type="submit"
              style={{ backgroundColor: '#FF4081', color: 'white' }}
              variant="contained"
              fullWidth
            >
              {isSubmitting ? <PendingOutlined /> : "Register"}
            </Button>
            <Typography textAlign="center"> <span className='text-gray-600 '>Already have an account? </span> <Link className='text-blue-500 hover:underline' to="/login">Login</Link></Typography>


          </form>
        </Box>
      </Box>
    </Stack>
  );
};

export default Register;
