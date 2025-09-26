import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfileCard.css';

function ProfileCard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const profilePath = currentUser.type === 'athlete' ? '/athlete-profile' : '/association-profile';

  return (
    <Link to={profilePath} className="profile">
      <div className="profile-photo">
        <img 
          src={currentUser.profileImage || '/uploads/1725511480432.jpg'} 
          alt="Profile Photo" 
          id="profileImage" 
        />
      </div>
      <div className="handle">
        <h4 id="profileName">{currentUser.name || 'User Name'}</h4>
        <p className="text-muted" id="profileUsername">
          @{currentUser.username || 'username'}
        </p>
      </div>
    </Link>
  );
}

export default ProfileCard;