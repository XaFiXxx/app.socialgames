import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Assure-toi que les styles sont aussi importés ici
import Home from "./components/home/Home";
import Register from "./components/connection/Register";
import Login from "./components/connection/Login";
import Navbar from "./components/home/NavBar";
import Profile from "./components/profil/Profil";
import ProtectedRoute from "./ProtectedRoute";
import GamesIndex from "./components/games/GamesIndex";
import FormPlateforms from "./components/plateforms/FormPlateforms";
import SearchResults from "./components/recherches/SearchResults";
import UserProfil from "./components/profil/UserProfil";
import ShowGame from "./components/games/ShowGame";
import IndexGroup from "./components/group/IndexGroup";
import ShowGroup from "./components/group/ShowGroup";
import "./App.css";
import Footer from "./components/home/Footer";

function App() {
  const handleSave = (platforms) => {
    console.log("Platforms saved:", platforms);
    // Tu peux ajouter ici d'autres logiques après la sauvegarde des plateformes
  };

  function SearchResultsWrapper() {
    const location = useLocation();
    const results = location.state?.results || [];

    return <SearchResults results={results} />;
  }

  return (
    <div className="bg-gray-800 min-h-screen">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Navbar />
                <GamesIndex />
              </ProtectedRoute>
            }
          />

          <Route
            path="/plateforms"
            element={
              <ProtectedRoute>
                <Navbar />
                <FormPlateforms onSave={handleSave} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search-results"
            element={
              <ProtectedRoute>
                <Navbar />
                <SearchResultsWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:id/:username"
            element={
              <ProtectedRoute>
                <Navbar />
                <UserProfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game/:id/:name"
            element={
              <ProtectedRoute>
                <Navbar />
                <ShowGame />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Navbar />
                <IndexGroup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/group/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <ShowGroup />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
