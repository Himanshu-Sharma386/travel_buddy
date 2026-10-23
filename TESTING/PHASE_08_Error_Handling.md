# PHASE 8: Error Handling Test Cases

**Objective:** Verify graceful error states, helpful error messages, and no blank pages on failure.

---

## Test Case 8.1: Offline/Server Error Handling

**TC-8.1**  
**Title:** API/Server Errors Show Friendly Messages (No Blank Pages)  
**Prerequisites:** App is running

**Steps:**
1. Simulate offline mode:
   - Open DevTools (F12) → Network tab
   - Check "Offline" checkbox (simulates no internet)
2. Try to generate a trip:
   - Fill form → Click "Generate Itinerary"
   - Expected: Error message appears (not blank page) [ ] Yes [ ] No
   - Message text: "________________________"
   - Example: "Unable to connect to server. Please check your internet connection and try again."
3. Verify error message includes:
   - Clear explanation of what went wrong [ ] Yes [ ] No
   - Suggestion for user (e.g., "Check your connection") [ ] Yes [ ] No
   - "Retry" or "Go Back" button [ ] Yes [ ] No
4. Click retry button:
   - Still offline → Error again [ ] Yes [ ] No
   - Message reappears [ ] Yes [ ] No
5. Turn offline mode off (uncheck "Offline")
6. Click retry:
   - Should work now [ ] Yes [ ] No

**Expected Result:**
- No blank page when offline
- Error message is clear and helpful
- User knows what to do (retry, check connection, etc.)
- App doesn't crash or freeze

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Error Messages Recorded:**
- Offline error: "________________________"
- Other errors: "________________________"

**Issues Found:**
- [ ] Blank page instead of error
- [ ] Error message is confusing
- [ ] No retry button
- [ ] Other: _______________________

**Screenshot:** [Offline error message, Error with retry button]

**Notes:** _________________________________

---

## Test Case 8.2: Validation Error Messages Are Helpful

**TC-8.2**  
**Title:** Form Validation Errors Are Specific and Actionable (Not Generic)  
**Prerequisites:** App is running

**Steps:**
1. Navigate to Registration form
2. Test each field with invalid input:
   - **Name field:** Enter "123"
     - Error message: "________________________"
     - Is it specific (not just "Invalid input")? [ ] Yes [ ] No
     - Does it tell user what's wrong? [ ] Yes [ ] No
     - Does it suggest how to fix? [ ] Yes [ ] No
   
   - **Email field:** Enter "invalid-email"
     - Error: "________________________"
     - Specific to email format? [ ] Yes [ ] No
   
   - **Password field:** Enter "123"
     - Error: "________________________"
     - Mentions minimum length or requirements? [ ] Yes [ ] No
     - Examples of good error messages:
       - ✓ "Password must be 8+ characters"
       - ✓ "Email format invalid. Example: user@example.com"
       - ✗ "Invalid input"
       - ✗ "Error"
3. Test error styling:
   - Errored field highlighted (red border, background, etc.)? [ ] Yes [ ] No
   - Error message color distinguishable (red, not same as normal text)? [ ] Yes [ ] No
   - Error persists until corrected? [ ] Yes [ ] No

**Expected Result:**
- Error messages are specific to field and issue
- Messages explain what's wrong
- Messages suggest how to fix (when applicable)
- No generic "Error" messages
- Errored fields are visually highlighted
- Errors clear when user corrects the field

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Error Message Examples:**
| Field | Error Message | Specific? | Helpful? |
|-------|---------------|-----------|----------|
| Name | "____________" | ✓/✗ | ✓/✗ |
| Email | "____________" | ✓/✗ | ✓/✗ |
| Password | "____________" | ✓/✗ | ✓/✗ |

**Issues Found:**
- [ ] Error messages are generic
- [ ] Don't explain how to fix
- [ ] No field highlighting
- [ ] Other: _______________________

**Screenshot:** [Multiple validation errors shown, Error highlighting, Error message detail]

**Notes:** _________________________________

---

## Test Case 8.3: 404 and Not Found Errors

**TC-8.3**  
**Title:** Invalid URLs Show Custom 404 Page (Not Blank or Server Error)  
**Prerequisites:** App is running

**Steps:**
1. Navigate to a valid page (e.g., Trip Dashboard)
2. Manually edit URL to non-existent path:
   - Example: Change `/dashboard` to `/invalid-page`
   - Press Enter
3. Expected result: Custom 404 page displays [ ] Yes [ ] No
4. 404 page shows:
   - "Page Not Found" message or similar [ ] Yes [ ] No
   - Friendly message (not technical error) [ ] Yes [ ] No
   - Example: "Oops! We can't find that page. Return home?"
   - "Return Home" or "Go Back" link [ ] Yes [ ] No
5. Click link:
   - Returns to home/dashboard [ ] Yes [ ] No
   - Navigation works [ ] Yes [ ] No
6. Test with invalid trip ID:
   - Try to access: `/trip/999999` (non-existent trip ID)
   - Expected: "Trip not found" message [ ] Yes [ ] No
   - Option to return to trip list [ ] Yes [ ] No

