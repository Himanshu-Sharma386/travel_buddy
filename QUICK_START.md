# 🚀 Quick Start - Test All Functions

## Step 1: Build the Project (2-3 minutes)

Open PowerShell and run:

```powershell
cd "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
.\mvnw.cmd clean package -DskipTests
```

**What to look for:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXs
```

**If you see BUILD SUCCESS → Continue to Step 2** ✅

---

## Step 2: Start the Backend Server

In a **NEW PowerShell window**, run:

```powershell
cd "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
.\mvnw.cmd spring-boot:run
```

**What to look for:**
```
Started TravelBuddyApplication in X.XXX seconds
```

**Keep this window open!** The server will run on `http://localhost:8080`

---

## Step 3: Test All Functions (Choose One Option)

### Option A: Automated Test (Recommended)

In a **THIRD PowerShell window**, run:

```powershell
cd "c:\Users\Asus\OneDrive\Documents\Desktop\TravelBuddy\backend"
.\test-all-functions.bat
```

This will automatically test all 7 functions and show results.

### Option B: Manual Testing

Test each endpoint individually:

#### 1️⃣ Test Indian Destinations (NEW)
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/destinations/india" -Method Get | ConvertTo-Json
```

#### 2️⃣ Test All Destinations (NEW)
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/destinations" -Method Get | ConvertTo-Json
```

#### 3️⃣ Test Search Places
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/places?city=Taj" -Method Get | ConvertTo-Json
```

#### 4️⃣ Test Weather
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/weather?city=Agra" -Method Get | ConvertTo-Json
```

#### 5️⃣ Test Route
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/route?from=Delhi&to=Agra" -Method Get | ConvertTo-Json
```

#### 6️⃣ Test Trip Generation
```powershell
$body = @{
    destination = "Jaipur"
    budget = 50000
    startDate = "2024-10-15"
    endDate = "2024-10-20"
    preferences = "luxury"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/generate-trip" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body | ConvertTo-Json -Depth 5
```

### Option C: Browser Testing

Simply open these URLs in your browser:

1. **Indian Destinations**: http://localhost:8080/destinations/india
2. **All Destinations**: http://localhost:8080/destinations
3. **Search**: http://localhost:8080/places?city=Taj
4. **Weather**: http://localhost:8080/weather?city=Delhi
5. **Route**: http://localhost:8080/route?from=Delhi&to=Agra

(Browser doesn't support POST, so use PowerShell for trip generation)

---

## ✅ Expected Results

### ✅ Indian Destinations (NEW)
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
      "description": "..."
    },
    // ... 24 more
  ]
}
```

### ✅ All Destinations (NEW)
```json
{
  "count": 25,
  "destinations": [...]
}
```

### ✅ Search Places
```json
[
  {
    "id": 1,
    "name": "Taj Mahal, Agra",
    "category": "Heritage",
    "rating": 4.9,
    ...
  }
]
```

### ✅ Weather
```json
{
  "city": "Agra",
  "temperature": "26°C",
  "condition": "Partly Cloudy",
  "threats": []
}
```

### ✅ Route
```json
{
  "from": "Delhi",
  "to": "Agra",
  "distance": "250 km",
  "estimatedTime": "4 hours 30 mins"
}
```

### ✅ Trip Generation
```json
{
  "destination": "Jaipur",
  "dates": "2024-10-15 to 2024-10-20",
  "budgetBreakdown": {...},
  "itinerary": [...],
  "safety": {...},
  "saved": true,
  "userId": 1
}
```

---

## 🎯 What Gets Tested

| Function | Type | Status |
|----------|------|--------|
| Get Indian Destinations | GET | ⭐ NEW |
| Get All Destinations | GET | ⭐ NEW |
| Search Places by City | GET | ✅ Existing |
| Get Weather | GET | ✅ Existing |
| Get Route Info | GET | ✅ Existing |
| Generate Trip Plan | POST | ✅ Existing |
| Database Initialization | AUTO | ✅ 25 destinations |

---

## 🔍 Verification Checklist

After running tests, verify:

- ✅ All 25 Indian destinations are loaded
- ✅ Each destination has: name, category, rating, image URL, coordinates, description
- ✅ Image URLs are from Unsplash
- ✅ Coordinates are valid numbers for mapping
- ✅ Search filters results correctly
- ✅ Weather data is returned for any city
- ✅ Route data shows distance and time
- ✅ Trip generation creates itinerary and budget breakdown
- ✅ Database persists data during runtime

---

## 📊 Test Files Created

| File | Purpose |
|------|---------|
| `FUNCTION_TEST_REPORT.md` | Detailed test checklist |
| `test-all-functions.bat` | Automated test script |
| `TESTING_GUIDE.md` | Comprehensive testing guide |
| `INDIAN_TOURIST_PLACES_API.md` | API documentation |
| `PROJECT_STATUS.md` | Implementation status |

---

## 🆘 Troubleshooting

### Build Fails
```powershell
.\mvnw.cmd clean install
java -version  # Check Java version (should be 17+)
```

### Server Won't Start
```powershell
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

### Test Returns Errors
1. Verify server is running (check Step 2 window)
2. Wait a few seconds for database to initialize
3. Verify URL is correct
4. Check server console for error messages

### API Returns Empty Data
- Make sure server has fully started
- Check that DataInitializer ran (should see in logs)
- Try accessing `/destinations` in browser first

---

## 📞 Need Help?

Check these files for detailed information:
- **API Docs**: `INDIAN_TOURIST_PLACES_API.md`
- **Testing Guide**: `TESTING_GUIDE.md`
- **Status**: `PROJECT_STATUS.md`
- **Detailed Tests**: `FUNCTION_TEST_REPORT.md`

---

## 🎉 Success Indicators

✅ **BUILD**: No compilation errors
✅ **START**: "Started TravelBuddyApplication" in console
✅ **TEST**: All 7 functions return HTTP 200 with valid data
✅ **DATA**: 25 destinations loaded in database
✅ **API**: JSON responses are properly formatted

**Once you see all these, your backend is fully functional!** 🚀
