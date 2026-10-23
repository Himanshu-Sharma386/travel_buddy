import { useState, useRef, useEffect } from 'react';
import { Share2, Compass, Loader2, Bot, Send, X, FileDown, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './TripDashboard.css';
import BudgetPlanner from '../components/BudgetPlanner';
import BestPlaces from '../components/BestPlaces';
import RouteOptimizer from '../components/RouteOptimizer';
import TimeManagement from '../components/TimeManagement';
import SafetyDashboard from '../components/SafetyDashboard';

import { useLocation } from 'react-router-dom';

const TABS = [
  { id: 'overview', label: 'Overview', emoji: '🗺️' },
  { id: 'budget', label: 'Live Budget', emoji: '💰' },
  { id: 'schedule', label: 'Smart Schedule', emoji: '🗓️' },
  { id: 'safety', label: 'Safety & Intel', emoji: '🛡️' },
];

const TripDashboard = () => {
  const location = useLocation();
  const tripDetails = location.state || {};
  const destination = tripDetails.destination || 'Manali';
  const dates = tripDetails.dates || 'Dec 15 – Dec 22';
  const tripType = tripDetails.tripType || 'couple';
  const mood = tripDetails.mood || 'adventure';
  const tripData = tripDetails.tripData; // The data from the backend

  const [activeTab, setActiveTab] = useState('overview');
  const [realTimePlaces, setRealTimePlaces] = useState([]);
  const [loadingRealTime, setLoadingRealTime] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dashboardRef = useRef(null);
  
  // TC48-TC49: Export PDF state
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  
  const moodLabel = mood?.charAt(0).toUpperCase() + mood?.slice(1);
  const tripTypeLabel = tripType?.charAt(0).toUpperCase() + tripType?.slice(1);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    if (!destination) {
      setIsLoaded(true);
      return;
    }

    const fetchRealTimeData = async () => {
      setLoadingRealTime(true);
      try {
        // 1. Geocode the destination using Nominatim
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
        if (!geoRes.ok) throw new Error("Geocoding failed");
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          const lat = parseFloat(geoData[0].lat);
          const lon = parseFloat(geoData[0].lon);

          // 2. Fetch attractions from Wikipedia geosearch
          const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${lat}|${lon}&ggsradius=15000&ggslimit=10&prop=pageimages|coordinates|extracts&pithumbsize=600&exintro&explaintext&exlimit=max&format=json&origin=*`);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            if (wikiData.query && wikiData.query.pages) {
              const parsedPlaces = Object.values(wikiData.query.pages)
                .filter(p => p.coordinates)
                .map((p, idx) => {
                  const title = p.title;
                  const desc = p.extract || `A beautiful point of interest in ${destination}.`;
                  const latVal = p.coordinates[0].lat;
                  const lonVal = p.coordinates[0].lon;
                  
                  // Category classification heuristic
                  let category = 'chill';
                  const titleLower = title.toLowerCase();
                  const descLower = desc.toLowerCase();
                  if (/temple|church|mosque|fort|palace|museum|tomb|castle|history|ancient|monument|heritage|monastery|gurudwara/.test(titleLower + ' ' + descLower)) {
                    category = 'heritage';
                  } else if (/lake|valley|trek|climb|river|mountain|adventure|camp|falls|waterfall|park|wildlife|sanctuary|forest|peak|hill/.test(titleLower + ' ' + descLower)) {
                    category = 'adventure';
                  }

                  // Distance calculation
                  const distanceVal = calculateDistance(lat, lon, latVal, lonVal);

                  // Use Wikipedia thumbnail or fall back to loremflickr matching tag
                  const images = p.thumbnail 
                    ? [p.thumbnail.source] 
                    : [`https://loremflickr.com/900/600/${encodeURIComponent(title.replace(/\s+/g, ','))}?random=${idx}`];

                  return {
                    id: `wiki-${p.pageid}`,
                    name: title,
                    desc: desc.length > 180 ? desc.slice(0, 180) + '...' : desc,
                    images: images,
                    tags: ['Real-time', category.charAt(0).toUpperCase() + category.slice(1)],
                    season: 'Good to visit',
                    status: 'optimal',
                    rating: (4.2 + Math.random() * 0.7).toFixed(1),
                    bestMonths: 'Oct–May',
                    category: category,
                    distance: `${distanceVal.toFixed(1)} km from center`,
                    entryFee: 'Free / Local',
                    coords: [latVal, lonVal]
                  };
                });
              setRealTimePlaces(parsedPlaces);
            }
          }
        }
      } catch (err) {
        console.error("Real-time fetch failed:", err);
      } finally {
        setIsLoaded(true);
        setLoadingRealTime(false);
      }
    };

    fetchRealTimeData();
  }, [destination]);

  // Enhancement #8 & TC48-49: Downloadable PDF
  const handleExportPDF = async () => {
    if (isExporting || !dashboardRef.current) return;
    setIsExporting(true);
    setExportComplete(false);

    try {
      // Small delay to allow UI to settle if needed
      await new Promise(r => setTimeout(r, 100));
      
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#0F172A' // match var(--color-bg-main)
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      // A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Bharat_Yatra_${destination.replace(/\s+/g, '_')}_Itinerary.pdf`);
      
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    } catch (err) {
      console.error("PDF Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };


  if (!isLoaded) {
    return (
      <div className="dashboard-loading">
        <Loader2 className="spinner" size={48} />
        <h2>Compiling your smart itinerary...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div ref={dashboardRef} className="dashboard-export-container">
        <header className="dashboard-header glass-panel">
          <div className="header-left">
            <div className="header-logo"><Compass size={22} /></div>
            <div>
              <h1 className="trip-title">{destination} Smart Itinerary</h1>
              <p className="trip-meta">From {tripDetails.fromCity || 'New Delhi'} to {destination} · {dates} · {tripTypeLabel} · {moodLabel} · Real-time Adjusted</p>
            </div>
          </div>
          <div className="header-right">
            <button className="secondary-btn"><Share2 size={15} /> Share</button>
            <button 
              className={`primary-btn ${exportComplete ? 'success' : ''}`} 
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 size={15} className="spinner"/> : exportComplete ? <CheckCircle2 size={15}/> : <FileDown size={15} />} 
              {isExporting ? 'Generating PDF...' : exportComplete ? 'Saved!' : 'Save PDF Report'}
            </button>
          </div>
        </header>

        <nav className="dashboard-tabs">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="tab-emoji">{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="tab-content" key={activeTab}>
          {activeTab === 'overview' && (
            <div className="overview-layout">
              <section className="overview-main"><BestPlaces key={`places-${destination}`} destination={destination} tripData={tripData} realTimePlaces={realTimePlaces} /></section>
              <aside className="overview-sidebar glass-panel">
                <h3>Live Optimized Route</h3>
                <RouteOptimizer compact destination={destination} tripData={tripData} realTimePlaces={realTimePlaces} fromCity={tripDetails.fromCity} />
              </aside>
            </div>
          )}
          {activeTab === 'budget' && (
            <BudgetPlanner
              destination={destination}
              tripData={tripData}
            />
          )}
          {activeTab === 'schedule' && (
            <div className="schedule-layout">
              <div className="timeline-col"><TimeManagement key={`schedule-${destination}-${dates}`} destination={destination} tripData={tripData} /></div>
              <div className="map-col">
                {/* Full Map View */}
                <RouteOptimizer compact={false} destination={destination} tripData={tripData} realTimePlaces={realTimePlaces} fromCity={tripDetails.fromCity} />
              </div>
            </div>
          )}
          {activeTab === 'safety' && (
            <SafetyDashboard
              destination={destination}
              tripData={tripData}
            />
          )}
        </main>
      </div>

    </div>
  );
};

export default TripDashboard;
