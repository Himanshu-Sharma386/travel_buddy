# PHASE 3: Navigation & Usability Test Cases

**Objective:** Verify all links and buttons work correctly, navigation is intuitive and clear, and any page can be reached within 3 clicks.

---

## Test Case 3.1: All Links and Buttons Are Functional

**TC-3.1**  
**Title:** Every Link and Button Works Correctly and Navigates to Expected Destination  
**Prerequisites:** App is running and fully loaded

**Steps:**
1. Start on Landing Page
2. Test all visible links/buttons:
   - "Plan a Trip" button → Should navigate to Trip Dashboard or trip planning form
   - "Sign Up" / "Register" → Should show registration form (or navigate to registration page)
   - "Log In" → Should show login form
   - "About" (if present) → Should navigate to about section
   - "Contact" (if present) → Should show contact form
   - Logo → Should navigate to home/landing page
   - Any "Learn More" buttons → Should navigate to relevant section
3. After signing up/logging in, navigate to Trip Dashboard
4. Test all tab buttons:
   - "Overview" tab → Loads overview content
   - "Budget" tab → Loads budget planner component
   - "Schedule" tab → Loads time management component
   - "Safety" tab → Loads safety dashboard component
5. Within Budget Planner component:
   - "Select Budget" button on each tier → Selects that tier (visual feedback)
   - Any edit buttons → Opens edit form
6. Within Best Places component:
   - "View Details" / "Learn More" → Opens attraction details
   - Back button / close button → Returns to list
7. Within Route Optimizer component:
   - Location buttons → Centers map on location
   - "Get Directions" (if present) → Navigates to route details
8. Within Time Management component:
   - Activity expand/collapse → Toggles details
   - "Edit Activity" (if present) → Opens edit form
9. Navigation menu (if present):
   - All menu items are clickable
   - Active item is highlighted
   - Click on each → Navigates to correct page
10. Log out button:
    - Logs out user
    - Redirects to landing page

**Expected Result:**
- Every clickable element navigates to correct page/section
- No "404 Not Found" errors
- No broken links
- Navigation happens instantly (or shows loading state)
- Back button works (when available)
- No elements that look clickable but aren't

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Links/Buttons Tested:**
- [ ] Landing Page: All buttons functional
- [ ] Navigation Menu: All items clickable
- [ ] Dashboard Tabs: All 4 tabs work
- [ ] Component Buttons: All component buttons functional
- [ ] Logout: Redirects correctly

**Broken Links Found:**
- URL: ________ Expected: ________ Actual: ________
- URL: ________ Expected: ________ Actual: ________

**Screenshot:** [Dashboard tabs working, Menu items navigating, Button click results]

**Notes:** _________________________________

---

## Test Case 3.2: Navigation Menu Is Clear and Accessible

**TC-3.2**  
**Title:** Navigation Menu Layout Is Clear, Labeled, and Accessible from All Pages  
**Prerequisites:** App is running

**Steps:**
1. Navigate to Landing Page
2. Identify navigation menu:
   - Is it in header? [ ] Yes [ ] No
   - Is it horizontal menu? [ ] Desktop menu [ ] Hamburger menu [ ] Both
   - Are menu items clearly labeled? [ ] Yes [ ] No
   - Are there ≤5 top-level items? [ ] Yes [ ] No
3. Check menu items:
   - List all visible menu items: ___________, ___________, ___________, etc.
   - Is current page/section highlighted? [ ] Yes [ ] No
   - Is hover state visible (darker/underline)? [ ] Yes [ ] No
4. Test mobile menu (if hamburger):
   - Click hamburger icon → Menu appears
   - Menu displays all items (or grouped sections)
   - Click on menu item → Navigates + menu closes
   - Click X or outside menu → Menu closes
5. Navigate to other pages:
   - Is menu visible on all pages? [ ] Yes [ ] No
   - Is menu always in same position? [ ] Yes [ ] No
   - Is active indicator correct (shows current page)? [ ] Yes [ ] No
6. Test on different screen sizes:
   - Mobile: Menu is hamburger or dropdown [ ] Hamburger [ ] Dropdown [ ] Other: ____
   - Tablet: Menu layout is appropriate [ ] Hamburger [ ] Expanded [ ] Both
   - Desktop: Full horizontal menu visible [ ] Yes [ ] No
7. Check accessibility:
   - Menu items are keyboard navigable (Tab through menu) [ ] Yes [ ] No
   - Menu items have visible focus state (outline/highlight) [ ] Yes [ ] No

**Expected Result:**
- Navigation menu visible and consistent on all pages
- ≤5 top-level menu items (not overloaded)
- Active page/section clearly highlighted
- Menu is responsive (hamburger on mobile, expanded on desktop)
- Menu is keyboard accessible
- Menu labels are clear and descriptive (not "Page 1", "Page 2", etc.)
- Hover states visible

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Menu Structure:**
- [ ] Desktop Menu: ________________
- [ ] Mobile Menu: Hamburger [ ] Dropdown [ ] Other: ____
- [ ] Active Indicator: ✓ Visual (highlight/underline/bold/other: ____)

