import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css';
export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  return (
    <div>
      <nav className='navbar' id="navbar">
            <ul className="navbar-nav">
            <li className='nav-item'>
                <Link to="/" className='nav-link'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to="livres" className='nav-link'>Books</Link>
              </li>
              <li className='nav-item'>
                <Link to="emprunts" className='nav-link'>Prints</Link>
              </li> <li className='nav-item'>
                <Link to="clients" className='nav-link'>Clients</Link>
              </li>
            </ul>
      </nav>
    </div>
  )
}
