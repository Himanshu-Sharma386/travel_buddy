import { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, Phone, UserCheck, Shield, ChevronDown, ChevronUp, MapPin, Search, WifiOff, RefreshCw, CloudRain } from 'lucide-react';
import './SafetyDashboard.css';

const AnimatedScore = ({ score, max = 10 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1500;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          setVal(+(p * score).toFixed(1));
          if (p < 1) requestAnimationFrame(tick);
        };
        tick();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [score]);

  const pct = (val / max) * 100;
  const circ = 2 * Math.PI * 45;
  const dash = (pct / 100) * circ;

  return (
    <div className="score-circle" ref={ref}>
      <svg viewBox="0 0 100 100" width="90" height="90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-success)" strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.25}
          strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }}/>
      </svg>
      <div className="score-val">{val}<span>/{max}</span></div>
    </div>
  );
};

const BASE_SCAMS = [
  { id: 1, risk: 'High', title: 'Rohtang Pass Permit Scam', desc: 'Touts charging ₹2000+ for a ₹500 permit. Always book officially at himachal.nic.in or at DC office.', tips: ['Never pay cash to strangers at bus stand', 'Official permit costs ₹500 online'] },
  { id: 2, risk: 'Medium', title: 'Fake Pashmina Shawls', desc: 'Mall road vendors selling synthetic blends as pure Pashmina at ₹3000+.', tips: ['Buy only from HP State Emporium', 'Genuine Pashmina has a GI tag'] },
  { id: 3, risk: 'Low', title: 'Overcharging Auto Drivers', desc: 'Prepaid counter rates ignored; meters not used.', tips: ['Use Ola/Uber when available', 'Negotiate fare before boarding'] },
];

const CITY_RISK_MAP = {
  goa: { safetyScore: 7.8, crimeIndex: 'Moderate', health: 'Moderate', note: 'Avoid isolated beaches late night.' },
  delhi: { safetyScore: 7.2, crimeIndex: 'Moderate', health: 'Clear', note: 'Use verified taxi apps and crowded routes.' },
  mumbai: { safetyScore: 8.2, crimeIndex: 'Low', health: 'Clear', note: 'Generally safe in active public areas.' },
  manali: { safetyScore: 8.5, crimeIndex: 'Low', health: 'Moderate', note: 'Mountain weather and road changes are common.' },
};

