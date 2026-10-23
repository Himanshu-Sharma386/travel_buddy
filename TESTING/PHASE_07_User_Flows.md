# PHASE 7: User Flow Testing (Critical - Very Important)

**Objective:** Validate complete end-to-end user flows critical to app functionality. These flows must work perfectly for college project submission.

---

## Test Case 7.1: Registration → Trip Generation → Save Trip → Logout/Login → Trip Persists

**TC-7.1 ⭐ CRITICAL**  
**Title:** Full User Journey - Register Account, Plan Trip, Save Trip, Persist After Logout/Login  
**Prerequisites:** App is running, fresh install or cleared database (optional)

**Steps:**

### Part 1: User Registration
1. Navigate to Landing Page
2. Click "Sign Up" or "Register" button
3. Fill registration form:
   - Name: "Sarah Johnson"
   - Email: "sarah.journey@example.com"
   - Password: "TravelPass2026!"
   - Confirm Password: "TravelPass2026!"
4. Click "Submit" / "Create Account"
   - Expected: Account created, success message displayed [ ] Yes [ ] No
   - Message: "________________________"
   - User auto-logged in? [ ] Yes [ ] No

### Part 2: Trip Planning & Generation
5. Navigate to trip planning form (may auto-appear after registration):
   - Destination: "Paris, France"
   - Start Date: May 1, 2026
   - End Date: May 7, 2026
   - Budget Level: "Mid-range ($1500–$2500)"
   - Preferences: Select "Heritage" + "Chill"
6. Click "Generate Itinerary" or "Plan Trip"
   - Expected: LoadingScreen appears with spinner [ ] Yes [ ] No
   - Spinner visible throughout generation [ ] Yes [ ] No
   - Duration: _____ seconds (should be <10 seconds)
7. Once itinerary generated:
   - Trip Dashboard loads [ ] Yes [ ] No
   - Overview tab shows trip summary [ ] Yes [ ] No

### Part 3: View Generated Trip Details
8. Navigate to each tab and verify content:
   - **Overview Tab:**
     - Trip title: "Paris, May 1–7, 2026" [ ] Yes [ ] No
     - Budget selected: "Mid-range" [ ] Yes [ ] No
     - Total trip cost visible [ ] Yes [ ] No
   
   - **Budget Tab (Budget Planner):**
     - 3 tiers displayed: Budget / Mid-range / Comfort [ ] Yes [ ] No
     - Mid-range selected (highlighted) [ ] Yes [ ] No
     - Cost breakdown visible:
       - Accommodation: $_____ [ ] Yes [ ] No
       - Transport: $_____ [ ] Yes [ ] No
       - Food: $_____ [ ] Yes [ ] No
       - Activities: $_____ [ ] Yes [ ] No
       - Total: $_____ [ ] Yes [ ] No
     - Costs are reasonable [ ] Yes [ ] No
   
   - **Schedule Tab (Time Management):**
     - 6-day itinerary displayed (Day 1–6) [ ] Yes [ ] No
     - Each day shows:
       - Date (May 1, May 2, etc.) [ ] Yes [ ] No
       - Activities with times (9am, 12pm, 3pm, 6pm, etc.) [ ] Yes [ ] No
       - Activity names (e.g., "Eiffel Tower", "Louvre", "Seine Cruise") [ ] Yes [ ] No
       - Estimated durations [ ] Yes [ ] No
     - Timeline is logical (no 24-hour+ activities, no overlaps) [ ] Yes [ ] No
   
   - **Safety Tab (Safety Dashboard):**
     - Destination safety rating: ___/5 stars [ ] Visible [ ] Missing
     - Safety alerts for Paris:
       - Type: "________________________" (e.g., "Permit Scams")
       - Description: "________________________" [ ] Visible
     - Emergency contacts (Police, Hospital, Embassy) [ ] Visible
     - Contact phone numbers present [ ] Yes [ ] No
     - Weather alert (if applicable) [ ] Visible [ ] N/A