**Expected Result:**
- Custom 404 page displays (not server error page)
- Message is user-friendly
- User can navigate away (back button, home link)
- No scary technical errors

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**404 Page Details:**
- Title: "________________________"
- Message: "________________________"
- Link/button available: [ ] Yes [ ] No
- Link destination: "________________________"

**Issues Found:**
- [ ] Server error page shown instead of 404
- [ ] No way to navigate away
- [ ] Confusing error message
- [ ] Other: _______________________

**Screenshot:** [Custom 404 page, 404 page with navigation link]

**Notes:** _________________________________

---

## Test Case 8.4: Missing Data Handling

**TC-8.4**  
**Title:** Missing Images/Data Show Graceful Fallbacks (Not Broken)  
**Prerequisites:** App is running

**Steps:**
1. Navigate to Best Places component (attractions)
2. Look for images:
   - All images loading? [ ] Yes [ ] No
   - If image fails to load:
     - Broken image icon shown (red X)? [ ] Yes [ ] No
     - Placeholder image shown instead? [ ] Yes [ ] No
     - Alt text visible? [ ] Yes [ ] No (alt text should be shown if image fails)
3. If attraction data is missing:
   - Example: Attraction has no description
   - Shows blank space [ ] Yes [ ] No
   - Shows placeholder text ("No description available") [ ] Yes [ ] No
4. Test with slow network:
   - DevTools → Network → Slow 3G
   - Navigate to Best Places
   - Images loading:
     - Placeholder appears first? [ ] Yes [ ] No
     - Then actual image loads? [ ] Yes [ ] No
     - Or just alt text + loading spinner? [ ] Yes [ ] No
5. If weather API unavailable:
   - Safety Dashboard shows weather [ ] Yes [ ] No
   - If data missing, shows "Weather unavailable" [ ] Yes [ ] No
   - Doesn't break rest of page [ ] Yes [ ] No

**Expected Result:**
- Missing images show alt text or placeholder (not broken icon)
- Missing data shows placeholder text (not blank space or error)
- App doesn't crash due to missing data
- Graceful degradation (page works even if one data source fails)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Missing Data Audit:**
- [ ] Broken images show alt text
- [ ] Placeholder shown for missing data
- [ ] No "undefined" or blank values displayed
- [ ] Page functional despite missing data

**Issues Found:**
- [ ] Broken image icons (X)
- [ ] "undefined" text visible
- [ ] Blank/empty sections
- [ ] App crashes from missing data
- [ ] Other: _______________________

**Screenshot:** [Image loading with placeholder, Alt text shown, Missing data placeholder]

**Notes:** _________________________________

---

## Test Case 8.5: Loading Timeout and Cancellation

**TC-8.5**  
**Title:** Long-Running Operations Show Loading State and Can Be Cancelled  
**Prerequisites:** App is running

**Steps:**
1. Trigger trip generation:
   - Fill form → Click "Generate Itinerary"
2. Loading state appears:
   - LoadingScreen visible? [ ] Yes [ ] No
   - Spinner animating? [ ] Yes [ ] No
   - Text: "Generating your itinerary..." [ ] Yes [ ] No
   - Displays for entire generation duration [ ] Yes [ ] No
3. Duration of generation:
   - Document time: _____ seconds
   - >5 seconds? [ ] Yes [ ] No [ ] No (fast)
4. If generation takes >5 seconds:
   - Spinner continuously visible [ ] Yes [ ] No
   - Cancel button available [ ] Yes [ ] No
   - Estimated time shown [ ] Yes [ ] No
5. Test cancel (if available):
   - Click "Cancel" during generation
   - Generation stops [ ] Yes [ ] No
   - Return to form [ ] Yes [ ] No
   - No errors appear [ ] Yes [ ] No

**Expected Result:**
- Long operations show loading spinner
- Spinner visible entire duration
- Never shows blank page during load
- Optional: Cancel button for very long operations
- Estimated completion time helpful for long operations

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Loading Behavior:**
- Spinner visible: [ ] Yes [ ] No
- Generation duration: _____ seconds
- Cancel button available: [ ] Yes [ ] No
- Timeout handling: ________________

**Issues Found:**
- [ ] No loading indicator
- [ ] Blank page during generation
- [ ] Can't cancel long operation
- [ ] Timeout not handled
- [ ] Other: _______________________

**Screenshot:** [LoadingScreen with spinner, Cancel button (if present), Timeout handling]

**Notes:** _________________________________

---

## Summary of Phase 8 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-8.1 | Offline/Server Error | [ ] | [ ] | |
| TC-8.2 | Validation Errors | [ ] | [ ] | |
| TC-8.3 | 404 Errors | [ ] | [ ] | |
| TC-8.4 | Missing Data | [ ] | [ ] | |
| TC-8.5 | Loading Timeout | [ ] | [ ] | |

**Phase 8 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 9: UX Clarity](PHASE_09_UX_Clarity.md)
