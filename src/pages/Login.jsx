import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [loginType, setLoginType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormData({ name: '', id: '', password: '' }); // Reset form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.password.trim()) {
      alert('Please enter all required fields.');
      return;
    }

    if (loginType === 'association' && !formData.id.trim()) {
      alert('Please enter your association ID.');
      return;
    }

    setLoading(true);

    try {
      // Mock login - in a real app, this would be an API call
      const userData = {
        name: formData.name,
        username: formData.name.toLowerCase().replace(/\s+/g, ''),
        id: formData.id || `athlete_${Date.now()}`,
      };

      login(loginType, userData);
      
      // Navigate to appropriate page based on user type
      if (loginType === 'athlete') {
        navigate('/athlete-setup');
      } else {
        navigate('/home');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="left-panel">
          <img src="/lg.png" alt="Illustration" className="illustration" />
        </div>
        <div className="right-panel">
          <div className="login-box">
            <div className="login-page-heading">Login Page</div>
            
            <div className="login-type-container">
              <div 
                className={`login-type ${loginType === 'association' ? 'active' : ''}`}
                onClick={() => handleLoginTypeChange('association')}
              >
                Association Login
              </div>
              <div 
                className={`login-type ${loginType === 'athlete' ? 'active' : ''}`}
                onClick={() => handleLoginTypeChange('athlete')}
              >
                Athlete Login
              </div>
            </div>

            {loginType === 'association' && (
              <form onSubmit={handleSubmit} className="login-form active">
                <h2>Association Login</h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Association Name"
                  required
                />
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter your ID"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            {loginType === 'athlete' && (
              <form onSubmit={handleSubmit} className="login-form active">
                <h2>Athlete Login</h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Athlete Name"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            {!loginType && (
              <div className="select-login-type">
                <p>Please select your login type to continue</p>
              </div>
            )}

            <div className="create-account">
              <p>Don't have an account? <a href="/register">Create one here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;