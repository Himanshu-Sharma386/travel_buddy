# TravelBuddy Backend - Function Test Report

## Test Date: 2026-05-12
## Status: READY FOR TESTING

---

## 📋 Functions to Test

### Group 1: New Indian Tourist Places API ⭐ NEW
- [ ] `GET /destinations/india` - Returns all 25+ Indian destinations
- [ ] `GET /destinations` - Returns all destinations from database

### Group 2: Existing Travel Functions
- [ ] `POST /generate-trip` - Generate trip itinerary with budget
- [ ] `GET /places` - Search places by city
- [ ] `GET /route` - Get route information between two cities
- [ ] `GET /weather` - Get weather information for a city

### Group 3: User Management Functions
- [ ] User registration
- [ ] Trip saving functionality
- [ ] User authentication flow

---

## 🚀 Step 1: Build the Project

### Command:
```powershell
cd "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
.\mvnw.cmd clean package -DskipTests
```

### Expected Output:
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXs
[INFO] Finished at: YYYY-MM-DDTHH:MM:SS
```

### Test Result:
- [ ] Build completes without errors
- [ ] No compilation warnings
- [ ] JAR file created in `target/` folder

---

## 🔧 Step 2: Start the Server

### Command:
```powershell
cd "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
.\mvnw.cmd spring-boot:run
```

### Expected Output:
```
Started TravelBuddyApplication in X.XXX seconds
```

### Server Information:
- **URL**: http://localhost:8080
- **Port**: 8080
- **Default Database**: H2 (in-memory)

### Test Result:
- [ ] Server starts without errors
- [ ] Application initialization completes
- [ ] Console shows "Started TravelBuddyApplication"

---

## 📝 Step 3: Test All API Endpoints

### Test 1: Indian Destinations API ⭐ NEW
**Endpoint**: `GET /destinations/india`

**Command (PowerShell)**:
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/destinations/india" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
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
    ...
  ]
}
```

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] Count equals 25
- [ ] Country field = "India"
- [ ] All 25 destinations present
- [ ] Each destination has required fields: id, name, category, rating, bestTime, imageUrl, latitude, longitude, description
- [ ] Ratings between 4.0 and 5.0
- [ ] Image URLs are valid Unsplash links
- [ ] Coordinates are valid numbers

**Test Result**: ✅ Pass / ❌ Fail

---

### Test 2: All Destinations API ⭐ NEW
**Endpoint**: `GET /destinations`

**Command (PowerShell)**:
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/destinations" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Expected Response**:
```json
{
  "count": 25,
  "destinations": [
    // ... all 25 destinations
  ]
}
```

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] Count field present
- [ ] Destinations array returned
- [ ] Count matches array length
- [ ] All required fields present in each destination

**Test Result**: ✅ Pass / ❌ Fail

---

### Test 3: Search Places by City
**Endpoint**: `GET /places?city=Taj`

**Command (PowerShell)**:
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/places?city=Taj" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "Taj Mahal, Agra",
    "category": "Heritage",
    "rating": 4.9,
    "bestTime": "Oct - Mar",
    "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    "latitude": 27.1751,
    "longitude": 78.0421,
    "description": "..."
  }
]
```

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] Array returned (even if single item)
- [ ] Result contains "Taj" in name
- [ ] Filtering works correctly
- [ ] All fields present

**Test Cases**:
- [ ] Search "Taj" - Should return Taj Mahal
- [ ] Search "Goa" - Should return Goa Beaches
- [ ] Search "Delhi" - Should return Delhi monuments
- [ ] Search "Temple" - Should return multiple temples
- [ ] Search "InvalidCity" - Should return empty array

**Test Result**: ✅ Pass / ❌ Fail

---

### Test 4: Get Weather
**Endpoint**: `GET /weather?city=Agra`

**Command (PowerShell)**:
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/weather?city=Agra" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
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

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] City field matches request
- [ ] Temperature field present
- [ ] Condition field present
- [ ] Threats field is array (can be empty)

**Test Cases**:
- [ ] Test with different cities (Delhi, Mumbai, Bangalore)
- [ ] Verify format consistency

**Test Result**: ✅ Pass / ❌ Fail

---

### Test 5: Get Route
**Endpoint**: `GET /route?from=Delhi&to=Agra`

**Command (PowerShell)**:
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:8080/route?from=Delhi&to=Agra" -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
```

**Expected Response**:
```json
{
  "from": "Delhi",
  "to": "Agra",
  "distance": "250 km",
  "estimatedTime": "4 hours 30 mins"
}
```

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] From/To fields match request
- [ ] Distance field present
- [ ] EstimatedTime field present

**Test Cases**:
- [ ] Route Delhi to Agra
- [ ] Route Mumbai to Goa
- [ ] Route Bangalore to Ooty

**Test Result**: ✅ Pass / ❌ Fail

---

### Test 6: Generate Trip
**Endpoint**: `POST /generate-trip`

