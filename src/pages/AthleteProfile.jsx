import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

function AthleteProfile() {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.type !== 'athlete') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="athlete-profile-page">
      <Navigation />
      
      <main>
        <div className="container">
          <div className="left">
            <Sidebar />
          </div>

          <div className="middle">
            <div className="profile-content">
              <h2>Athlete Profile</h2>
              <div className="profile-info">
                <img 
                  src={currentUser.profileImage || '/uploads/1725511480432.jpg'} 
                  alt="Profile" 
                  className="profile-image"
                />
                <h3>{currentUser.name}</h3>
                <p>@{currentUser.username}</p>
                <div className="stats">
                  <div className="stat">
                    <strong>Sport:</strong> {currentUser.sport || 'Not specified'}
                  </div>
                  <div className="stat">
                    <strong>Experience:</strong> {currentUser.experience || 'Not specified'} years
                  </div>
                  <div className="stat">
                    <strong>Location:</strong> {currentUser.location || 'Not specified'}
                  </div>
                </div>
                {currentUser.achievements && (
                  <div className="achievements">
                    <h4>Achievements</h4>
                    <p>{currentUser.achievements}</p>
                  </div>
                )}
                {currentUser.goals && (
                  <div className="goals">
                    <h4>Goals</h4>
                    <p>{currentUser.goals}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AthleteProfile;