import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './pages/LoadingScreen';
import TripDashboard from './pages/TripDashboard';
import Hotels from './pages/Hotels';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generating" element={<LoadingScreen />} />
            <Route path="/dashboard" element={<TripDashboard />} />
            <Route path="/hotels" element={<Hotels />} />
          </Routes>
        </main>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
