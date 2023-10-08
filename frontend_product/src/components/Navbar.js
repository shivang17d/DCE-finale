import React, { Component,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../scripts/new_nav_app'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleLinkClick = (link) => {
    handleMenuToggle();
  };
  const location = useLocation();

  return (
    <>
    {console.log(location)}
    <nav className={`navbarr ${isMenuOpen ? 'open' : ''}`}>
      <div className="">
        <div className="nav_container">
          <div className="logo">
            <img src={require('../images/logo.png')} className="logo" alt="" />
          </div>
          <div className="hamburger-menu" onClick={handleMenuToggle}>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div className="links">
        <ul>
          <li className="nav_item">
            <Link to="/" className={location.pathname === '/' ? 'active_nav' : ''} onClick={() => handleLinkClick('home')}>Home</Link>
          </li>
          <li className="nav_item">
            <Link to="/AboutUs" className={location.pathname === '/AboutUs' ? 'active_nav' : ''} onClick={() => handleLinkClick('about')}>About Us</Link>
          </li>
          <li className="nav_item">
            <Link to="/Products" className={location.pathname === '/Products' ? 'active_nav' : ''} onClick={() => handleLinkClick('products')}>Products</Link>
          </li>
          <li className="nav_item">
            <Link to="/Career" className={location.pathname === '/Career' ? 'active_nav' : ''} onClick={() => handleLinkClick('career')}>Career</Link>
          </li>
          <li className="nav_item">
            <Link to="/Clients" className={location.pathname === '/Clients' ? 'active_nav' : ''} onClick={() => handleLinkClick('clients')}>Clients</Link>
          </li>
          <li className="nav_item">
            <Link to="/Contactus" className={location.pathname === '/Contactus' ? 'active_nav' : ''} onClick={() => handleLinkClick('contact')}>ContactUs</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
