# Indian Tourist Places API - Implementation Guide

## Overview
A new REST API endpoint has been added to the TravelBuddy backend to retrieve all major Indian tourist destinations with images, descriptions, ratings, and GPS coordinates.

## Implementation Summary

### What Was Added

#### 1. **Expanded Database Seeding** 
- **File**: `backend/src/main/java/com/travelbuddy/backend/util/DataInitializer.java`
- **Changes**: Increased from 10 to 25+ famous Indian tourist destinations
- **Categories Included**:
  - **Heritage Sites**: Taj Mahal, Red Fort, Qutub Minar, Khajuraho Temples, etc.
  - **Spiritual Places**: Varanasi Ghats, Golden Temple, Meenakshi Temple, Vaishno Devi, etc.
  - **Beaches**: Goa Beaches, Kanyakumari, Andaman & Nicobar Islands
  - **Nature & Adventure**: Kerala Backwaters, Ladakh, Rishikesh, Munnar, Darjeeling, etc.
  - **Wildlife**: Jim Corbett National Park, Kaziranga National Park

#### 2. **New API Endpoints**
- **File**: `backend/src/main/java/com/travelbuddy/backend/controller/TravelController.java`
- **Endpoints Added**:

```
GET /destinations
- Returns all destinations in the database
- Response includes count and list of all destinations

GET /destinations/india
- Returns all Indian tourist destinations
- Response includes country label and list of destinations
```

#### 3. **Service Layer Enhancement**
- **File**: `backend/src/main/java/com/travelbuddy/backend/service/TravelService.java`
- **New Method**: `getAllDestinations()` - Retrieves all destinations from the repository

### Data Structure

Each destination includes:
```json
{
  "id": 1,
  "name": "Taj Mahal, Agra",
  "category": "Heritage",
  "rating": 4.9,
  "bestTime": "Oct - Mar",
  "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523",
  "latitude": 27.1751,
  "longitude": 78.0421,
  "description": "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India."
}
```

### Response Format

#### GET /destinations/india
```json
{
  "count": 25,
  "country": "India",
  "destinations": [
    {
      "id": 1,
      "name": "Taj Mahal, Agra",
      "category": "Heritage",
      "rating": 4.9,
      "bestTime": "Oct - Mar",
      "imageUrl": "https://images.unsplash.com/...",
      "latitude": 27.1751,
      "longitude": 78.0421,
      "description": "..."
    },
    ...
  ]
}
```

## List of 25+ Indian Tourist Destinations

### Heritage & Monuments (8)
1. Taj Mahal, Agra ⭐ 4.9
2. Jaipur - The Pink City ⭐ 4.7
3. Mysore Palace ⭐ 4.7
4. Hawa Mahal, Jaipur ⭐ 4.6
5. Qutub Minar, Delhi ⭐ 4.8
6. India Gate, Delhi ⭐ 4.5
7. Red Fort, Delhi ⭐ 4.6
8. Khajuraho Temples ⭐ 4.7

### Spiritual Sites (5)
1. Varanasi Ghats ⭐ 4.8
2. Golden Temple, Amritsar ⭐ 4.9
3. Meenakshi Temple, Madurai ⭐ 4.7
4. Vaishno Devi Temple, Katra ⭐ 4.8
5. Rameshwaram Temple ⭐ 4.6

### Beaches & Coastal (3)
1. Goa Beaches ⭐ 4.6
2. Kanyakumari Beach ⭐ 4.5
3. Andaman & Nicobar Islands ⭐ 4.8

### Nature & Adventure (9)
1. Kerala Backwaters ⭐ 4.8
2. Ladakh - Leh ⭐ 4.9
3. Rishikesh ⭐ 4.7
4. Munnar Tea Gardens ⭐ 4.8
5. Darjeeling ⭐ 4.7
6. Shimla ⭐ 4.6
7. Manali ⭐ 4.7
8. Ooty - Nilgiris ⭐ 4.6
9. Jim Corbett National Park ⭐ 4.7
10. Kaziranga National Park ⭐ 4.8

## How to Use

### 1. **Retrieve All Indian Destinations**
```bash
curl -X GET "http://localhost:8080/destinations/india"
```

### 2. **Retrieve All Destinations**
```bash
curl -X GET "http://localhost:8080/destinations"
```

### 3. **In Frontend (React/JavaScript)**
```javascript
fetch('http://localhost:8080/destinations/india')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.count} destinations`);
    data.destinations.forEach(place => {
      console.log(`${place.name} (${place.category}) - Rating: ${place.rating}`);
      console.log(`Best time to visit: ${place.bestTime}`);
      console.log(`Image: ${place.imageUrl}`);
    });
  });
```

## Image Sources

All images are sourced from **Unsplash** - a free stock photo service with high-quality tourist destination images. Each destination includes a direct link to its image with proper attribution.

Example image URLs:
- Taj Mahal: `https://images.unsplash.com/photo-1564507592333-c60657eea523`
- Goa: `https://images.unsplash.com/photo-1512343879784-a960bf40e7f2`
- Kerala Backwaters: `https://images.unsplash.com/photo-1602216056096-3b40cc0c9944`

## Best Time to Visit

Each destination includes optimal travel periods:
- **Taj Mahal**: Oct - Mar (pleasant weather)
- **Ladakh**: Jun - Sep (only accessible in summer)
- **Goa**: Nov - Feb (best beach season)
- **Kerala**: Sep - Mar (monsoon and post-monsoon season)

## Files Modified

1. **DataInitializer.java** - Expanded with 25+ destinations
2. **TravelController.java** - Added 2 new endpoints
3. **TravelService.java** - Added getAllDestinations() method

## Testing the API

### Using cURL:
```bash
# Get all Indian destinations
curl -X GET "http://localhost:8080/destinations/india" \
  -H "Content-Type: application/json"

# Get all destinations
curl -X GET "http://localhost:8080/destinations" \
  -H "Content-Type: application/json"
```

### Using Postman:
1. Create a new GET request
2. Enter URL: `http://localhost:8080/destinations/india`
3. Send the request
4. View the JSON response with all 25+ destinations

## Integration with Frontend

To display these destinations in the React frontend:

```javascript
import { useEffect, useState } from 'react';

export function IndianDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/destinations/india')
      .then(res => res.json())
      .then(data => {
        setDestinations(data.destinations);
        setLoading(false);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  if (loading) return <div>Loading destinations...</div>;

  return (
    <div className="destinations-grid">
      {destinations.map(place => (
        <div key={place.id} className="destination-card">
          <img src={place.imageUrl} alt={place.name} />
          <h3>{place.name}</h3>
          <p>{place.category}</p>
          <p>Rating: {place.rating} ⭐</p>
          <p>Best time: {place.bestTime}</p>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Future Enhancements

- Add filtering by category or rating
- Add pagination for large result sets
- Integrate real-time weather data from OpenWeatherMap API
- Add hotel recommendations for each destination
- Add user ratings and reviews
- Implement distance-based sorting
- Add multilingual descriptions

## Notes

- All image URLs are from Unsplash and are freely available for use
- Latitude/Longitude coordinates can be used for map integration (Leaflet, Google Maps)
- The database automatically seeds these destinations on the first application startup
- Existing destinations won't be duplicated on subsequent restarts
