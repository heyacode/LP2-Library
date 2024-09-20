import React from 'react'
import './home.css'
import book from '../../images/b.gif'

export default function Home() {
  return (
    <div className='holder'>
        <header className='header'>
            <div className='header-content'>
                <h2 className='header-title'>Welcome to BookShelf</h2><br />
                <img src="{book}" alt="logo" />
                <p className='header-text '>Easier way to manage your library</p>
            </div>
        </header>
    </div>
  )
}
