// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/connection/Register';
import Login from './components/connection/Login';
import Navbar from './components/home/NavBar';
import './App.css';
import Footer from './components/home/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