**Command (PowerShell)**:
```powershell
$body = @{
    destination = "Jaipur"
    budget = 50000
    startDate = "2024-10-15"
    endDate = "2024-10-20"
    preferences = "luxury"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8080/generate-trip" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body

$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**Expected Response**:
```json
{
  "destination": "Jaipur",
  "dates": "2024-10-15 to 2024-10-20",
  "budgetBreakdown": {
    // Budget details
  },
  "itinerary": [
    // Daily itinerary
  ],
  "safety": {
    "safetyRating": 8,
    "fraudAlerts": [...],
    "emergencyContact": "112"
  },
  "saved": true,
  "userId": 1
}
```

**Validation Checks**:
- [ ] Response status: 200 OK
- [ ] Destination field present
- [ ] Dates field in correct format
- [ ] Budget breakdown present
- [ ] Itinerary array present (with daily plans)
- [ ] Safety information included
- [ ] Trip saved successfully
- [ ] User ID assigned

**Test Cases**:
- [ ] Basic trip: Budget 50000, 5 days
- [ ] Budget trip: Budget 20000, 3 days
- [ ] Luxury trip: Budget 100000, 7 days
- [ ] Different preferences (adventure, spiritual, family)

**Test Result**: ✅ Pass / ❌ Fail

---

## 📊 Database Verification

### Access H2 Console:
1. **URL**: http://localhost:8080/h2-console
2. **JDBC URL**: `jdbc:h2:mem:testdb`
3. **User**: `sa`
4. **Password**: (leave blank)

### SQL Queries to Verify:
```sql
-- Check total destinations
SELECT COUNT(*) as total_destinations FROM destinations;

-- Expected: 25

-- Check destinations by category
SELECT DISTINCT category, COUNT(*) as count FROM destinations GROUP BY category;

-- Expected:
-- Heritage: 8
-- Spiritual: 5
-- Leisure/Beach: 3
-- Adventure/Nature: 9+

-- Verify data integrity
SELECT * FROM destinations WHERE rating IS NULL OR imageUrl IS NULL;

-- Expected: 0 rows (no NULL values)

-- Check coordinates
SELECT name, latitude, longitude FROM destinations WHERE latitude IS NULL OR longitude IS NULL;

-- Expected: 0 rows
```

**Test Result**: ✅ Pass / ❌ Fail

---

## 🧪 Performance Tests

### Response Time Tests:
- [ ] `/destinations/india` - Should respond in < 100ms
- [ ] `/destinations` - Should respond in < 100ms
- [ ] `/places?city=X` - Should respond in < 50ms
- [ ] `/generate-trip` - Should respond in < 500ms

### Load Test (Optional):
- [ ] Test with 10 concurrent requests
- [ ] Test with 50 concurrent requests
- [ ] Monitor memory usage

**Test Result**: ✅ Pass / ❌ Fail

---

## 🔒 Security Tests

- [ ] CORS enabled (should accept requests from any origin)
- [ ] No sensitive data in response headers
- [ ] No stack traces in error responses
- [ ] Input validation on all endpoints

**Test Result**: ✅ Pass / ❌ Fail

---

## ✅ Final Checklist

### Backend Build & Start
- [ ] Maven build succeeds
- [ ] Spring Boot server starts without errors
- [ ] Database initializes successfully with 25 destinations
- [ ] No exceptions in startup logs

### API Endpoints Working
- [ ] GET /destinations/india returns 25 destinations
- [ ] GET /destinations returns all destinations
- [ ] GET /places?city=X filters correctly
- [ ] GET /weather?city=X returns data
- [ ] GET /route?from=X&to=Y returns data
- [ ] POST /generate-trip creates trip plan

### Data Integrity
- [ ] All 25 destinations loaded in database
- [ ] No missing or NULL values
- [ ] Valid coordinates for all destinations
- [ ] Valid image URLs
- [ ] Ratings are proper values (4.0-5.0)

### Response Format
- [ ] JSON responses are valid
- [ ] All required fields present
- [ ] Data types are correct
- [ ] Status codes correct (200 for success)

---

## 🎯 Summary

| Category | Status | Notes |
|----------|--------|-------|
| Build | ⬜ Pending | |
| Server Start | ⬜ Pending | |
| Indian Destinations API | ⬜ Pending | NEW |
| All Destinations API | ⬜ Pending | NEW |
| Place Search | ⬜ Pending | EXISTING |
| Weather API | ⬜ Pending | EXISTING |
| Route API | ⬜ Pending | EXISTING |
| Trip Generation | ⬜ Pending | EXISTING |
| Database | ⬜ Pending | |
| Performance | ⬜ Pending | |
| Security | ⬜ Pending | |

---

## 📞 Troubleshooting

### Build Fails
```powershell
# Clean and rebuild
.\mvnw.cmd clean install

# Check Java version
java -version  # Should show Java 17+
```

### Server Won't Start
```powershell
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Kill process if needed
taskkill /PID <PID> /F
```

### API Returns Errors
1. Check server console for error messages
2. Verify request format (method, URL, headers)
3. Check database is initialized

---

## 📖 Documentation References
- API Documentation: `INDIAN_TOURIST_PLACES_API.md`
- Testing Guide: `TESTING_GUIDE.md`
- Project Status: `PROJECT_STATUS.md`

---

**Generated**: 2026-05-12 13:45:00
**Test Report Status**: Ready for execution