### Part 4: Save Trip to User Account
9. Click "Save Trip" button (on dashboard)
   - Expected: Success message displayed [ ] Yes [ ] No
   - Message text: "________________________"
   - Toast/notification style: [ ] Green toast [ ] Modal [ ] Alert [ ] Other: _____
   - Duration visible: _____ seconds (auto-dismiss or user-dismissed)

### Part 5: Verify Trip in My Trips / Trip History
10. Navigate to "My Trips" page (or Trip History section):
    - Recently saved trip visible in list? [ ] Yes [ ] No
    - Trip shows:
      - Destination: "Paris, France" [ ] Yes [ ] No
      - Dates: "May 1–7, 2026" [ ] Yes [ ] No
      - Budget level: "Mid-range" [ ] Yes [ ] No
      - Any other metadata [ ] Yes [ ] No
    - Can click on trip to view full details? [ ] Yes [ ] No

### Part 6: Logout
11. Click "Logout" button (in header or menu)
    - Expected: Confirmation message or direct logout [ ] Yes [ ] No
    - Redirect to Landing Page [ ] Yes [ ] No
    - User session cleared (refresh page, not logged in) [ ] Yes [ ] No

### Part 7: Login with Same Account
12. On Landing Page, click "Login"
13. Enter credentials:
    - Email: "sarah.journey@example.com"
    - Password: "TravelPass2026!"
14. Click "Login" button
    - Expected: Successfully logged in [ ] Yes [ ] No
    - Redirect to Dashboard or Trip History [ ] Yes [ ] No
    - User email visible in header [ ] Yes [ ] No

### Part 8: CRITICAL - Verify Trip Still Exists
15. Navigate to "My Trips" / Trip History
    - Previously saved "Paris" trip still visible? [ ] YES [ ] NO ⭐⭐⭐
    - Trip data intact:
      - Destination: "Paris, France" [ ] Yes [ ] No
      - Dates: "May 1–7, 2026" [ ] Yes [ ] No
      - Budget: "Mid-range" [ ] Yes [ ] No
16. Click on saved trip to view full details
    - Full itinerary loads [ ] Yes [ ] No
    - Budget breakdown intact (matches original) [ ] Yes [ ] No
    - Schedule intact (6-day itinerary with activities) [ ] Yes [ ] No
    - Safety info intact [ ] Yes [ ] No

### Part 9: Bonus - Multiple Trips
17. Generate another trip (different destination):
    - Destination: "Tokyo, Japan"
    - Dates: June 1–8, 2026
    - Budget: "Comfort"
    - Preferences: "Adventure"
18. Save this second trip
19. Verify in "My Trips":
    - Paris trip still present [ ] Yes [ ] No
    - Tokyo trip now present [ ] Yes [ ] No
    - Both trips are independent (different data) [ ] Yes [ ] No
    - Can switch between trips without confusion [ ] Yes [ ] No

**Expected Result:**
- ✅ User can register successfully
- ✅ Trip itinerary generates correctly
- ✅ All trip details visible (budget, schedule, safety)
- ✅ Trip saves to user account
- ✅ Trip persists after logout/login (DATABASE)
- ✅ No data loss or corruption
- ✅ Multiple trips can be saved independently
- ✅ User can always access their trip history

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS ✅  [ ] FAIL ✗  [ ] BLOCKED

**Critical Success Checkpoints:**
- [ ] Account created successfully
- [ ] Itinerary generated successfully
- [ ] Trip saved successfully
- [ ] Trip visible after logout/login ⭐⭐⭐
- [ ] No data loss
- [ ] Multiple trips work

**Issues Found:**
- _________________ (Severity: [ ] Critical [ ] Major [ ] Minor)
- _________________ (Severity: [ ] Critical [ ] Major [ ] Minor)