**Menu Items Found:**
1. ________________ (Current page: ______)
2. ________________
3. ________________
4. ________________
5. ________________

**Issues Found:**
- [ ] Menu not visible on some pages
- [ ] Current page not highlighted
- [ ] Menu items not keyboard accessible
- [ ] Too many menu items (>5)
- [ ] Other: _______________________

**Screenshot:** [Desktop menu, Mobile menu open, Menu item hover state, Active menu item]

**Notes:** _________________________________

---

## Test Case 3.3: User Can Reach Any Page Within 3 Clicks

**TC-3.3**  
**Title:** Navigation Allows User to Reach Any Page in Maximum 3 Clicks from Home  
**Prerequisites:** App is running

**Steps:**
1. Map out all main pages/sections in app:
   - Landing Page
   - Trip Dashboard (with 4 tabs: Overview, Budget, Schedule, Safety)
   - [Any other main pages: ________________]
2. Starting from Landing Page, count clicks to reach:
   - Trip Dashboard → 1 click (from "Plan Trip" button)
   - Budget section (in dashboard) → 2 clicks (Dashboard → Budget tab)
   - Safety alerts → 2 clicks (Dashboard → Safety tab)
   - User profile (if exists) → ? clicks
   - Settings (if exists) → ? clicks
   - Account history → ? clicks
3. Document click paths for each destination:
   - Landing → Dashboard: [Button name] (1 click)
   - Landing → Safety Tab: [Path] (2 clicks)
   - Landing → Edit Trip: [Path] (? clicks)
4. Test main user task flows:
   - Registration → Trip Planning: [Count clicks]
   - Dashboard → Save Trip: [Count clicks]
   - Dashboard → View Saved Trips: [Count clicks]
5. Verify no page requires >3 clicks from home:
   - If a feature needs >3 clicks, note it as a UX issue

**Expected Result:**
- Most important pages reachable in 1–2 clicks
- All pages reachable in ≤3 clicks
- Most common tasks (register, plan trip, save trip) in ≤2 clicks
- Clear navigation path (users can find what they need)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Click Path Mapping:**
| Destination | Click Path | Clicks | Status |
|-------------|-----------|--------|--------|
| Trip Dashboard | Landing → "Plan Trip" button | 1 | ✓ |
| Budget Tab | Landing → Dashboard → "Budget" tab | 2 | ✓ |
| Safety Tab | Landing → Dashboard → "Safety" tab | 2 | ✓ |
| Attractions | Landing → Dashboard → "Places" tab | 2 | ✓ |
| Routes | Landing → Dashboard → "Routes" tab | 2 | ✓ |
| Schedule | Landing → Dashboard → "Schedule" tab | 2 | ✓ |
| [Other: ____] | [Path] | _ | _ |

**Pages Needing >3 Clicks:**
- _________________ (Issue: Takes too long to reach)

**Screenshot:** [Click path diagram or annotated screenshots showing navigation]

**Notes:** _________________________________

---

## Test Case 3.4: Back Button Works Properly

**TC-3.4**  
**Title:** Browser Back Button Navigates Correctly and Maintains Page State  
**Prerequisites:** App is running

**Steps:**
1. Navigate: Landing Page → Click "Plan Trip" → Trip Dashboard
2. Click browser Back button (← in browser toolbar, not app button)
   - Should return to Landing Page
   - Check if scroll position is maintained [ ] Yes [ ] No
3. Navigate: Landing Page → Trip Dashboard → Click "Budget" tab
4. Click Back button:
   - Should return to Dashboard Overview (or previous state)
5. Navigate: Dashboard → "Budget" tab → Click "Edit Trip"
6. Click Back button:
   - Should return to Budget tab (not Dashboard Overview)
7. Fill a form (e.g., registration):
   - Start filling → Click Back button
   - Should warn "Unsaved changes will be lost" [ ] Yes [ ] No [ ] N/A (form auto-saves)
   - Or should preserve form data [ ] Yes [ ] No

**Expected Result:**
- Back button navigates to actual previous page (browser history, not app routing)
- Scroll position preserved when navigating back (nice to have)
- Form data preserved if back is clicked (or warning shown)
- Back button never breaks or causes unexpected behavior

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Back Button Behavior:**
- [ ] Works correctly
- [ ] Maintains scroll position: [ ] Yes [ ] No
- [ ] Preserves form data: [ ] Yes [ ] No [ ] Warns user: [ ] Yes [ ] No

**Issues Found:**
- [ ] Back button doesn't work on some pages
- [ ] Back button breaks app state
- [ ] Unsaved form data lost without warning
- [ ] Other: _______________________

**Screenshot:** [Browser back button, Navigation history, Form preservation]

**Notes:** _________________________________

---

## Summary of Phase 3 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-3.1 | All Links Functional | [ ] | [ ] | |
| TC-3.2 | Navigation Menu Clear | [ ] | [ ] | |
| TC-3.3 | 3-Click Rule | [ ] | [ ] | |
| TC-3.4 | Back Button Works | [ ] | [ ] | |

**Phase 3 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 4: Page Load & Performance](PHASE_04_Performance.md)
