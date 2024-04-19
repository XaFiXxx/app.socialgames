import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/connection/Register';
import Login from './components/connection/Login';
import Navbar from './components/home/NavBar';
import Profile from './components/profil/Profil';
import ProtectedRoute from './ProtectedRoute';
import GamesIndex from './components/games/GamesIndex';
import './App.css';
import Footer from './components/home/Footer';

function App() {
  return (
    <div className="bg-gray-800 min-h-screen">
    <Router>
      <Routes>
        {/* Routes accessibles sans authentification */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes protégées, incluant Navbar */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navbar />
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Navbar />
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/games" element={
          <ProtectedRoute>
            <Navbar />
            <GamesIndex />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </Router>
    </div>
  );
}

export default App;
