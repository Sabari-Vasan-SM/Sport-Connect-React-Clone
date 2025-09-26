import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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

        <div className="nav-center">
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" placeholder="Search for sports, athletes, associations..." />
          </div>
        </div>

        <div className="create">
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
      </div>
    </nav>
  );
}

export default Navigation;