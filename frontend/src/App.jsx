import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import conxLogo from './assets/logo.png';
import Grid from '@mui/material/Grid';
import Login from './Login';
import Register from './Register'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-row">
        {/* Left Side - Logo and Title */}
        <Grid container className="flex-1 p-8 flex flex-col items-center">
          <Grid item xs={12}>
            <img src={conxLogo} className="logo ConX" alt="ConX logo" style={{ width: '260px', height: '130px'}} />
            <h1 className="size">
              ConX: Connecting and Empowering Female Communities within the Barangay of Metro Cebu
            </h1>
          </Grid>
        </Grid>

        {/* Right Side - Login and Register Forms */}
        <Grid container className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {/* Link to Register */}
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-2 text-gray-600">
            Do you have an account? <Link to="/register">Register now</Link>.
          </p>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
