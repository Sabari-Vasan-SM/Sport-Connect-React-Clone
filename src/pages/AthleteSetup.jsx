import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AthleteSetup.css';

function AthleteSetup() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    age: '',
    sport: '',
    experience: '',
    achievements: '',
    goals: '',
    location: '',
    profileImage: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user profile with athlete data
    const updatedUser = {
      ...currentUser,
      ...formData,
      profileImage: previewImage || currentUser.profileImage,
      isProfileComplete: true
    };
    
    login('athlete', updatedUser);
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="athlete-setup">
      <div className="navigation-buttons">
        <div className="nav-text">Sports Connect</div>
        <button className="back-btn" onClick={handleBack}>
          ← Back to Login
        </button>
      </div>

      <div className="container">
        <div className="form-section">
          <h2>Athlete Profile Setup</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Profile Picture:</label>
              <div className="profile-upload">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profileImage" className="upload-btn">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="preview-img" />
                  ) : (
                    <div className="upload-placeholder">
                      <i className="uil uil-camera"></i>
                      <span>Upload Photo</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="name">🏃 Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="age">🎂 Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Your age"
                min="13"
                max="100"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="sport">⚽ Primary Sport:</label>
              <select
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your sport</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="cricket">Cricket</option>
                <option value="tennis">Tennis</option>
                <option value="swimming">Swimming</option>
                <option value="athletics">Athletics</option>
                <option value="badminton">Badminton</option>
                <option value="volleyball">Volleyball</option>
                <option value="hockey">Hockey</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="experience">📈 Experience (years):</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Years of experience"
                min="0"
                max="50"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">📍 Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State/Country"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="achievements">🏆 Achievements:</label>
              <textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleInputChange}
                placeholder="List your major achievements, awards, records..."
                rows="3"
              />
            </div>

            <div className="input-group">
              <label htmlFor="goals">🎯 Goals:</label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="What are your sports goals and aspirations?"
                rows="3"
              />
            </div>

            <button type="submit" className="submit-btn">
              Complete Profile Setup
            </button>
          </form>
        </div>

        <div className="stats-section">
          <h3>Profile Completion</h3>
          <div className="completion-stats">
            <div className="stat-item">
              <span className="stat-label">Basic Info</span>
              <span className="stat-value">
                {formData.name && formData.age && formData.sport ? '✅' : '⏳'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Location</span>
              <span className="stat-value">
                {formData.location ? '✅' : '⏳'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Experience</span>
              <span className="stat-value">
                {formData.experience ? '✅' : '⏳'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Profile Picture</span>
              <span className="stat-value">
                {previewImage ? '✅' : '⏳'}
              </span>
            </div>
          </div>

          <div className="tips">
            <h4>Profile Tips:</h4>
            <ul>
              <li>Add a clear profile picture</li>
              <li>Be specific about your achievements</li>
              <li>Set realistic goals</li>
              <li>Keep your location updated</li>
              <li>Highlight your best performances</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AthleteSetup;