import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Wall from "./pages/Wall";
import Navbar from "./components/Navbar";

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
        <Route path='/overview' element={<Overview/>} />
        <Route path='/wall' element={<Wall/>} />
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