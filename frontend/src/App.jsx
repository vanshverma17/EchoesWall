import './index.css'
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Wall from "./pages/Wall";
import Navbar from "./components/Navbar";
import { getStoredUser } from "./services/authApi";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
};

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/' && location.pathname !== '/signin' && location.pathname !== '/signup';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/overview' element={<RequireAuth><Overview/></RequireAuth>} />
        <Route path='/wall' element={<RequireAuth><Wall/></RequireAuth>} />
          <Route path='/wall/:id' element={<RequireAuth><Wall /></RequireAuth>} />
          <Route path='/wall/new' element={<RequireAuth><Wall isNew /></RequireAuth>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App