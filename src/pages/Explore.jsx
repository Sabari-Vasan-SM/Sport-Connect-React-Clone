import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import '../styles/Explore.css';

function Explore() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="explore-page">
      <Navigation />
      
      <main>
        <div className="container">
          <div className="left">
            <Sidebar />
          </div>

          <div className="middle">
            <div className="explore-content">
              <h2>Explore Sports Community</h2>
              <p>Discover amazing athletes, associations, and sports content!</p>
              <div className="coming-soon">
                <i className="uil uil-search"></i>
                <h3>Explore Feature Coming Soon</h3>
                <p>We're working on bringing you the best sports discovery experience.</p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="suggestions">
              <h4>Suggested Sports</h4>
              <div className="sport-tags">
                <span className="sport-tag">Football</span>
                <span className="sport-tag">Basketball</span>
                <span className="sport-tag">Cricket</span>
                <span className="sport-tag">Tennis</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Explore;