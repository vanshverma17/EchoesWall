import './index.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getStoredUser } from "./services/authApi";
import PageLoader from "./components/PageLoader";

// Lazy-loaded components and pages
const Landing = lazy(() => import("./pages/Landing"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Overview = lazy(() => import("./pages/Overview"));
const Wall = lazy(() => import("./pages/Wall"));
const Navbar = lazy(() => import("./components/Navbar"));

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
    <Suspense fallback={<PageLoader />}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/overview' element={<RequireAuth><Overview /></RequireAuth>} />
        <Route path='/wall' element={<RequireAuth><Wall /></RequireAuth>} />
        <Route path='/wall/:id' element={<RequireAuth><Wall /></RequireAuth>} />
        <Route path='/wall/new' element={<RequireAuth><Wall isNew /></RequireAuth>} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
