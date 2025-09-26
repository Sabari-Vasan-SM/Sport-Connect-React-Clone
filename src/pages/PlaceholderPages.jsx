// Placeholder pages for the remaining routes
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

function PlaceholderPage({ title, description }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="placeholder-page">
      <Navigation />
      
      <main>
        <div className="container">
          <div className="left">
            <Sidebar />
          </div>

          <div className="middle">
            <div className="placeholder-content">
              <h2>{title}</h2>
              <p>{description}</p>
              <div className="coming-soon">
                <i className="uil uil-constructor"></i>
                <h3>Coming Soon</h3>
                <p>This feature is under development and will be available soon!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .placeholder-page {
          margin-top: 5rem;
        }
        
        main {
          position: relative;
          top: 5.4rem;
        }
        
        main .container {
          display: grid;
          grid-template-columns: 18vw auto 20vw;
          column-gap: 2rem;
          position: relative;
        }
        
        .placeholder-content {
          background: var(--color-white);
          border-radius: var(--card-border-radius);
          padding: 2rem;
          text-align: center;
          margin: 1rem 0;
        }
        
        .coming-soon {
          margin-top: 3rem;
          color: var(--color-grey);
        }
        
        .coming-soon i {
          font-size: 4rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }
        
        .coming-soon h3 {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export function AthleteJourney() {
  return (
    <PlaceholderPage 
      title="Athlete Journey"
      description="Track your sports journey, progress, and milestones."
    />
  );
}

export function Association() {
  return (
    <PlaceholderPage 
      title="Association"
      description="Connect with sports associations and clubs in your area."
    />
  );
}

export function AssociationProfile() {
  return (
    <PlaceholderPage 
      title="Association Profile"
      description="Manage your association profile and member details."
    />
  );
}

export function AssociationJourney() {
  return (
    <PlaceholderPage 
      title="Association Journey"
      description="Track your association's growth and achievements."
    />
  );
}

export function Fitness() {
  return (
    <PlaceholderPage 
      title="Fitness Tracking"
      description="Monitor your fitness progress and training schedules."
    />
  );
}

export function Leaderboard() {
  return (
    <PlaceholderPage 
      title="Leaderboard"
      description="See rankings and compete with other athletes."
    />
  );
}

export function Registration() {
  return (
    <PlaceholderPage 
      title="Registration"
      description="Register for sports events and competitions."
    />
  );
}

export function ImageGrid() {
  return (
    <PlaceholderPage 
      title="Image Gallery"
      description="Browse and share sports photos and videos."
    />
  );
}