import React, { useState } from "react";
import { Button, Nav, NavItem } from 'reactstrap';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import OverviewPage from './OverviewPage';
import LayoffPage from './LayoffPage';
import './css/navbar.css'

function Navbar() {
  const [currentRoute, setCurrentRoute] = useState('/')

  return (
    <BrowserRouter>
      <Routes>
        <Route active={currentRoute === '/'} exact path="/" element={<OverviewPage />} />
        <Route active={currentRoute === '/layoffs'} exact path="/layoffs" element={<LayoffPage />} />
      </Routes>
      <Nav
        justified
      >
        <div class='flex justify-center fill-parent-width'>
          <NavItem>
            <NavLink to="/">
              <Button
                className='fill-parent-width'
                color='white'
                active={currentRoute === '/'}
                onClick={() => setCurrentRoute('/')}
              >
                <p class='text-color'>Overview</p>
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/layoffs'>
              <Button
                className='fill-parent-width'
                color='white'
                active={currentRoute === '/layoffs'}
                onClick={() => setCurrentRoute('/layoffs')}
              >
                <p class='text-color'>Layoffs</p>
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/warn'>
              <Button
                className='fill-parent-width'
                color='white'
                active={currentRoute === '/warn'}
                onClick={() => setCurrentRoute('/warn')}
              >
                <p class='text-color'>WARN</p>
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/news'>
              <Button
                className='fill-parent-width'
                color='white'
                active={currentRoute === '/news'}
                onClick={() => setCurrentRoute('/news')}
              >
                <p class='text-color'>News</p>
              </Button>
            </NavLink>
          </NavItem>
        </div>
      </Nav >
    </BrowserRouter >
  );
}

export default Navbar;