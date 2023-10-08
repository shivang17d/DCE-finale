import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Aboutus from './components/Aboutus';
import Products from './components/Products';
import Career from './components/Career';
import Clients from './components/Clients';
import Contactus from './components/Contactus';
import FooterPage from './components/Footerpage';
import Navbar from './components/Navbar';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<Aboutus />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Career" element={<Career />} />
          <Route path="/Clients" element={<Clients />} />
          <Route path="/Contactus" element={<Contactus />} />
        </Routes>
        <ScrollToTop />
        <FooterPage />
      </BrowserRouter>
    </div>
  );
};

export default App;
