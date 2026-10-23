import { useState, useEffect } from 'react';
import { CloudSnow, Sun, CloudRain, Eye, X, Star, Calendar, Filter, ChevronLeft, ChevronRight, ImageOff, MapPin } from 'lucide-react';
import './BestPlaces.css';
import DESTINATION_PLACES from '../data/places';

// Normalize categories & images across all place data
const ALLOWED_CATS = ['adventure', 'heritage', 'chill'];
const normalizeCategory = (raw = '') => {
  const r = (raw || '').toString().toLowerCase();
  if (r.includes('advent') || r.includes('trek') || r.includes('beach') || r.includes('snow') || r.includes('scenic')) return 'adventure';
  if (r.includes('herit') || r.includes('unesco') || r.includes('fort') || r.includes('temple') || r.includes('history')) return 'heritage';
  return 'chill';
};

const ensureImages = (place) => {
  if (Array.isArray(place.images) && place.images.length > 0 && place.images.every(Boolean)) return place.images;
  // fallback to Unsplash by using place name as seed
  const seed = encodeURIComponent((place.name || 'landmark').replace(/\s+/g, '-'));
  return [`https://source.unsplash.com/900x600/?${seed}`];
};

const normalizePlace = (p) => ({
  id: p.id ?? Math.floor(Math.random() * 1000000),
  name: p.name ?? 'Unknown Place',
  desc: p.desc ?? p.description ?? 'Popular local attraction.',
  images: ensureImages(p),
  tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : [normalizeCategory(p.category || p.tags?.[0] || p.desc || p.name)],
  season: p.season ?? p.bestMonths ?? 'All Year',
  status: p.status ?? 'optimal',
  rating: p.rating ?? 4.5,
  bestMonths: p.bestMonths ?? p.season ?? 'All Year',
  category: ALLOWED_CATS.includes((p.category || '').toLowerCase()) ? p.category.toLowerCase() : normalizeCategory(p.category || p.tags?.[0] || p.desc || p.name),
  distance: p.distance ?? 'Varies',
  entryFee: p.entryFee ?? 'Varies',
});

// Apply normalization to the DESTINATION_PLACES map
Object.keys(DESTINATION_PLACES).forEach(key => {
  DESTINATION_PLACES[key] = DESTINATION_PLACES[key].map(normalizePlace);
});

// TC15: Filter categories
const CATEGORIES = [
  { id: 'all', label: 'All Places' },
  { id: 'adventure', label: '🏔️ Adventure' },
  { id: 'heritage', label: '🏛️ Heritage' },
  { id: 'chill', label: '☕ Chill' },
];

