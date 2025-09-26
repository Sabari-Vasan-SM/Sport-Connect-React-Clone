import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="container">
        <h2 className="logo">
          <Link to="/home">Sports Connect</Link>
        </h2>

        <div className="nav-center desktop-only">
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" placeholder="Search for sports, athletes, associations..." />
          </div>
        </div>

        <div className="nav-right">
          <div className="create desktop-only">
            <div className="profile-photo">
              <img 
                src={currentUser.profileImage || '/uploads/1725511480432.jpg'} 
                alt="Profile" 
              />
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <i className="uil uil-signout"></i>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn mobile-only" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`uil ${isMobileMenuOpen ? 'uil-times' : 'uil-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" placeholder="Search..." />
          </div>
        </div>
        
        <div className="mobile-profile">
          <div className="profile-info">
            <div className="profile-photo">
              <img 
                src={currentUser.profileImage || '/uploads/1725511480432.jpg'} 
                alt="Profile" 
              />
            </div>
            <div className="profile-details">
              <h4>{currentUser.name}</h4>
              <p>@{currentUser.username}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="uil uil-signout"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </nav>
  );
}

export default Navigation;