import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Hotels.css';

const Hotels = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const destination = location.state?.destination || '';

  useEffect(() => {
    if (!destination) {
      navigate('/');
      return;
    }
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const resp = await fetch(`http://localhost:8080/hotels?destination=${encodeURIComponent(destination)}`);
        if (resp.ok) {
          const data = await resp.json();
          setHotels(data.hotels || []);
        } else {
          console.error('Failed to fetch hotels', await resp.text());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [destination, navigate]);

  const handleSelect = async (hotel) => {
    // create a minimal save-trip payload using a demo userId=1 (adjust if auth exists)
    const payload = {
      userId: location.state?.userId || 1,
      destination,
      budget: location.state?.budget || 0,
      startDate: location.state?.startDate || new Date().toISOString().slice(0,10),
      endDate: location.state?.endDate || new Date().toISOString().slice(0,10),
      itineraryDetails: location.state?.itineraryDetails || "",
      rooms: location.state?.rooms || 1,
      adults: location.state?.adults || 1,
      children: location.state?.children || 0,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelBookingUrl: hotel.bookingUrl || hotel.bookingUrl,
      hotelPricePerNight: hotel.pricePerNight
    };
    try {
      const resp = await fetch('http://localhost:8080/save-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const saved = await resp.json();
        alert('Trip saved with selected hotel.');
        navigate('/dashboard');
      } else {
        const txt = await resp.text();
        alert('Failed to save trip: ' + txt);
      }
    } catch (e) {
      console.error(e);
      alert('Error saving trip');
    }
  };

  return (
    <div className="hotels-page">
      <header className="hotels-header">
        <h2>Hotels in {destination}</h2>
        <p>{location.state?.rooms} room(s), {location.state?.adults} adult(s){location.state?.children ? `, ${location.state.children} child(ren)` : ''}</p>
      </header>
      {loading ? <p>Loading hotels...</p> : (
        <div className="hotels-grid">
          {hotels.map(h => (
            <div key={h.id} className="hotel-card">
              <div className="hotel-img" style={{ backgroundImage: `url(${h.image})` }} />
              <div className="hotel-body">
                <h3>{h.name}</h3>
                <p>{h.desc}</p>
                <div className="hotel-meta">⭐ {h.rating} · from ₹{h.pricePerNight}</div>
                <a className="hotel-book" href={h.bookingUrl || '#'} target="_blank" rel="noreferrer">Book</a>
                <button className="hotel-book" style={{ marginLeft:8 }} onClick={() => handleSelect(h)}>Select & Save</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;