const BestPlaces = ({ destination = 'Manali', tripData = null, realTimePlaces = [] }) => {
  const [backendPlaces, setBackendPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({}); // TC13: Track image load failures

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/destinations`);
        if (response.ok) {
          const data = await response.json();
          // Access the destinations array from the object structure
          const destinationsArray = data.destinations || [];
          
          // Filter places that match the destination name or description
          const matched = destinationsArray.filter(p => 
            p.name.toLowerCase().includes(destination.toLowerCase()) || 
            p.description.toLowerCase().includes(destination.toLowerCase())
          );
          setBackendPlaces(matched.map(p => ({
            id: p.id,
            name: p.name,
            desc: p.description,
            images: [p.imageUrl],
            tags: [p.category, 'Real Location'],
            season: p.bestTime,
            status: 'optimal',
            rating: p.rating,
            bestMonths: p.bestTime,
            category: p.category.toLowerCase().includes('adventure') ? 'adventure' : 
                      p.category.toLowerCase().includes('heritage') ? 'heritage' : 'chill',
            distance: 'Verified Site',
            entryFee: 'Check locally'
          })));
        }
      } catch (error) {
        console.error("Failed to fetch backend places:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [destination]);

  // Ensure at least 5 places shown: prefer backendPlaces, but supplement with local data when needed
  const localPlaces = (DESTINATION_PLACES[destination.toLowerCase()] || []);
  let destinationPlaces = [];
  if (backendPlaces.length > 0) {
    destinationPlaces = [...backendPlaces];
    // supplement with local places until we have 5
    for (const lp of localPlaces) {
      if (destinationPlaces.length >= 5) break;
      if (!destinationPlaces.some(dp => dp.name.toLowerCase() === lp.name.toLowerCase())) {
        destinationPlaces.push(lp);
      }
    }
  } else {
    destinationPlaces = localPlaces;
  }
  const suggestedFromItinerary = (tripData?.itinerary?.[0]?.schedule || []).slice(0, 4).map((slot, idx) => ({
    id: 500 + idx,
    name: idx === 0 ? `Iconic ${destination}` : idx === 1 ? `${destination} Heritage` : idx === 2 ? `${destination} Market` : `${destination} Nature`,
    desc: slot.activity,
    images: [`https://picsum.photos/seed/${destination}-${idx}/900/600`],
    tags: ['AI Plan', 'Recommended'],
    season: 'Based on your trip dates',
    status: 'good',
    rating: 4.3,
    bestMonths: 'Current trip period',
    category: 'chill',
    distance: destination,
    entryFee: 'Varies',
  }));
  const places = realTimePlaces && realTimePlaces.length > 0 
    ? realTimePlaces 
    : (destinationPlaces.length > 0 ? destinationPlaces : suggestedFromItinerary);

  // TC15: Filter places by category
  const filteredPlaces = activeFilter === 'all'
    ? places
    : places.filter(p => p.category === activeFilter);

  // TC13: Handle image load error
  const handleImageError = (placeId, imgIndex) => {
    setImgErrors(prev => ({
      ...prev,
      [`${placeId}-${imgIndex}`]: true
    }));
  };

  // TC12: Gallery navigation
  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedPlace) {
      setGalleryIndex(prev =>
        prev < selectedPlace.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedPlace) {
      setGalleryIndex(prev =>
        prev > 0 ? prev - 1 : selectedPlace.images.length - 1
      );
    }
  };

  // TC14: Open place details modal
  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
    setGalleryIndex(0);
  };

  // TC11: Get image URL or placeholder
  const getImageUrl = (place, imgIndex = 0) => {
    const hasError = imgErrors[`${place.id}-${imgIndex}`];
    if (hasError) return null;
    return place.images[imgIndex] || null;
  };

  return (
    <div className="places-module" id="best-places">
      <div className="places-header">
        <h2>Top Places & Seasonality</h2>
        <p className="text-muted">Recommendations for {destination} based on your selected trip.</p>
      </div>

      {/* TC15: Category filter bar */}
      <div className="filter-bar" id="category-filter">
        <Filter size={16} className="filter-icon" />
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
            id={`filter-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* TC15: Show message when no places match filter */}
      {filteredPlaces.length === 0 && (
        <div className="no-results" id="no-filter-results">
          <ImageOff size={32} />
          <p>No places found for this category. Try another filter.</p>
        </div>
      )}

      <div className="places-grid">
        {filteredPlaces.map((p, i) => {
          const imgUrl = getImageUrl(p, 0);
          return (
            <div key={p.id} className="place-card glass-panel" style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => openPlaceDetails(p)} id={`place-card-${p.id}`}>
              {/* TC11 & TC13: Image with fallback */}
              <div
                className="place-img"
                style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
              >
                {/* TC13: Image failure fallback placeholder */}
                {!imgUrl && (
                  <div className="img-placeholder" id={`placeholder-${p.id}`}>
                    <ImageOff size={28} />
                    <span>Image unavailable</span>
                  </div>
                )}
                <img
                  src={imgUrl || ''}
                  alt=""
                  className="sr-only"
                  onError={() => handleImageError(p.id, 0)}
                />
                <div className={`season-badge ${p.status}`}>
                  {p.status === 'optimal' && <Sun size={14}/>}
                  {p.status === 'good' && <CloudSnow size={14}/>}
                  {p.status === 'warning' && <CloudRain size={14}/>}
                  {p.season}
                </div>
                <div className="place-rating"><Star size={12}/> {p.rating}</div>
              </div>
              <div className="place-body">
                <h3>{p.name}</h3>
                <p className="place-desc">{p.desc}</p>
                <div className="place-tags">
                  {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                </div>
              </div>
              <button className="place-peek" id={`peek-${p.id}`}><Eye size={14}/> Quick View</button>
            </div>
          );
        })}
      </div>

      {/* TC14: Place details modal with TC12 gallery */}
      {selectedPlace && (
        <div className="place-modal-overlay" onClick={() => setSelectedPlace(null)} id="place-modal-overlay">
          <div className="place-modal glass-panel" onClick={e => e.stopPropagation()} id="place-modal">
            <button className="modal-close" onClick={() => setSelectedPlace(null)} id="modal-close-btn"><X size={20}/></button>

            {/* TC12: Gallery with swipe/navigation */}
            <div className="modal-gallery">
              <div
                className="modal-img"
                style={
                  getImageUrl(selectedPlace, galleryIndex)
                    ? { backgroundImage: `url(${getImageUrl(selectedPlace, galleryIndex)})` }
                    : {}
                }
              >
                {/* TC13: Fallback in modal */}
                {!getImageUrl(selectedPlace, galleryIndex) && (
                  <div className="img-placeholder modal-placeholder">
                    <ImageOff size={36} />
                    <span>Image could not be loaded</span>
                  </div>
                )}
              </div>

              {/* TC12: Gallery navigation arrows */}
              {selectedPlace.images.length > 1 && (
                <>
                  <button className="gallery-nav prev" onClick={prevImage} id="gallery-prev">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="gallery-nav next" onClick={nextImage} id="gallery-next">
                    <ChevronRight size={20} />
                  </button>
                  <div className="gallery-dots">
                    {selectedPlace.images.map((_, idx) => (
                      <span key={idx} className={`gallery-dot ${idx === galleryIndex ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* TC14: Detailed place information */}
            <div className="modal-body">
              <h2>{selectedPlace.name}</h2>
              <div className={`season-badge ${selectedPlace.status}`}>
                {selectedPlace.season}
              </div>
              <p>{selectedPlace.desc}</p>
              <div className="modal-detail-grid">
                <div className="modal-detail-item">
                  <Star size={16}/> <strong>{selectedPlace.rating}</strong> Rating
                </div>
                <div className="modal-detail-item">
                  <Calendar size={16}/> Best: <strong>{selectedPlace.bestMonths}</strong>
                </div>
                <div className="modal-detail-item">
                  <MapPin size={16}/> <strong>{selectedPlace.distance}</strong>
                </div>
                <div className="modal-detail-item">
                  🎫 Entry: <strong>{selectedPlace.entryFee}</strong>
                </div>
              </div>
              <div className="modal-tags">
                {selectedPlace.tags.map(t => <span key={t} className="ptag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestPlaces;
