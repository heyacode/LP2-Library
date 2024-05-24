import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css';
export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  return (
    <div>
      <nav className='navbar' id="navbar">
        <div className='container navbar-content flex'>
          <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
            <ul className="navbar-nav">
            <li className='nav-item'>
                <Link to="/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to="livres" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>livres</Link>
              </li>
              <li className='nav-item'>
                <Link to="emprunts" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>emprunt</Link>
              </li> <li className='nav-item'>
                <Link to="clients" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>client</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