**Trip Details Recorded:**
- Trip 1: Destination = "Paris", Dates = "May 1–7", Budget = "Mid-range", Activities = _____ count
- Trip 2: Destination = "Tokyo", Dates = "June 1–8", Budget = "Comfort", Activities = _____ count

**Screenshot:** [Registration success, Loading screen, Dashboard all tabs, Save confirmation, My Trips list, Post-logout-login trip recovery]

**Notes:** _________________________________

---

## Test Case 7.2: Budget Planner - Compare 3 Tiers and Select

**TC-7.2**  
**Title:** Budget Tiers Display Correctly and Selection Changes Itinerary  
**Prerequisites:** User logged in, trip generated on dashboard

**Steps:**
1. Navigate to Trip Dashboard → Budget tab
2. Verify all 3 budget tiers visible:
   - Budget tier [ ] Visible [ ] Missing
   - Mid-range tier [ ] Visible [ ] Missing
   - Comfort tier [ ] Visible [ ] Missing
3. Check Budget tier card:
   - Title: "Budget" [ ] Yes [ ] No
   - Description: "________________________" (e.g., "Economy trips")
   - Daily cost: $_____ (should be ~$500–$800/day)
   - Cost breakdown:
     - Accommodation: $_____ [ ] Yes [ ] No
     - Transport: $_____ [ ] Yes [ ] No
     - Food: $_____ [ ] Yes [ ] No
     - Activities: $_____ [ ] Yes [ ] No
   - Total cost shown: $_____ [ ] Yes [ ] No
   - "Select" button available [ ] Yes [ ] No
4. Check Mid-range tier card (similar details):
   - Daily cost: $_____ (should be ~$1200–$1500/day)
   - Total: $_____ [ ] Yes [ ] No
5. Check Comfort tier card:
   - Daily cost: $_____ (should be $2000+/day)
   - Total: $_____ [ ] Yes [ ] No
6. Verify costs are proportional:
   - Budget < Mid-range < Comfort [ ] Yes [ ] No
   - Budget is ~40–50% of Comfort [ ] Yes [ ] No
   - Difference seems reasonable [ ] Yes [ ] No
7. Test tier selection:
   - Current selection: Mid-range (highlighted) [ ] Yes [ ] No
   - Click "Select Budget" button on Budget tier
     - Budget tier highlights [ ] Yes [ ] No
     - Other tiers dim/unhighlight [ ] Yes [ ] No
   - Check if itinerary changes:
     - Navigate to Schedule tab
     - Activities change to budget-friendly options [ ] Yes [ ] No (check activity names)
     - Duration still 6 days [ ] Yes [ ] No
   - Navigate back to Budget tab:
     - Budget still shows as selected [ ] Yes [ ] No
8. Repeat for other tiers:
   - Select "Mid-range" → Mid-range highlights [ ] Yes [ ] No
   - Select "Comfort" → Comfort highlights [ ] Yes [ ] No
9. Verify cost calculations:
   - Budget tier: Total ÷ Days = Daily cost (accurate?) [ ] Yes [ ] No
   - Example: $3500 ÷ 7 days = $500/day [ ] Correct [ ] Wrong
   - All tier totals calculated correctly [ ] Yes [ ] No

**Expected Result:**
- All 3 tiers display with cost breakdown
- Tiers are visually distinguishable (different colors/styles)
- Costs are proportional (Budget < Mid < Comfort)
- Selection changes highlighted tier
- Itinerary updates when tier changes (activities adapt)
- Total costs are reasonable and accurate
- Cost breakdown adds up correctly

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Budget Tier Audit:**
| Tier | Daily Cost | Total Cost | Status |
|------|-----------|-----------|--------|
| Budget | $_____ | $_____ | ✓/✗ |
| Mid-range | $_____ | $_____ | ✓/✗ |
| Comfort | $_____ | $_____ | ✓/✗ |

**Cost Accuracy Check:**
- Budget: Total ÷ 7 = $_____/day (correct?) ✓/✗
- Mid-range: Total ÷ 7 = $_____/day ✓/✗
- Comfort: Total ÷ 7 = $_____/day ✓/✗

**Issues Found:**
- [ ] Costs not proportional
- [ ] Tier selection doesn't update itinerary
- [ ] Cost breakdown doesn't add up
- [ ] Other: _______________________

**Screenshot:** [All 3 budget tiers side-by-side, Budget tier selected with highlight, Tier cost breakdown, Schedule changed after tier switch]

**Notes:** _________________________________

---

## Test Case 7.3: Safety Dashboard - View Alerts and Emergency Info

**TC-7.3**  
**Title:** Safety Dashboard Displays Destination Safety Rating, Fraud Alerts, and Emergency Contacts  
**Prerequisites:** User logged in, trip to Paris (or similar) generated

**Steps:**
1. Navigate to Trip Dashboard → Safety tab
2. Verify Safety Dashboard displays:
   - **Destination Safety Rating:**
     - Stars visible: ___/5 [ ] Yes [ ] No
     - Rating description (e.g., "Very Safe", "Moderate Risk") [ ] Yes [ ] No
     - Example: "Paris: 4.5/5 stars - Very Safe for Tourists" [ ] Match [ ] Different
   
   - **Fraud Alerts (Type-Specific for Paris):**
     - Alert 1: "Permit Scams"
       - Warning icon visible [ ] Yes [ ] No
       - Description: "________________________" (e.g., "Street vendors selling fake permits")
       - Advice: "________________________" (e.g., "Only buy from official sources")
     - Alert 2: "Overcharging at Cafes"
       - Description/advice [ ] Visible
     - Alert 3: "[Other alert relevant to destination]"
       - [ ] Visible [ ] Missing
   
   - **Emergency Contacts:**
     - Police number visible [ ] Yes [ ] No
     - Number format: "________________________" (e.g., "+33 1 XXXX XXXX" for France)
     - Hospital/Medical number [ ] Yes [ ] No
     - Embassy/Consulate [ ] Yes [ ] No
     - Emergency number explanation [ ] Yes [ ] No
3. Verify alerts are relevant to Paris (not generic):
   - Are alerts specific to Paris? [ ] Yes [ ] No
   - Would alerts differ for Tokyo? [ ] Yes [ ] No (verify by testing different destination)
4. Test click/expand on alerts (if applicable):
   - Click alert → More details appear? [ ] Yes [ ] No
   - Details include prevention tips [ ] Yes [ ] No
5. Check layout and readability:
   - All information visible without scrolling (or minimal scroll) [ ] Yes [ ] No
   - Icons are clear (warning icon for danger, etc.) [ ] Yes [ ] No
   - Text is readable (good contrast, appropriate size) [ ] Yes [ ] No

**Expected Result:**
- Safety rating clearly displayed (stars + description)
- Multiple fraud alerts visible (3+ alerts for major city)
- Alerts are destination-specific (Paris alerts differ from Tokyo)
- Emergency contacts visible with proper phone numbers
- Alert icons are recognizable (warning icon, alert icon, etc.)
- All information organized and scannable
- No information missing or cut off

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Safety Info Audit for Paris:**
- [ ] Safety Rating: ___/5 stars
- [ ] "Permit Scams" alert visible
- [ ] "Overcharging" alert visible
- [ ] Emergency contacts visible (Police: __________________)
- [ ] Content destination-specific (not generic)

**Emergency Contacts Found:**
| Contact Type | Number | Verified Correct |
|--------------|--------|------------------|
| Police | __________________ | ✓/✗ |
| Hospital | __________________ | ✓/✗ |
| Embassy | __________________ | ✓/✗ |

**Issues Found:**
- [ ] Alerts are generic, not destination-specific
- [ ] Emergency contacts missing
- [ ] Information incomplete or confusing
- [ ] Other: _______________________

**Screenshot:** [Safety Dashboard full view, Fraud alert expanded, Emergency contacts section]

**Notes:** _________________________________

---

## Test Case 7.4: Route Optimizer - Interactive Map and Cost Estimates

**TC-7.4**  
**Title:** Route Optimizer Shows Interactive Map with Optimized Routing and Transit Costs  
**Prerequisites:** User logged in, trip generated

**Steps:**
1. Navigate to Trip Dashboard → Best Places or Route Optimizer tab
2. Verify interactive map:
   - Map visible and renders [ ] Yes [ ] No
   - Map shows attractions/locations [ ] Yes [ ] No
   - Location pins/markers visible [ ] Yes [ ] No (should have 3–5 attractions marked)
3. Test map interactivity:
   - Pan (click and drag) → Map moves [ ] Yes [ ] No
   - Zoom (scroll wheel or pinch on mobile) → Map zooms [ ] Yes [ ] No
   - Click on marker → Shows location name [ ] Yes [ ] No
4. View route list:
   - Route list visible (below or beside map) [ ] Yes [ ] No
   - Shows location-to-location routing:
     - "Hotel → Eiffel Tower: 2.5 km, 20 mins by car, €5 estimated" [ ] Yes [ ] No
     - "Eiffel Tower → Louvre: 1.8 km, 15 mins walking, Free" [ ] Yes [ ] No
     - (Exact locations/costs depend on destination)
5. Verify routing details:
   - Distance shown: ✓ Yes [ ] No
   - Travel time shown: ✓ Yes [ ] No
   - Cost estimate shown: [ ] Yes [ ] No
   - Travel method indicated (walking/car/transit): [ ] Yes [ ] No
6. Test route calculations:
   - Sum all route costs:
     - Route 1: €5 + Route 2: €0 + ... = €_____ total
     - Does this match the transport budget in Budget Planner? [ ] Yes [ ] No
   - Route distances seem geographically accurate [ ] Yes [ ] No
7. Test interaction with list:
   - Click location in route list → Map centers on that location [ ] Yes [ ] No
   - Highlight appears on map [ ] Yes [ ] No
   - Location details appear [ ] Yes [ ] No

**Expected Result:**
- Interactive map renders smoothly
- Map shows all trip attractions as markers
- Map can be panned and zoomed
- Route list shows location-to-location routing
- Each route shows: distance, time, cost, travel method
- Costs sum to approximately match Budget Planner transport estimate
- Distances are geographically reasonable
- Clicking routes on list highlights map
- No bugs or broken map tiles

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Route Audit:**
| Route | Distance | Time | Cost | Method |
|-------|----------|------|------|--------|
| 1. Hotel → Eiffel Tower | ___km | ___min | €___ | Walk/Car/Transit |
| 2. Eiffel Tower → Louvre | ___km | ___min | €___ | Walk/Car/Transit |
| 3. Louvre → Place | ___km | ___min | €___ | Walk/Car/Transit |
| **TOTAL** | **___km** | **___min** | **€___** | |

**Issues Found:**
- [ ] Map not interactive
- [ ] Routes not accurate
- [ ] Costs don't match budget
- [ ] Other: _______________________

**Screenshot:** [Map with all markers, Route list details, Map interaction (pan/zoom), Location centered on map]

**Notes:** _________________________________

---

## Test Case 7.5: Time Management - Daily Itinerary Schedule

**TC-7.5**  
**Title:** Daily Itinerary Shows 6-Day Schedule with Activities, Times, and Locations  
**Prerequisites:** User logged in, trip generated (e.g., 7-day trip May 1–7)

**Steps:**
1. Navigate to Trip Dashboard → Schedule or Time Management tab
2. Verify itinerary structure:
   - 6 days shown (may be 6 out of 7 travel days) [ ] Yes [ ] No
   - Each day labeled with date (May 1, May 2, May 3, etc.) [ ] Yes [ ] No
3. Examine Day 1 (May 1):
   - Timeline shows activities with times:
     - 9:00 AM - Breakfast [ ] Yes [ ] No
     - 10:00 AM - Eiffel Tower [ ] Yes [ ] No
     - 12:00 PM - Lunch [ ] Yes [ ] No
     - 3:00 PM - Seine Cruise [ ] Yes [ ] No
     - 6:00 PM - Dinner [ ] Yes [ ] No
   - Times are reasonable (no 24-hour+ activities, no overlaps) [ ] Yes [ ] No
   - Activity names make sense for destination [ ] Yes [ ] No
4. Repeat for Days 2–6:
   - Each day has activities spread throughout day [ ] Yes [ ] No
   - No time conflicts (same time slot used twice) [ ] Yes [ ] No
   - Total hours of activities reasonable (8–10 hours per day) [ ] Yes [ ] No
5. Test activity interaction:
   - Click activity → Details appear [ ] Yes [ ] No
   - Details show:
     - Activity name [ ] Yes [ ] No
     - Time/duration [ ] Yes [ ] No
     - Location/address [ ] Yes [ ] No
     - Cost (if applicable) [ ] Yes [ ] No
     - Description/tips [ ] Yes [ ] No
   - Click to close details [ ] Yes [ ] No
6. Test edit functionality (if available):
   - Click "Edit" on activity → Edit form appears [ ] Yes [ ] No
   - Can change time [ ] Yes [ ] No
   - Can change activity [ ] Yes [ ] No
   - Save changes → Itinerary updates [ ] Yes [ ] No
7. Verify itinerary uses correct budget tier:
   - If Mid-range selected → Activities are mid-range (moderate cost) [ ] Yes [ ] No
   - If Budget selected → Activities are budget-friendly [ ] Yes [ ] No
   - If Comfort selected → Activities are premium/luxurious [ ] Yes [ ] No

**Expected Result:**
- 6-day itinerary displayed with all days and activities
- Each day has 4–6 activities scheduled throughout day
- Times are logical (no conflicts, appropriate spacing)
- Activity names are relevant to destination (Paris: Eiffel Tower, Louvre, etc.)
- Budget tier reflected in activity selection (budget vs comfort)
- Can view activity details
- Can edit activities (optional feature)
- Total itinerary is realistic and doable

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Itinerary Audit:**
| Day | Date | Activity Count | First Activity | Last Activity | Hours |
|-----|------|-----------------|-----------------|----------------|-------|
| 1 | May 1 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |
| 2 | May 2 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |
| 3 | May 3 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |
| 4 | May 4 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |
| 5 | May 5 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |
| 6 | May 6 | ___ | _______ @ ___ | _______ @ ___ | 8-10 |

**Issues Found:**
- [ ] Time conflicts (same time used twice)
- [ ] Unrealistic activities for destination
- [ ] Wrong budget tier reflected
- [ ] Other: _______________________

**Screenshot:** [Full 6-day itinerary view, Day 1 detail, Activity expanded, Mid-range vs Budget comparison]

**Notes:** _________________________________

---

## Test Case 7.6: AI Chat Assistant - Q&A on Trip Details

**TC-7.6**  
**Title:** AI Chat Responds to Questions About Trip, Safety, Budget, and Weather  
**Prerequisites:** User logged in, trip generated

**Steps:**
1. Locate AI Chat widget (usually bottom-right corner or in sidebar)
2. Test Chat interaction:
   - Click chat icon/button → Chat window opens [ ] Yes [ ] No
   - Chat shows conversation history [ ] Yes [ ] No
   - Input field for user message [ ] Yes [ ] No
3. Test Trip-Related Question:
   - Ask: "What's included in my trip?"
   - Expected response: Chatbot summarizes trip (destination, dates, budget, highlights)
   - Response received within 2 seconds? [ ] Yes [ ] No
   - Response is relevant? [ ] Yes [ ] No
4. Test Safety Question:
   - Ask: "Is Paris safe for solo travelers?"
   - Expected response: Chatbot provides safety info (safety rating, tips, alerts)
   - Response mentions safety rating from Safety Dashboard [ ] Yes [ ] No
   - Advice is helpful? [ ] Yes [ ] No
5. Test Budget Question:
   - Ask: "Can I reduce my budget?"
   - Expected response: Chatbot suggests budget-friendly alternatives
   - Mentions specific alternatives (e.g., free museums, cheaper restaurants) [ ] Yes [ ] No
6. Test Weather Question:
   - Ask: "What's the weather like in Paris in May?"
   - Expected response: Chatbot provides seasonal weather info
   - Mentions appropriate clothing/prep [ ] Yes [ ] No
7. Test General Travel Question:
   - Ask: "What should I pack?"
   - Expected response: Chatbot provides packing tips for destination
   - Response is contextual to selected destination [ ] Yes [ ] No
8. Test Off-Topic Question:
   - Ask: "What's 2+2?"
   - Chatbot responds: Either answers generically OR redirects to trip assistance
   - Behavior: [ ] Answers [ ] Redirects [ ] Ignores
9. Test Response Quality:
   - Responses are clear and well-formatted [ ] Yes [ ] No
   - Responses are under 500 characters (concise) [ ] Yes [ ] No
   - No grammatical errors [ ] Yes [ ] No
   - Tone is helpful and professional [ ] Yes [ ] No

**Expected Result:**
- Chat opens and is accessible
- Chat responds within 2 seconds
- Responses are contextual to the trip
- Responses address trip, safety, budget, and logistics
- Responses are helpful and accurate
- Chat maintains conversation context (remembers trip details)
- No broken chat functionality

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Chat Test Results:**
| Question | Response Time | Helpful | Contextual |
|----------|---------------|---------|-----------|
| "What's included?" | ___s | ✓/✗ | ✓/✗ |
| "Is it safe?" | ___s | ✓/✗ | ✓/✗ |
| "Reduce budget?" | ___s | ✓/✗ | ✓/✗ |
| "What's weather?" | ___s | ✓/✗ | ✓/✗ |
| "What to pack?" | ___s | ✓/✗ | ✓/✗ |

**Issues Found:**
- [ ] Chat doesn't respond
- [ ] Responses slow (>2 seconds)
- [ ] Responses not contextual
- [ ] Chat doesn't remember trip context
- [ ] Other: _______________________

**Screenshot:** [Chat open, Sample Q&A conversation, Response examples]

**Notes:** _________________________________

---

## Test Case 7.7: PDF Export - Download and Content Verification

**TC-7.7**  
**Title:** PDF Export Downloads Correctly and Contains All Trip Information  
**Prerequisites:** User logged in, trip generated, trip saved

**Steps:**
1. Locate "Export as PDF" button on Trip Dashboard
2. Click "Export as PDF"
   - Browser shows download prompt [ ] Yes [ ] No
   - File name format: "ParisTrip_May1-7_2024.pdf" or similar [ ] Yes [ ] No
   - File size: _____ KB (should be <10MB)
3. Open downloaded PDF file:
   - PDF opens in browser or PDF reader [ ] Yes [ ] No
   - File is readable (not corrupted) [ ] Yes [ ] No
   - No blank pages [ ] Yes [ ] No
