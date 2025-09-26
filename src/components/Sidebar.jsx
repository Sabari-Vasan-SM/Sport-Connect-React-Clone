import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

function Sidebar() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!currentUser) {
    return null;
  }

  return (
    <div className="sidebar">
      <Link to="/home" className={`menu-item ${isActive('/home') || isActive('/') ? 'active' : ''}`}>
        <span><i className="uil uil-estate"></i></span>
        <h3>Home</h3>
      </Link>

      <Link to="/explore" className={`menu-item ${isActive('/explore') ? 'active' : ''}`}>
        <span><i className="uil uil-search"></i></span>
        <h3>Explore</h3>
      </Link>

      <Link to="/fitness" className={`menu-item ${isActive('/fitness') ? 'active' : ''}`}>
        <span><i className="uil uil-dumbbell"></i></span>
        <h3>Fitness</h3>
      </Link>

      <Link to="/leaderboard" className={`menu-item ${isActive('/leaderboard') ? 'active' : ''}`}>
        <span><i className="uil uil-trophy"></i></span>
        <h3>Leaderboard</h3>
      </Link>

      {currentUser.type === 'athlete' && (
        <>
          <Link to="/athlete-profile" className={`menu-item ${isActive('/athlete-profile') ? 'active' : ''}`}>
            <span><i className="uil uil-user"></i></span>
            <h3>My Profile</h3>
          </Link>

          <Link to="/athlete-journey" className={`menu-item ${isActive('/athlete-journey') ? 'active' : ''}`}>
            <span><i className="uil uil-map"></i></span>
            <h3>My Journey</h3>
          </Link>
        </>
      )}

      {currentUser.type === 'association' && (
        <>
          <Link to="/association-profile" className={`menu-item ${isActive('/association-profile') ? 'active' : ''}`}>
            <span><i className="uil uil-building"></i></span>
            <h3>Association Profile</h3>
          </Link>

          <Link to="/association-journey" className={`menu-item ${isActive('/association-journey') ? 'active' : ''}`}>
            <span><i className="uil uil-chart-line"></i></span>
            <h3>Association Journey</h3>
          </Link>
        </>
      )}

      <Link to="/image-grid" className={`menu-item ${isActive('/image-grid') ? 'active' : ''}`}>
        <span><i className="uil uil-images"></i></span>
        <h3>Gallery</h3>
      </Link>
    </div>
  );
}

export default Sidebar;