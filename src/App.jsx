import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AthleteProfile from './pages/AthleteProfile'
import AthleteSetup from './pages/AthleteSetup'
import { 
  AthleteJourney, 
  Association, 
  AssociationProfile, 
  AssociationJourney,
  Fitness,
  Leaderboard,
  Registration,
  ImageGrid 
} from './pages/PlaceholderPages'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/athlete-setup" element={<AthleteSetup />} />
            <Route path="/athlete-profile" element={<AthleteProfile />} />
            <Route path="/athlete-journey" element={<AthleteJourney />} />
            <Route path="/association" element={<Association />} />
            <Route path="/association-profile" element={<AssociationProfile />} />
            <Route path="/association-journey" element={<AssociationJourney />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/image-grid" element={<ImageGrid />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
