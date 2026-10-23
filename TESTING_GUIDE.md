# TravelBuddy Project - Testing Guide

## Quick Start

### Step 1: Build the Project
```bash
cd backend
mvnw clean package -DskipTests
```

Or use the included batch script:
```bash
cd backend
run-project.bat
```

This will:
1. ✅ Clean previous builds
2. ✅ Compile all Java code
3. ✅ Run unit tests
4. ✅ Package the application
5. ✅ Start the Spring Boot server

The server will start on `http://localhost:8080`

---

## Testing All API Endpoints

### Option A: Using the Test Script (Windows)
```bash
cd backend
test-api.bat
```

This automatically tests all endpoints.

### Option B: Manual Testing with cURL

#### 1. Test Indian Destinations Endpoint ⭐ NEW
```bash
curl -X GET "http://localhost:8080/destinations/india" \
  -H "Content-Type: application/json"
```

**Expected Response**:
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
      "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      "latitude": 27.1751,
      "longitude": 78.0421,
      "description": "An ivory-white marble mausoleum..."
    },
    // ... 24 more destinations
  ]
}
```

#### 2. Test All Destinations Endpoint ⭐ NEW
```bash
curl -X GET "http://localhost:8080/destinations" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "count": 25,
  "destinations": [
    // ... 25 destination objects
  ]
}
```

#### 3. Search Places by City (Existing)
```bash
curl -X GET "http://localhost:8080/places?city=Taj" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "Taj Mahal, Agra",
    "category": "Heritage",
    // ... other fields
  }
]
```

#### 4. Get Weather (Existing)
```bash
curl -X GET "http://localhost:8080/weather?city=Agra" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "city": "Agra",
  "temperature": "26°C",
  "condition": "Partly Cloudy",
  "threats": []
}
```

#### 5. Generate Trip (Existing)
```bash
curl -X POST "http://localhost:8080/generate-trip" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Jaipur",
    "budget": 50000,
    "startDate": "2024-10-15",
    "endDate": "2024-10-20",
    "preferences": "luxury"
  }'
```

---

## Testing with Postman

### 1. Import Collection
- Open Postman
- Click **Import**
- Create requests for each endpoint:

### 2. Create New Request for Indian Destinations
- **Method**: GET
- **URL**: `http://localhost:8080/destinations/india`
- **Headers**: 
  - `Content-Type: application/json`
- **Click Send**

### 3. Create New Request for All Destinations
- **Method**: GET
- **URL**: `http://localhost:8080/destinations`
- **Headers**: 
  - `Content-Type: application/json`
- **Click Send**

---

## Testing with Browser

Simply open these URLs in your browser (returns JSON):

1. **All Indian Destinations**:
   ```
   http://localhost:8080/destinations/india
   ```

2. **All Destinations**:
   ```
   http://localhost:8080/destinations
   ```

3. **Search by City**:
   ```
   http://localhost:8080/places?city=Goa
   ```

4. **Weather**:
   ```
   http://localhost:8080/weather?city=Delhi
   ```

---

## Testing with Frontend (React)

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Start Frontend Development Server
```bash
npm run dev
```

### Step 3: Test in React Component

The frontend can now fetch from the backend:

```javascript
// In your React component
import { useEffect, useState } from 'react';

export function DestinationsList() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/destinations/india')
      .then(res => res.json())
      .then(data => {
        console.log(`Loaded ${data.count} destinations`);
        setDestinations(data.destinations);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h1>Indian Tourist Places ({destinations.length})</h1>
      {destinations.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <img src={place.imageUrl} alt={place.name} width="200" />
          <p>Rating: {place.rating}⭐</p>
          <p>Best time: {place.bestTime}</p>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Full Testing Checklist

### Backend Tests
- ✅ Build completes without errors
- ✅ Server starts on port 8080
- ✅ `/destinations/india` returns 25+ destinations
- ✅ `/destinations` returns all destinations
- ✅ Each destination has: id, name, category, rating, imageUrl, latitude, longitude, description
- ✅ `/places?city=Taj` filters correctly
- ✅ `/weather?city=Agra` returns weather data
- ✅ `/generate-trip` accepts POST and returns trip plan

### Frontend Tests
- ✅ Frontend connects to backend API
- ✅ Destinations load and display correctly
- ✅ Images load properly from Unsplash
- ✅ Filtering by city works
- ✅ Map integration shows correct coordinates

### Data Validation
- ✅ All 25 destinations have valid data
- ✅ Coordinates are correct (for mapping)
- ✅ Image URLs are accessible
- ✅ Descriptions are meaningful
- ✅ Ratings are 4.5 or higher

---

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
mvnw clean install

# Check Java version (should be 17+)
java -version

# Check Maven version
mvnw --version
```

### Server Won't Start
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Kill the process if needed
taskkill /PID <PID> /F
```

### API Returns Empty Data
- Verify database is initialized
- Check that DataInitializer ran successfully (check logs)
- Ensure H2 database is being used (default configuration)

### CORS Issues in Frontend
- Backend already has `@CrossOrigin(origins = "*")`
- If issues persist, check browser console for specific error

---

## Database Verification

The destinations are automatically seeded on first startup.

To verify data in H2 database:
1. Access H2 Console: `http://localhost:8080/h2-console`
2. Connect with:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **User**: `sa`
   - **Password**: (leave empty)
3. Run SQL:
   ```sql
   SELECT * FROM destinations;
   SELECT COUNT(*) FROM destinations;
   SELECT DISTINCT category FROM destinations;
   ```

---

## Performance Notes

- First request may be slightly slower (database initialization)
- Subsequent requests are cached in memory
- Image loading from Unsplash depends on internet connection
- All data is stored in H2 in-memory database (resets on restart)

---

## Next Steps

1. ✅ Backend API working
2. 🔄 Integrate API into React frontend
3. 🔄 Add map visualization with Leaflet
4. 🔄 Add filtering by category, rating, best season
5. 🔄 Add destination details page
6. 🔄 Add user reviews/ratings

---

## Support

For issues or questions:
1. Check `INDIAN_TOURIST_PLACES_API.md` for API documentation
2. Check this testing guide
3. Review backend logs in console output
