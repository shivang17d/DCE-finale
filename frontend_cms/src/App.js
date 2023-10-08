import './App.css';
import Career from './components/Career';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Contactus from './components/Contactus';
import Clients from './components/Clients';
import Products from './components/Products';
import Testresume from './components/Testresume';
import Login from './components/Login';
import React, { useState } from 'react';
import Aboutus from './components/Aboutus';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  return (
  <>
  <div>
  <div>
      {isLoggedIn ? (
        <BrowserRouter>
        <div className='App'>
          <Sidebar onLogout={handleLogout}/>
          <div className='content'>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/aboutus' element={<Aboutus/>}/>
              <Route path='/career' element={<Career/>}/>
              <Route path='/contactus' element={<Contactus/>}/>
              <Route path='/clients' element={<Clients/>}/>
              <Route path='/products' element={<Products/>}/>
          </Routes>
          </div>
          </div>
        </BrowserRouter>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  </div>
  
  </>
  );
}

export default App;
