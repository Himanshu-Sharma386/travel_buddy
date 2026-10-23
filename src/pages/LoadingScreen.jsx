import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, ShieldAlert, Map, Wallet, Clock, Activity, AlertTriangle, UserCheck, CheckCircle2, Zap } from 'lucide-react';
import './LoadingScreen.css';

const modules = [
  { id: 1, name: 'Budget Planner', desc: 'Calculating INR costs...', icon: <Wallet size={22} />, color: '#F59E0B' },
  { id: 2, name: 'Best Places', desc: 'Fetching seasonal data...', icon: <Map size={22} />, color: '#3B82F6' },
  { id: 3, name: 'Route Optimizer', desc: 'Computing paths...', icon: <Activity size={22} />, color: '#10B981' },
  { id: 4, name: 'Time Scheduler', desc: 'Building itinerary...', icon: <Clock size={22} />, color: '#8B5CF6' },
  { id: 5, name: 'Fraud Database', desc: 'Scanning scam reports...', icon: <AlertTriangle size={22} />, color: '#EF4444' },
  { id: 6, name: "Women's Safety", desc: 'Pulling safety ratings...', icon: <UserCheck size={22} />, color: '#EC4899' },
  { id: 7, name: 'Threat Intel', desc: 'Checking NCRB data...', icon: <ShieldAlert size={22} />, color: '#F97316' },
  { id: 8, name: 'Personalization', desc: 'Tailoring results...', icon: <Cpu size={22} />, color: '#06B6D4' },
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: 'red', padding: 20}}><h1>LoadingScreen Error</h1><pre>{this.state.error.toString()}</pre></div>;
    }
    return this.props.children;
  }
}

const LoadingScreenContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModules, setActiveModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('connecting');

  const tripDataRef = useRef(null);

  const parseTripDays = (datesText) => {
    if (!datesText) return 7;
    const dayMatch = datesText.match(/(\d+)\s*day/i);
    if (dayMatch) {
      const days = Number(dayMatch[1]);
      return Number.isFinite(days) && days > 0 ? days : 7;
    }
    return 7;
  };

  useEffect(() => {
    // Require destination and dates to be provided; don't call backend otherwise
    const hasDates = Boolean(location.state?.dates || (location.state?.startDate && location.state?.endDate) || location.state?.flexibleDates);
    const hasDestination = Boolean(location.state?.destination);
    if (!hasDestination || !hasDates) {
      // Navigate back to landing so user can fill required details
      setTimeout(() => {
        navigate('/', { state: { error: 'Please provide destination and dates before starting the trip.' } });
      }, 800);
    } else {
      // Validate dates are not in the past
      const startISO = location.state?.startDate || (location.state?.dates && typeof location.state.dates === 'string' ? (location.state.dates.includes(' to ') ? location.state.dates.split(' to ')[0] : location.state.dates) : null);
      const start = startISO ? new Date(startISO) : null;
      if (start) {
        const today = new Date();
        const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (startDay < todayDay) {
          setTimeout(() => {
            navigate('/', { state: { error: 'Start date is in the past. Please select today or a future date.' } });
          }, 800);
          return;
        }
      }
      // Start the API call in parallel with the animation
      const fetchTripData = async () => {
        try {
          const tripDays = parseTripDays(location.state?.dates);
          const perDayBudget = Number(location.state?.perDayBudget || 0);
          const totalBudget = perDayBudget > 0 ? perDayBudget * tripDays : 50000;
          const startDateObj = location.state?.startDate ? new Date(location.state.startDate) : new Date();
          const endDateObj = location.state?.endDate ? new Date(location.state.endDate) : new Date(Date.now() + (tripDays - 1) * 24 * 60 * 60 * 1000);
          const payloadBase = {
            destination: location.state?.destination || 'Manali',
            budget: totalBudget,
            preferences: location.state?.mood || 'general',
            rooms: location.state?.rooms ?? 1,
            adults: location.state?.adults ?? 2,
            children: location.state?.children ?? 0,
          };
          const payload = location.state?.flexibleDates ? { ...payloadBase, flexibleDates: true } : { ...payloadBase, startDate: startDateObj.toISOString().split('T')[0], endDate: endDateObj.toISOString().split('T')[0] };
          const response = await fetch('http://localhost:8080/generate-trip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (response.ok) {
            const data = await response.json();
            tripDataRef.current = data;
          } else {
            console.error('Trip generation failed:', await response.text());
          }
        } catch (error) {
          console.error('Failed to fetch trip data:', error);
        }
      };
      fetchTripData();
    }

    setTimeout(() => setPhase('processing'), 800);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < modules.length) {
        const currentId = modules[idx].id;
        setActiveModules(prev => [...prev, currentId]);
        setProgress(Math.round(((idx + 1) / modules.length) * 100));
        idx++;
      } else {
        clearInterval(interval);
        setPhase('complete');
        // Wait for fetch to complete if it hasn't already (in a real scenario, you'd properly await both)
        setTimeout(() => {
            navigate('/dashboard', { 
                state: { 
                    ...(location.state || {}), 
                    tripData: tripDataRef.current // Pass tripData if fetched, else null
                } 
            });
        }, 1200);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [navigate, location.state]);

  return (
    <div className="loading-wrapper">
      <div className="loading-bg-orb orb-a"></div>
      <div className="loading-bg-orb orb-b"></div>
      <div className="ai-core-section">
        <div className="orbit-container">
          <div className="orbit-ring ring-1"></div>
          <div className="orbit-ring ring-2"></div>
          {modules.map((mod, i) => {
            const angle = (i / modules.length) * 360;
            const isActive = activeModules.includes(mod.id);
            return (
              <div key={mod.id} className={`orbit-dot ${isActive ? 'active' : ''}`}
                style={{ '--angle': `${angle}deg`, '--color': mod.color }}>
                <div className="orbit-dot-inner">{mod.icon}</div>
              </div>
            );
          })}
          <div className={`core-center ${phase}`}>
            <div className="core-pulse"></div>
            <div className="core-icon">
              {phase === 'complete' ? <CheckCircle2 size={36} /> : <Zap size={36} />}
            </div>
          </div>
        </div>
        <div className="core-text">
          <h2>{phase === 'connecting' ? 'Initializing AI Core...' : phase === 'processing' ? 'Analyzing Your Destination' : 'Your Plan is Ready!'}</h2>
          <p>{location.state?.destination ? `Building plan for ${location.state.destination}` : 'Processing 8 modules'}</p>
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
        <span className="progress-text">{progress}%</span>
      </div>
      <div className="module-feed">
        {modules.map((mod) => {
          const isActive = activeModules.includes(mod.id);
          return (
            <div key={mod.id} className={`module-feed-item ${isActive ? 'active' : ''}`} style={{ '--mod-color': mod.color }}>
              <div className="mfi-icon">{mod.icon}</div>
              <div className="mfi-info"><span className="mfi-name">{mod.name}</span><span className="mfi-desc">{mod.desc}</span></div>
              <div className="mfi-status">{isActive ? <CheckCircle2 size={18} className="mfi-check" /> : <div className="mfi-spinner"></div>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <ErrorBoundary>
    <LoadingScreenContent />
  </ErrorBoundary>
);

export default LoadingScreen;
