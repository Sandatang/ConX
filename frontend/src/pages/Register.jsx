/* eslint-disable react/no-unknown-property */
import { PendingOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import conxLogo from "../assets/secondlogo.png";
import * as UserApi from "../network/user_api";


const Register = () => {
  const { register, setValue, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const togglePassword = () => setShowPassword(!showPassword);
  const [val, setVal] = useState('none')

  const handleCheckboxChange1 = (event) => {
    setChecked1(event.target.checked);
  };


  async function addWomen(data) {
    try {
      const formData = {
        ...data,
        "civilStatus": val,
        "role": "Women",
      }
      const response = await UserApi.registerWomen(formData);
      console.log(response)
      if (response.field) {
        setError(response.message)
      }

      if (response.status === 400) {
        setError(response.errors.Email ? response.errors.Email.toString() : response.errors.ConfirmPassword.toString())
      }

      if (response.status === "Success") {
        setError(null)
        setSuccess(response.message)
        setValue('birthdate', null);
        reset()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <Stack className='md:!flex-row !justify-evenly'>
      <Stack className='!items-center !justify-center'>
        <img src={conxLogo} className="object-contain mix-blend-color-burn" alt="ConX logo" />
        <h1 className="absolute top-[75%] !text-center">
          ConX: Connecting and Empowering Female Communities
          <br />
          within the Barangay of Metro Cebu
        </h1>
      </Stack>
      <Box className="!flex !flex-col md:!justify-center !items-center" minHeight="100vh" >
        <Box
          px={4}
          py={2}
          boxShadow={3}
          borderRadius={8}
          bgcolor="white"
          maxWidth={450}
          width="100%"
        >
          <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
          {error && <Typography variant="caption" color="error">{error}</Typography>}
          {success && <Alert severity='success'>{success}</Alert>}

          <form className='mt-2' onSubmit={handleSubmit(addWomen)}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              {...register("username", { required: "Required" })}
              fullWidth
            />
            <Typography variant="caption" color="error">{errors.username?.message}</Typography>

            <Stack className='md:!flex-row gap-2 mt-2'>
              <Stack className='gap-2'>
                <TextField
                  label="Firstname"
                  name="firstname"
                  variant="outlined"
                  {...register("firstname", { required: "Required" })}
                  fullWidth
                />
                <Typography variant="caption" color="error">{errors.firstname?.message}</Typography>

                <TextField
                  label="Middlename"
                  name="middlename"
                  variant="outlined"
                  {...register("middlename")}
                  fullWidth
                />
                <Typography variant="caption" color="error">{errors.middlename?.message}</Typography>

                <TextField
                  label="Lastname"
                  name="lastname"
                  className='border-r'
                  variant="outlined"
                  {...register("lastname", { required: "Required" })}
                  fullWidth
                />
                <Typography variant="caption" color="error">{errors.lastname?.message}</Typography>

                {/* <Typography variant="caption">Civil Status: </Typography> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className='!w-full'
                  value={val}
                  onChange={handleChange}

                >
                  <MenuItem value="none" disabled>Civil Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                  <MenuItem value="separated">Separated</MenuItem>
                  <MenuItem value="widowed">Widowed</MenuItem>
                </Select>
              </Stack>

              <Stack className='gap-2'>

                <TextField
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  {...register("email", { required: "Required" })}
                  fullWidth
                />
                <Typography variant="caption" color="error">{errors.email?.message}</Typography>

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
                <Typography variant="caption" color="error">{errors.password?.message}</Typography>


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
                <Typography variant="caption" color="error">{errors.confirmPassword?.message}</Typography>

                <TextField
                  label="Income per. month"
                  variant="outlined"
                  name="income"
                  {...register("income", { required: "Required" })}
                  fullWidth
                />
                <Typography variant="caption" color="error">{errors.income?.message}</Typography>

              </Stack>



            </Stack>

            {/* BIRTHDAY */}
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoItem>
                <DatePicker name="birthdate" label="Birthdate" disabledTime onChange={(date) => { setValue('birthdate', date, { shouldValidate: true }); }} />
              </DemoItem>
            </LocalizationProvider>
            <Typography variant="caption" color="error">{errors.birthdate?.message}</Typography>
            {/* END BIRTHDAY */}


            <FormControlLabel
              control={<Checkbox checked={checked1} onChange={handleCheckboxChange1} name="checkbox1" />}
              label="I agree to the Terms and Conditions"
            />

            <Button
              // disabled={isSubmitting}
              type="submit"
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
