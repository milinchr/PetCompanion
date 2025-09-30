import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from './components/main-page';
import NavigationBar from './components/navigation';
import SignUp from './components/sign-up';
import { AuthProvider, useAuth } from "./components/auth-context";
import './App.css';
import SignIn from './components/sign-in';
import Tips from "./components/tips";
import CreatePost from "./components/create-post";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <MainPage /> : <Navigate to="/sign-up" replace />}
      />
      <Route
        path="/sign-up"
        element={isLoggedIn ? <Navigate to="/" replace /> : <SignUp />}
      />
      <Route
        path="/sign-in"
        element={isLoggedIn ? <Navigate to="/" replace /> : <SignIn />}
      />
      <Route
        path="/create-post"
        element={isLoggedIn ? <CreatePost /> : <Navigate to="/sign-in" replace />}
      />
      <Route path="/tips" element={<Tips />} />
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
