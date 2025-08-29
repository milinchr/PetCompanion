import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from './components/main-page';
import NavigationBar from './components/navigation';
import LoginPage from './components/login-page';
import { AuthProvider, useAuth } from "./components/auth-context";
import './App.css';

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="Header-navigation">
            <NavigationBar />
          </header>
          <div className="PetCompanionApp">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