const SafetyDashboard = ({ destination = 'Manali', tripData = null }) => {
  const destinationKey = destination.toLowerCase();
  const cityProfile = CITY_RISK_MAP[destinationKey] || { safetyScore: 8, crimeIndex: 'Low', health: 'Moderate', note: `Use local advisories in ${destination}.` };
  const [expandedScam, setExpandedScam] = useState(null);
  const [scams, setScams] = useState([
    { id: 100, risk: 'Medium', title: `${destination} Tourist Overcharge Alert`, desc: `Reports of inflated prices in some tourist zones of ${destination}.`, tips: ['Confirm fare before starting', 'Use app-based booking when possible'] },
    ...BASE_SCAMS
  ]);
  
  // TC30: Offline Mode
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // TC26-TC28: Dynamic Fraud Alerts
  const [searchLoc, setSearchLoc] = useState('');
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const [isDataUnavailable, setIsDataUnavailable] = useState(false); // TC39

  // Threat Intelligence Data (TC36, TC38, TC40)
  const [threatData, setThreatData] = useState({
    crime: { index: cityProfile.crimeIndex, score: 24, label: `${destination} risk intelligence` },
    health: { alert: cityProfile.health, desc: `Health guidance for ${destination}: carry basic travel medicine and hydrate well.` },
    updatedAt: new Date().toLocaleTimeString()
  });

  // Handle Offline/Online events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // TC27, TC28: Fetch alerts based on location search
  const handleSearchAlerts = (e) => {
    e.preventDefault();
    if (!searchLoc.trim() || isOffline) return;

    setIsLoadingAlerts(true);
    setIsDataUnavailable(false);

    // Simulate API call
    setTimeout(() => {
      const loc = searchLoc.toLowerCase();
      if (loc.includes('unknown') || loc.includes('xyz')) {
        // TC27: No fraud data available
        setScams([]);
      } else if (loc.includes('delhi')) {
        // Dynamic update
        setScams([
          { id: 4, risk: 'High', title: 'Fake Tourist Offices', desc: 'Touts pretending to be official DTTDC guides near station.', tips: ['Verify ID cards', 'Visit official counters only'] },
          { id: 5, risk: 'Medium', title: 'Pickpocketing', desc: 'High incidents reported in Chandni Chowk and metro during rush hour.', tips: ['Keep wallet in front pocket', 'Wear backpack in front'] }
        ]);
      } else {
        // TC28: Real-time update simulated
        setScams([{ id: 99, risk: 'Medium', title: `Recent Alert for ${searchLoc}`, desc: 'Community reported slight increase in taxi overcharging.', tips: ['Use prepaid booths'] }, ...BASE_SCAMS]);
      }
      setIsLoadingAlerts(false);
    }, 800);
  };

  // TC40: Live update threat intelligence
  const refreshThreatData = () => {
    if(isOffline) return;
    setIsDataUnavailable(false);
    // Simulate API refresh
    setTimeout(() => {
      setThreatData({
        crime: { index: cityProfile.crimeIndex, score: 18, label: `${destination} feed refreshed` },
        health: { alert: 'Clear', desc: `No major health advisories in ${destination} right now.` },
        updatedAt: new Date().toLocaleTimeString()
      });
    }, 600);
  };

  // TC39: Simulate data unavailability
  const simulateNoData = () => {
    setIsDataUnavailable(true);
  };

  return (
    <div className="safety-module">
      
      {/* TC30: Offline Mode Banner */}
      {isOffline && (
        <div className="offline-banner">
          <WifiOff size={16} />
          <span><strong>Offline Mode Active:</strong> Showing cached safety alerts and intelligence data. Live updates paused.</span>
        </div>
      )}

      <div className="safety-grid">

        {/* TC31-TC35: Women's Safety */}
        <div className="safety-card glass-panel women-card">
          <div className="sc-header">
            <UserCheck size={20} className="text-secondary-c"/>
            <h3>Women's Safety Layer - {destination}</h3>
          </div>
          
          <div className="score-section">
            {/* TC31: Display safety rating */}
            <AnimatedScore score={tripData?.safety?.safetyRating || cityProfile.safetyScore}/>
            <div className="score-meta">
              <strong>Destination-aware safety score</strong>
              <p>{cityProfile.note}</p>
            </div>
          </div>

          {/* TC32: Night safety warning */}
          <div className="night-safety-warning">
            <AlertTriangle size={14} className="text-warning"/>
            <span><strong>Night Advisory:</strong> Stay in active public areas of {destination} after dark; avoid isolated routes.</span>
          </div>

          {/* TC34: Unsafe area alert */}
          <div className="unsafe-area-alert">
            <MapPin size={14} className="text-danger"/>
            <span><strong>High Risk Area:</strong> Check current local alerts for {destination} before evening outings.</span>
          </div>

          <ul className="safety-list">
            {/* TC35: Safe transport options */}
            <li><Tick/> <strong>Transport:</strong> Prefer verified app cabs or prepaid counters in {destination}.</li>
            <li><Tick/> Keep emergency numbers and hotel location handy while exploring.</li>
          </ul>

          {/* TC33: Emergency contacts */}
          <div className="helplines">
            <a href="tel:112" className="helpline-btn"><Phone size={14}/> 112 <span>Police</span></a>
            <a href="tel:1091" className="helpline-btn emergency"><Phone size={14}/> 1091 <span>Women's Helpline</span></a>
          </div>
        </div>

        {/* TC26-TC30: Fraud Alerts */}
        <div className="safety-card glass-panel fraud-card">
          <div className="sc-header">
            <AlertTriangle size={20} className="text-warning"/>
            <h3>Travel Fraud Database - {destination}</h3>
          </div>
          
          <form className="fraud-search" onSubmit={handleSearchAlerts}>
            <input 
              type="text" 
              placeholder="Check another location..." 
              value={searchLoc}
              onChange={(e) => setSearchLoc(e.target.value)}
              disabled={isOffline}
            />
            <button type="submit" disabled={isOffline || !searchLoc} className="search-btn">
              <Search size={16} />
            </button>
          </form>

          {isLoadingAlerts ? (
            <div className="loading-alerts">Scanning database...</div>
          ) : scams.length === 0 ? (
            /* TC27: No fraud data available */
            <div className="no-alerts-msg">
              <Shield size={24} className="text-success" />
              <p>No active fraud alerts reported for this location.</p>
            </div>
          ) : (
            <>
              <p className="sc-sub">Active scam reports:</p>
              <div className="scam-accordion">
                {scams.map((s, i) => (
                  <div key={s.id} className={`scam-row ${expandedScam === i ? 'open' : ''}`}>
                    {/* TC29: Click alert to view details */}
                    <button className="scam-toggle" onClick={() => setExpandedScam(expandedScam === i ? null : i)}>
                      <span className={`risk-tag ${s.risk.toLowerCase()}`}>{s.risk}</span>
                      <span className="scam-title">{s.title}</span>
                      {expandedScam === i ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    {expandedScam === i && (
                      <div className="scam-detail">
                        <p>{s.desc}</p>
                        <ul>{s.tips.map((t, j) => <li key={j}><Tick/> {t}</li>)}</ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* TC36-TC40: Threat Intelligence */}
        <div className="safety-card glass-panel threat-card">
          <div className="sc-header">
            <ShieldAlert size={20} className="text-danger"/>
            <h3>Threat Intelligence</h3>
          </div>
          
          <div className="threat-actions">
            <span className="sc-sub">Live NCRB & Env Data - {destination}</span>
            <button className="refresh-btn" onClick={refreshThreatData} disabled={isOffline} title="Refresh Data">
              <RefreshCw size={14} /> {threatData.updatedAt}
            </button>
            <button className="btn-sm outline-btn" onClick={simulateNoData} title="Test TC39">Simulate Fail</button>
          </div>

          {/* TC39: Data Unavailable */}
          {isDataUnavailable ? (
            <div className="no-data-fallback">
              <AlertTriangle size={24} className="text-warning" />
              <p>Intelligence servers currently unreachable.</p>
              <button className="secondary-btn btn-sm" onClick={refreshThreatData}>Retry Connection</button>
            </div>
          ) : (
            <>
              <div className="threat-stats">
                {/* TC36: Crime Data */}
                <div className={`ts-item ${threatData.crime.index.toLowerCase().includes('low') ? 'success' : 'warning'}`}>
                  <Shield size={18}/> 
                  <div className="ts-info">
                    <strong>Crime Index: {threatData.crime.index}</strong>
                    <span>{tripData?.safety?.safetyRating ? `${destination} safety score: ${tripData.safety.safetyRating}/10` : threatData.crime.label}</span>
                  </div>
                </div>
                
                {/* TC37: Weather Alert */}
                <div className="ts-item warning">
                  <CloudRain size={18}/> 
                  <div className="ts-info">
                    <strong>Weather Alert ({destination})</strong>
                    <span>Weather may impact travel windows in {destination}. Recheck forecast before long routes.</span>
                  </div>
                </div>
                
                {/* TC38: Health Advisory */}
                <div className={`ts-item ${threatData.health.alert === 'Clear' ? 'info' : 'warning'}`}>
                  <AlertTriangle size={18}/> 
                  <div className="ts-info">
                    <strong>Health: {threatData.health.alert}</strong>
                    <span>{threatData.health.desc}</span>
                  </div>
                </div>
              </div>
              
              <div className="advisory-box">
                <strong>Official Advisory:</strong>
                <p>Follow district administration and tourism board advisories for {destination} before intercity or night travel.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export default SafetyDashboard;
