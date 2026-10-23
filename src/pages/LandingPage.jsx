import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Heart, Users, Compass, Plane, Building, Home, Package, Train, Car, Search, ChevronDown, Percent } from 'lucide-react';
import './LandingPage.css';

const DESTINATIONS = [
  'Manali', 'Goa', 'Kerala', 'Rajasthan', 'Ladakh', 'Rishikesh',
  'Varanasi', 'Darjeeling', 'Udaipur', 'Hampi', 'Meghalaya', 'Andaman',
  'Shimla', 'Jaipur', 'Agra', 'Mumbai', 'Delhi', 'Ooty',
  'Munnar', 'Coorg', 'Pondicherry', 'Jaisalmer', 'Khajuraho', 'Mysore'
];

const OFFERS = [
  { id: 1, title: 'INTL HOTELS', desc: 'Up to 40% OFF* on Hotels in Dubai, London & more.', code: 'MMTINTL' },
  { id: 2, title: 'DOMESTIC FLIGHTS', desc: 'Flat ₹1500 OFF* on Domestic Flights.', code: 'FLYNOW' },
  { id: 3, title: 'HOLIDAY PACKAGES', desc: 'Get 20% Extra Savings on Kerala Packages.', code: 'KERALA20' },
  { id: 4, title: 'TRAINS', desc: 'Zero Cancellation Fee on Train Bookings.', code: 'FREETRAIN' }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('packages');
  const [fromCity, setFromCity] = useState('New Delhi');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dates, setDates] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  // MMT-style Categories
  const CATEGORIES = [
    { id: 'flights', label: 'Flights', icon: <Plane size={24} /> },
    { id: 'packages', label: 'Holiday Packages', icon: <Package size={24} /> },
    { id: 'trains', label: 'Trains', icon: <Train size={24} /> },
    { id: 'cabs', label: 'Cabs', icon: <Car size={24} /> },
  ];

  const handleFromChange = (e) => {
    const val = e.target.value;
    setFromCity(val);
    if (val.length > 0) {
      const matches = DESTINATIONS.filter(d =>
        d.toLowerCase().startsWith(val.toLowerCase())
      ).slice(0, 5);
      setFromSuggestions(matches);
      setShowFromDropdown(true);
    } else {
      setFromSuggestions([]);
      setShowFromDropdown(false);
    }
  };

  const selectFromSuggestion = (s) => {
    setFromCity(s);
    setShowFromDropdown(false);
  };

  const handleDestChange = (e) => {
    const val = e.target.value;
    setDestination(val);
    if (val.length > 0) {
      const matches = DESTINATIONS.filter(d =>
        d.toLowerCase().startsWith(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(matches);
      setShowDestDropdown(true);
    } else {
      setSuggestions([]);
      setShowDestDropdown(false);
    }
  };

  const selectSuggestion = (s) => {
    setDestination(s);
    setShowDestDropdown(false);
  };

  const openTransportSearch = (mode) => {
    if (!destination) {
      alert('Please enter a destination first!');
      return;
    }
    const originQuery = encodeURIComponent(fromCity);
    const destQuery = encodeURIComponent(destination);
    let url;
    if (mode === 'trains') {
      url = `https://www.irctc.co.in/nget/train-search?fromStation=${originQuery}&toStation=${destQuery}`;
    } else if (mode === 'flights') {
      url = `https://www.ixigo.com/flights?fromCity=${originQuery}&toCity=${destQuery}`;
    } else if (mode === 'cabs') {
      url = `https://www.uber.com/in/en/ride/?pickup[formatted_address]=${originQuery}&dropoff[formatted_address]=${destQuery}`;
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSearch = () => {
    if (!destination) {
      alert("Please enter a destination first!");
      return;
    }
    // If dates not provided, allow flexibleDates mode
    const isFlexible = (!dates || dates.trim() === '');
    if (isFlexible) {
      navigate('/generating', {
        state: {
          fromCity,
          destination,
          mood: 'nature',
          tripType: 'couple',
          dates: 'Flexible Dates',
          flexibleDates: true,
          perDayBudget: ''
        }
      });
      return;
    }

    // parse dates into start/end (accept single date like '2026-06-01' OR range '2026-06-01 to 2026-06-05')
    const parseDates = (d) => {
      if (!d) return null;
      const tryParse = (s) => {
        // Try ISO first
        let dt = new Date(s);
        if (!Number.isNaN(dt.getTime())) return dt;
        // Try DD/MM/YYYY
        const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (m) return new Date(`${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`);
        return null;
      };
      // If the string contains ' to ' treat as range, otherwise treat as single start date
      if (d.includes(' to ')) {
        const parts = d.split(' to ').map(s => s.trim());
        if (parts.length < 2) return null;
        const s = tryParse(parts[0]);
        const e = tryParse(parts[1]);
        if (!s || !e) return null;
        return { start: s, end: e };
      }
      // single date -> use default duration (2 days)
      const sSingle = tryParse(d.trim());
      if (!sSingle) return null;
      return { start: sSingle, end: new Date(sSingle.getFullYear(), sSingle.getMonth(), sSingle.getDate() + 2) };
    };

    const parsed = parseDates(dates);
    if (!parsed) {
      alert('Please enter a valid date like "2026-06-01" or a range "2026-06-01 to 2026-06-05"');
      return;
    }
    const today = new Date();
    // normalize to start of day
    const startDay = new Date(parsed.start.getFullYear(), parsed.start.getMonth(), parsed.start.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (startDay < todayDay) {
      alert('Start date is in the past. Please select today or a future date.');
      return;
    }

    navigate('/generating', {
      state: {
        fromCity,
        destination,
        mood: 'nature', // default
        tripType: 'couple', // default
        dates,
        startDate: startDay.toISOString().split('T')[0],
        endDate: new Date(parsed.end.getFullYear(), parsed.end.getMonth(), parsed.end.getDate()).toISOString().split('T')[0],
        perDayBudget: '',
        rooms,
        adults,
        children
      }
    });
  };

  return (
    <div className="mmt-wrapper">
      {/* MMT Style Header/Background */}
      <div className="mmt-header-bg">
        <nav className="mmt-navbar">
          <div className="mmt-logo">
            <Compass className="mmt-logo-icon" size={28} />
            <span>Bharat Yatra<span className="logo-ai">AI</span></span>
          </div>
          <div className="mmt-nav-actions">
            <div className="mmt-offer-link">
              <Percent size={16} /> <span>Super Offers</span>
            </div>
            <button className="mmt-login-btn">
              <span className="mmt-logo-icon">M</span> Login / Create Account <ChevronDown size={14} />
            </button>
          </div>
        </nav>
      </div>

      {/* Main Search Widget Container */}
      <div className="mmt-search-container">
        
        {/* Category Tabs */}
        <div className="mmt-categories">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              className={`mmt-cat-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => {
                // External redirects for certain categories
                if (cat.id === 'trains') { openTransportSearch('trains'); return; }
                if (cat.id === 'cabs') { openTransportSearch('cabs'); return; }
                if (cat.id === 'flights') { openTransportSearch('flights'); return; }
                // Hotels: navigate to hotels page with current destination and guest info
                if (cat.id === 'hotels') {
                  if (!destination) {
                    alert('Please select a destination first to view hotels.');
                    return;
                  }
                  navigate('/hotels', { state: { destination, rooms, adults, children } });
                  return;
                }
                setActiveTab(cat.id);
              }}
            >
              <div className="cat-icon">{cat.icon}</div>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Fields Box */}
        <div className="mmt-search-box">
          <div className="mmt-search-row">
            
            {/* From/City */}
            <div className="mmt-input-group mmt-from-city" onClick={() => document.getElementById('from-input').focus()}>
              <label>FROM CITY</label>
              <input 
                id="from-input"
                type="text" 
                value={fromCity} 
                onChange={handleFromChange}
                placeholder="From where?" 
                className="mmt-value-input"
                autoComplete="off"
              />
              <p className="mmt-sub-text">{fromCity ? 'Selected origin' : 'Select a starting place'}</p>
              
              {showFromDropdown && fromSuggestions.length > 0 && (
                <div className="mmt-dropdown">
                  {fromSuggestions.map(s => (
                    <div key={s} className="mmt-dropdown-item" onClick={() => selectFromSuggestion(s)}>
                      <MapPin size={16} />
                      <div className="mmt-drop-text">
                        <span className="city-name">{s}</span>
                        <span className="country-name">India</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To/Destination */}
            <div className="mmt-input-group mmt-to-city" onClick={() => document.getElementById('dest-input').focus()}>
              <label>TO DESTINATION</label>
              <input 
                id="dest-input"
                type="text" 
                value={destination} 
                onChange={handleDestChange}
                placeholder="Where to?" 
                className="mmt-value-input"
                autoComplete="off"
              />
              <p className="mmt-sub-text">{destination ? 'Selected destination' : 'Select a beautiful place'}</p>
              
              {showDestDropdown && suggestions.length > 0 && (
                <div className="mmt-dropdown">
                  {suggestions.map(s => (
                    <div key={s} className="mmt-dropdown-item" onClick={() => selectSuggestion(s)}>
                      <MapPin size={16} />
                      <div className="mmt-drop-text">
                        <span className="city-name">{s}</span>
                        <span className="country-name">India</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Departure */}
            <div className="mmt-input-group mmt-dates">
              <label>DEPARTURE <ChevronDown size={14}/></label>
              <input 
                type="text" 
                value={dates} 
                onChange={(e) => setDates(e.target.value)}
                placeholder="Dates" 
                className="mmt-value-input"
              />
              <p className="mmt-sub-text">Tap to add date</p>
            </div>

            {/* Travellers */}
            <div className="mmt-input-group mmt-travellers" onClick={() => setShowGuestsDropdown(prev => !prev)}>
              <label>ROOMS & GUESTS <ChevronDown size={14}/></label>
              <input type="text" value={`${rooms} Room${rooms>1? 's':''}, ${adults} Adult${adults>1? 's':''}${children>0 ? ', ' + children + ' Child' + (children>1? 'ren':'' ) : ''}`} readOnly className="mmt-value-input" />
              <p className="mmt-sub-text">Customize rooms & guests</p>

              {showGuestsDropdown && (
                <div className="mmt-dropdown guest-dropdown" id="guests-picker">
                  <div className="guest-row">
                    <div className="guest-label">Rooms</div>
                    <div className="guest-controls">
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setRooms(r => Math.max(1, r-1));}}>-</button>
                      <span>{rooms}</span>
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setRooms(r => Math.min(10, r+1));}}>+</button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <div className="guest-label">Adults</div>
                    <div className="guest-controls">
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setAdults(a => Math.max(1, a-1));}}>-</button>
                      <span>{adults}</span>
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setAdults(a => Math.min(20, a+1));}}>+</button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <div className="guest-label">Children</div>
                    <div className="guest-controls">
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setChildren(c => Math.max(0, c-1));}}>-</button>
                      <span>{children}</span>
                      <button type="button" onClick={(e)=>{e.stopPropagation(); setChildren(c => Math.min(10, c+1));}}>+</button>
                    </div>
                  </div>
                  <div className="guest-actions">
                    <button type="button" onClick={(e)=>{e.stopPropagation(); setShowGuestsDropdown(false);}}>Done</button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Search Button */}
          <button className="mmt-search-btn" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>

      {/* Offers Section */}
      <div className="mmt-offers-section">
        <div className="mmt-offers-header">
          <h2>Offers</h2>
          <div className="mmt-offer-tabs">
            <span className="active">All Offers</span>
            <span>Bank Offers</span>
            <span>Flights</span>
            <span>Hotels</span>
          </div>
        </div>
        
        <div className="mmt-offers-grid">
          {OFFERS.map(offer => (
            <div key={offer.id} className="mmt-offer-card">
              <div className="offer-img-placeholder">
                <Percent size={32} color="#fff" />
              </div>
              <div className="offer-details">
                <span className="offer-tag">{offer.title}</span>
                <h4>{offer.desc}</h4>
                <div className="offer-bottom">
                  <span className="offer-code">T&C's Apply</span>
                  <span className="offer-book">BOOK NOW</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Extra Space */}
      <div className="mmt-footer-placeholder">
        <p>Explore the world with Bharat Yatra AI</p>
      </div>

    </div>
  );
};

export default LandingPage;
