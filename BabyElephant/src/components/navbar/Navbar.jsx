import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <div className="title">BABY ELEPHANT</div>
      <div className="nav-links">
      
        <Link to ="/scoreboard" className="nav-link">Scoreboard</Link>
        <Link to="/instructions" className="nav-link">Instructions</Link>
        <Link to="/Levels" className="nav-link">Home</Link>
        <h1 to="" className="logout">SIRIWARDHANA</h1>
      </div>
    </div>
  );
}

export default Navbar;
