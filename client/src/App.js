import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
import Login from './components/templates/Login';
import Signup from './components/templates/Signup';
import LoginCallback from './components/module/LoginCallback';
import axios from 'axios';
import { useState, useEffect } from 'react';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Referrer-Policy'] = 'no-referrer-when-downgrade';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
