import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='admin'>
        <img src={navlogo} alt="" className="nav_logo" />
        <h3>GROCEREASE <span >ADMIN PANNEL</span> </h3>
        </div>
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar