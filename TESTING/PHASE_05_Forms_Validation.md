# PHASE 5: Forms & Input Validation Test Cases

**Objective:** Verify all form fields accept valid data, reject invalid input with clear error messages, and data persists after submission.

---

## Test Case 5.1: Registration Form Validation

**TC-5.1**  
**Title:** Registration Form Accepts Valid Input and Rejects Invalid Input with Error Messages  
**Prerequisites:** App is running, user not logged in

**Steps:**

### Valid Registration:
1. Navigate to Sign Up page
2. Fill out registration form with valid data:
   - Name: "John Doe" (letters only)
   - Email: "john@example.com" (valid email format)
   - Password: "SecurePass123!" (8+ characters, mix of upper/lower/numbers/special)
   - Confirm Password: "SecurePass123!" (matches password)
3. Submit form
   - Should accept and display success message [ ] Yes [ ] No
   - Should redirect to trip planning or login page [ ] Yes [ ] No
4. Verify new account:
   - Log out (if auto-logged in)
   - Try logging in with new email + password
   - Should successfully log in [ ] Yes [ ] No

### Invalid Registration (Test Each Separately):
1. **Name Field Only:**
   - Enter: "123" (numbers, no letters)
   - Submit → Error message: "______________________"
   - Error message is helpful? [ ] Yes [ ] No
   - Field is highlighted/marked? [ ] Yes [ ] No

2. **Email Field Validation:**
   - Test: "invalid-email" (missing @domain)
     - Error: "______________________"
   - Test: "test@" (missing domain)
     - Error: "______________________"
   - Test: "test@example" (missing TLD)
     - Error: "______________________"
   - Test: Already registered email (if possible)
     - Error: "______________________"

3. **Password Field Validation:**
   - Test: "123" (too short, <8 chars)
     - Error: "______________________"
   - Test: "password" (no uppercase/numbers)
     - Error: "______________________"
   - Test: Empty password
     - Error: "______________________"

4. **Confirm Password Mismatch:**
   - Password: "SecurePass123!"
   - Confirm: "SecurePass124"
   - Submit → Error: "Passwords do not match"

5. **Required Fields:**
   - Leave Name blank → Error: "______________________"
   - Leave Email blank → Error: "______________________"
   - Leave Password blank → Error: "______________________"
   - Submit without filling all → Which fields prevent submission? _____________

**Expected Result:**
- Valid input accepted, account created
- Invalid input rejected with specific error message
- Error messages are clear and actionable
- Invalid fields are highlighted/marked for user attention
- No generic "Error" messages
- Form doesn't submit until all fields valid
- Duplicate email rejected

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Validation Results:**
| Input | Expected Behavior | Actual Result | Status |
|-------|-------------------|---------------|--------|
| Valid email | Accept | _________________ | ✓/✗ |
| Invalid email | Reject + Error | _________________ | ✓/✗ |
| Short password | Reject + Error | _________________ | ✓/✗ |
| Password mismatch | Reject + Error | _________________ | ✓/✗ |
| Numbers in name | Reject + Error | _________________ | ✓/✗ |
| Duplicate email | Reject + Error | _________________ | ✓/✗ |

**Error Messages Found:**
- Name validation: "________________________"
- Email validation: "________________________"
- Password validation: "________________________"
- Confirm password: "________________________"

**Issues Found:**
- [ ] No error messages
- [ ] Generic error messages ("Error")
- [ ] Invalid input accepted
- [ ] Fields not highlighted
- [ ] Form submits with invalid data
- [ ] Other: _______________________

**Screenshot:** [Valid registration success, Error messages for invalid inputs, Field highlighting]

**Notes:** _________________________________

---

## Test Case 5.2: Trip Planning Form Validation

**TC-5.2**  
**Title:** Trip Planning Form Validates Destination, Dates, Budget, and Preferences  
**Prerequisites:** User is logged in, on Landing Page or Trip Planning form

**Steps:**

### Valid Trip Planning:
1. Fill trip planning form:
   - Destination: "Paris, France"
   - Start Date: May 1, 2026
   - End Date: May 7, 2026
   - Budget Range: Mid-range ($1500–$2500)
   - Preferences: "Heritage" + "Chill"
2. Submit form
   - Should accept and trigger itinerary generation [ ] Yes [ ] No
   - LoadingScreen should display [ ] Yes [ ] No

### Destination Field Validation:
1. Test: Empty field
   - Submit → Error: "______________________"
2. Test: Invalid destination ("XYZ123", non-existent place)
   - Error: "______________________" (or silently fails — note this)
3. Test: Valid destination variations:
   - "Paris, France" → Accepted [ ] Yes [ ] No
   - "paris" (lowercase) → Accepted [ ] Yes [ ] No
   - "Paris" (without country) → Accepted [ ] Yes [ ] No

### Date Field Validation:
1. Test: Start Date > End Date
   - Start: May 7 → End: May 1
   - Error: "______________________"
2. Test: Past dates (today is April 29, 2026)
   - Start: April 28, 2026 (yesterday)
   - Error: "______________________" (or rejected)
3. Test: Same start and end date
   - Start: May 1 → End: May 1
   - Error or accepted? [ ] Accepted [ ] Rejected [ ] Accepted with warning
4. Test: Valid date range
   - Start: May 1 → End: May 7
   - Accepted [ ] Yes [ ] No

### Budget Field Validation:
1. Test: Negative budget
   - Input: "-$1000"
   - Error: "______________________"
2. Test: Zero budget
   - Input: "$0"
   - Error: "______________________" (or error)
3. Test: Non-numeric input
   - Input: "ABC" or "expensive"
   - Error: "______________________"
4. Test: Valid budgets
   - "$500" → Accepted [ ] Yes [ ] No
   - "$5000" → Accepted [ ] Yes [ ] No

### Preferences Field Validation:
1. Test: No preferences selected
   - Click Submit without selecting any
   - Error: "______________________"
2. Test: Valid preferences selection
   - Select "Adventure" + "Heritage"
   - Submit → Accepted [ ] Yes [ ] No

**Expected Result:**
- Valid data accepted, trip generation starts
- Invalid data rejected with clear error message
- Date validation: Start < End, both future dates
- Budget validation: Positive numbers only
- Destination validation: Real places accepted
- Preferences: At least one required
- Error messages specific to field (not generic)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Validation Results:**
| Field | Input | Expected | Actual | Status |
|-------|-------|----------|--------|--------|
| Destination | Empty | Error | ____________ | ✓/✗ |
| Destination | "Paris" | Accept | ____________ | ✓/✗ |
| Dates | Start > End | Error | ____________ | ✓/✗ |
| Dates | Past dates | Error | ____________ | ✓/✗ |
| Budget | Negative | Error | ____________ | ✓/✗ |
| Budget | "$2000" | Accept | ____________ | ✓/✗ |
| Preferences | None | Error | ____________ | ✓/✗ |

**Issues Found:**
- [ ] Validation missing for some fields
- [ ] Invalid data accepted
- [ ] Error messages unclear
- [ ] Other: _______________________

**Screenshot:** [Valid trip submitted, Date validation error, Budget validation error, Preferences required error]

**Notes:** _________________________________

---

## Test Case 5.3: Data Persistence After Form Submission (Critical for Your Project)

**TC-5.3**  
**Title:** Submitted Trip Data Persists and Is Available After Logout/Login  
**Prerequisites:** User is logged in, trip planning completed and saved

**Steps:**
1. Complete trip planning form:
   - Destination: "Paris, France"
   - Dates: May 1–7, 2026
   - Budget: Mid-range
   - Preferences: Heritage + Chill
2. Submit form → Trip itinerary generates (LoadingScreen visible)
3. View Trip Dashboard:
   - Budget Planner shows 3 tiers [ ] Yes [ ] No
   - Schedule shows 6-day itinerary [ ] Yes [ ] No
   - Safety Dashboard shows Paris safety info [ ] Yes [ ] No
4. Click "Save Trip" button:
   - Success message appears? [ ] Yes [ ] No
   - Message text: "________________________"
5. Navigate to "My Trips" or Trip History page:
   - Newly saved trip appears in list? [ ] Yes [ ] No
   - Trip shows: Destination, Dates, Budget, etc. [ ] Yes [ ] No
6. **Critical Test - Log Out:**
   - Click Logout button
   - Confirm logout
   - Should redirect to Landing Page [ ] Yes [ ] No
7. **Critical Test - Log Back In:**
   - Navigate to login
   - Enter email + password
   - Successfully logged in [ ] Yes [ ] No
8. **Critical Test - Verify Trip Persistence:**
   - Navigate to "My Trips" page
   - Previously saved trip still visible? [ ] Yes [ ] No
   - Trip data intact:
     - Destination: "Paris, France" [ ] Yes [ ] No
     - Dates: May 1–7 [ ] Yes [ ] No
     - Budget info saved [ ] Yes [ ] No
     - Itinerary details saved [ ] Yes [ ] No
9. Click on saved trip:
   - Opens full trip details [ ] Yes [ ] No
   - All previously generated content visible [ ] Yes [ ] No
   - Budget breakdown matches original [ ] Yes [ ] No
10. Test multiple trip saves:
    - Save a second trip (different destination)
    - Both trips visible in My Trips [ ] Yes [ ] No
    - Each trip is independent (different data) [ ] Yes [ ] No

**Expected Result:**
- Trip saves successfully with confirmation message
- Trip appears in My Trips immediately after save
- Trip persists after logout/login (stored in database)
- All trip data intact (destination, dates, budget, itinerary)
- Multiple trips can be saved and retrieved independently
- User can always access their saved trips

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Data Persistence Checklist:**
- [ ] Save success message displayed
- [ ] Trip appears in My Trips list
- [ ] Trip data visible after logout/login
- [ ] Budget breakdown matches
- [ ] Itinerary intact
- [ ] Multiple trips independent
- [ ] No data loss or corruption

**Database Verification (Optional - if you have backend access):**
- Query: SELECT * FROM trips WHERE user_id = [test user ID]
- Result: Trip data present in database [ ] Yes [ ] No
- Data matches UI display [ ] Yes [ ] No

**Issues Found:**
- [ ] Trip doesn't save
- [ ] Trip disappears after logout
- [ ] Data corrupted or incomplete
- [ ] Multiple trips overwrite each other
- [ ] Other: _______________________

**Screenshot:** [Trip dashboard, Save success message, My Trips list after logout/login, Saved trip details]

**Notes:** _________________________________

---

## Summary of Phase 5 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-5.1 | Registration Form | [ ] | [ ] | |
| TC-5.2 | Trip Planning Form | [ ] | [ ] | |
| TC-5.3 | Data Persistence ⭐ | [ ] | [ ] | |

**Phase 5 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Critical Issues Found:** _________________________________

**Next Step:** Proceed to [PHASE 6: Accessibility Basics](PHASE_06_Accessibility.md)