4. Verify PDF Content:
   - **Header/Title Section:**
     - Trip title: "Paris, May 1–7, 2026" [ ] Yes [ ] No
     - Traveler name: "Sarah Johnson" (or current user) [ ] Yes [ ] No
     - Logo/branding visible [ ] Yes [ ] No
   
   - **Trip Summary:**
     - Destination [ ] Yes [ ] No
     - Travel dates [ ] Yes [ ] No
     - Duration (6 days) [ ] Yes [ ] No
     - Total cost [ ] Yes [ ] No
   
   - **Budget Breakdown:**
     - Selected tier displayed (Mid-range) [ ] Yes [ ] No
     - Cost by category:
       - Accommodation: $_____ [ ] Yes [ ] No
       - Transport: $_____ [ ] Yes [ ] No
       - Food: $_____ [ ] Yes [ ] No
       - Activities: $_____ [ ] Yes [ ] No
     - Total cost: $_____ [ ] Yes [ ] No
   
   - **Day-by-Day Itinerary:**
     - All 6 days included [ ] Yes [ ] No
     - For each day: Date, activities, times [ ] Yes [ ] No
     - Locations mentioned [ ] Yes [ ] No
     - Example: "Day 1 (May 1): 9am Breakfast → 10am Eiffel Tower → ..." [ ] Format [ ] Different
   
   - **Safety Information:**
     - Safety rating for Paris [ ] Yes [ ] No
     - Fraud alerts listed [ ] Yes [ ] No
     - Emergency contacts [ ] Yes [ ] No
   
   - **Route Map (Optional):**
     - Map included [ ] Yes [ ] No [ ] Not expected
     - Route information [ ] Yes [ ] No [ ] Not expected
   
   - **Footer/Metadata:**
     - Date generated [ ] Yes [ ] No
     - "Powered by TravelBuddy" or similar [ ] Yes [ ] No
5. Verify PDF Formatting:
   - Text is readable (no cut-off text) [ ] Yes [ ] No
   - Images visible (if included) [ ] Yes [ ] No
   - Colors preserved (not B&W if generated in color) [ ] Yes [ ] No [ ] N/A
   - Pages numbered [ ] Yes [ ] No [ ] N/A
   - Table of Contents (if present) [ ] Works [ ] N/A
6. Test PDF interactivity (if applicable):
   - Links clickable (if PDF includes links) [ ] Works [ ] N/A
   - PDF is searchable (Ctrl+F) [ ] Works [ ] Yes [ ] No

**Expected Result:**
- PDF downloads successfully with correct filename
- File size reasonable (<10MB)
- All sections present: Summary, Budget, Itinerary, Safety, (optional: Map, Footer)
- Content accurate and matches dashboard data
- Text is readable and properly formatted
- Images visible (if included)
- Colors preserved
- No missing pages or cut-off text

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**PDF Audit:**
| Section | Included | Accurate | Format | Status |
|---------|----------|----------|--------|--------|
| Title/Summary | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Budget Breakdown | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Itinerary (6 days) | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Safety Info | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Route Map | ✓/N/A | ✓/N/A | ✓/N/A | ✓/N/A |

**Issues Found:**
- [ ] PDF doesn't download
- [ ] Missing sections
- [ ] Inaccurate data in PDF
- [ ] Text cut off or unreadable
- [ ] Other: _______________________

**PDF File Details:**
- Filename: "________________________"
- File size: _____ KB
- Page count: _____ pages
- Generated date visible: [ ] Yes [ ] No

**Screenshot:** [PDF download complete, PDF first page, PDF showing itinerary, PDF showing budget breakdown, PDF full page view]

**Notes:** _________________________________

---

## Summary of Phase 7 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-7.1 ⭐ | Registration → Persistence | [ ] | [ ] | CRITICAL |
| TC-7.2 | Budget Planner | [ ] | [ ] | |
| TC-7.3 | Safety Dashboard | [ ] | [ ] | |
| TC-7.4 | Route Optimizer | [ ] | [ ] | |
| TC-7.5 | Time Management | [ ] | [ ] | |
| TC-7.6 | AI Chat | [ ] | [ ] | |
| TC-7.7 | PDF Export | [ ] | [ ] | |

**Phase 7 Overall:** [ ] ALL PASSED ✅  [ ] SOME ISSUES  [ ] CRITICAL FAILURES ✗

**CRITICAL FAILURES (if any):**
- _________________ (Must fix before submission)
- _________________ (Must fix before submission)

**Next Step:** Proceed to [PHASE 8: Error Handling](PHASE_08_Error_Handling.md)
