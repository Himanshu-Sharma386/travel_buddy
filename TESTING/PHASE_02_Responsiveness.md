# PHASE 2: Responsiveness Testing

**Objective:** Verify app works seamlessly on mobile (≤768px), tablet (768–1024px), and desktop (>1024px) with no horizontal scrolling and readable text.

**Device Breakpoints to Test:**
- Mobile: 375px, 414px width (iPhone 12, Pixel 6)
- Tablet: 768px, 1024px width (iPad, Samsung Tab)
- Desktop: 1280px, 1440px, 1920px width

---

## Test Case 2.1: Mobile Responsiveness (≤768px)

**TC-2.1**  
**Title:** Landing Page and Trip Dashboard Render Correctly on Mobile Devices  
**Prerequisites:** Chrome DevTools open, Device Emulation enabled

**Steps:**
1. Open Chrome DevTools (F12)
2. Click Device Toolbar icon (or Ctrl+Shift+M) to enable mobile view
3. Set viewport to iPhone 12 (390×844)
4. Navigate to Landing Page
5. Verify the following layout:
   - **Header:** Logo + Menu button (hamburger) on left, no menu items visible (collapsed into dropdown)
   - **Destination Search:** Full width, stacks vertically
   - **Trip Type Selection:** Buttons stack vertically, take full width (not side-by-side)
   - **Mood Selection:** Buttons wrap/stack, not crowded
   - **Stats Section:** Displays as single column (not 3-column grid)
6. Verify no horizontal scrolling:
   - Scroll left/right → No content outside viewport
   - All content visible within 390px width
7. Scroll down the page:
   - No jumped/misaligned text
   - Proper spacing maintained
8. Test a button click (e.g., "Plan Your Trip"):
   - Button is easily tappable (≥44px tall)
   - Click registers immediately (no lag)
9. Navigate to Trip Dashboard (if logged in)
   - Tab labels display as horizontal scroll (if 4 tabs) or dropdown
   - Content below tabs is full width
   - No overlap of tabs and content
10. Test each tab on mobile:
    - Overview tab → Content readable without zoom
    - Budget tab → Budget tiers stack vertically (3 tiers, 1 per row)
    - Schedule tab → Itinerary items full width, readable
    - Safety tab → Alerts display as list, not side-by-side

**Expected Result:**
- All content fits within 390px viewport
- No horizontal scrolling anywhere
- Text is readable (≥14px, no zoom needed)
- Buttons are ≥44px tall for easy tapping
- Layout stacks vertically (single column)
- Tabs collapse into dropdown or horizontal scroll menu
- All functionality works on touch (buttons click immediately)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Issues Found:**
- [ ] Horizontal scrolling present
- [ ] Text too small to read
- [ ] Buttons hard to tap
- [ ] Layout misaligned
- Other: _______________________

**Screenshot:** [Mobile home, Mobile dashboard, Mobile budget tab, Mobile schedule tab]

**Notes:** _________________________________

---

## Test Case 2.2: Tablet Responsiveness (768px–1024px)

**TC-2.2**  
**Title:** Layout Adjusts for Tablet with 2-Column Views Where Appropriate  
**Prerequisites:** Chrome DevTools open

**Steps:**
1. Set viewport to iPad (768px width in landscape)
2. Navigate to Landing Page
   - Verify layout adjusts to 2-column where applicable
   - Destination search + mood selector side-by-side (if space allows)
   - Stats section: 2 or 3 items per row
3. Navigate to Trip Dashboard
   - Verify tabs are visible (not collapsed)
   - Content main area visible with good readability
4. Check Budget Planner tab:
   - Budget tiers: 2 per row (Budget + Mid-range on top, Comfort below)
   - Each tier card takes ~48% width with gap
5. Check Best Places tab:
   - Attractions: 2 per row, not cramped
   - Each card ~48% width with gap
6. Check Route Optimizer tab:
   - If side-by-side layout: Map on left (~60%), route list on right (~40%)
   - If stacked: Map takes full width, route list below
7. Rotate device to portrait (iPad portrait is ~768px):
   - Layout adjusts gracefully
   - Content still readable
   - No overlap of elements
8. Test touch interactions:
   - Tab switching works smoothly
   - Buttons are tappable
   - No lag when scrolling

**Expected Result:**
- Layout optimized for tablet (2-column where applicable)
- 2–3 cards per row (not too cramped, not too sparse)
- All content readable without horizontal scrolling
- Both portrait and landscape orientations work
- Touch interactions are smooth and responsive

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Tablet Orientations Tested:**
- [ ] Landscape (768×1024)
- [ ] Portrait (768×1024 rotated)

**Issues Found:**
- [ ] Content too cramped
- [ ] Content too sparse
- [ ] Orientation change breaks layout
- [ ] Other: _______________________

**Screenshot:** [Tablet landscape, Tablet portrait, Budget cards 2-per-row, Route optimizer layout]

**Notes:** _________________________________

---

## Test Case 2.3: Desktop Responsiveness (>1024px)

**TC-2.3**  
**Title:** Full-Width Desktop Layout Uses Available Space Efficiently  
**Prerequisites:** Chrome DevTools open, viewport set to desktop sizes

**Steps:**
1. Set viewport to 1280px width (laptop screen)
2. Navigate to Landing Page
   - Verify layout uses full available space
   - Stats section displays 3 items per row (if 3 available)
   - Hero image/section spans full width
   - Proper margins on sides (not edge-to-edge)
3. Navigate to Trip Dashboard
   - Verify all 4 tabs visible in header
   - AI Chat widget visible on right side (if applicable)
   - Main content area takes ~70–75% width
   - Sidebar or chat takes ~25–30% width
4. Check Budget Planner tab:
   - All 3 budget tiers displayed side-by-side
   - Each tier takes ~33% width with proper spacing
5. Check Best Places tab:
   - Attractions displayed in 3-column grid
   - Lazy loading works (scroll down, more items load)
6. Check Route Optimizer tab:
   - Map on left (~60%), route list on right (~40%)
   - Both visible without scrolling
7. Check Time Management tab:
   - Daily itinerary displayed horizontally (days 1–6 visible in a row)
   - Or vertically if too many days
8. Resize to larger screen (1920px):
   - Layout adjusts but doesn't look stretched
   - Content doesn't spread too wide (max-width constraints)
   - Still readable and organized

**Expected Result:**
- Desktop layout is full-width (respects max-width if set)
- 3+ items per row where applicable
- All 4 tabs visible in header (not collapsed)
- AI Chat/Sidebar visible without hiding main content
- No excessive white space (layout doesn't look sparse)
- Scaling to 1920px looks proportional

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Desktop Sizes Tested:**
- [ ] 1280px (laptop)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)

**Issues Found:**
- [ ] Layout too cramped
- [ ] Too much white space
- [ ] Content doesn't scale well
- [ ] Other: _______________________

**Screenshot:** [1280px view, 1440px view, 1920px view, Budget 3-per-row, Best Places 3-per-row]

**Notes:** _________________________________

---

## Test Case 2.4: No Horizontal Scrolling & Text Readability Across All Sizes

**TC-2.4**  
**Title:** Verify No Horizontal Scrolling on Any Device and Text Readable Without Zoom  
**Prerequisites:** App running, tested on all 3 device sizes

**Steps:**
1. On Mobile (390px):
   - Open DevTools console
   - Run: `console.log(document.documentElement.scrollWidth, window.innerWidth)`
   - ScrollWidth should equal innerWidth (no horizontal overflow)
   - Manually try to scroll left/right → No scroll happens
2. Measure text size on mobile:
   - Inspect body text → Should be ≥14px
   - Heading text → Should be ≥18–20px
   - Button text → Should be ≥16px
   - No zoom needed to read (user can read at 100% zoom)
3. Repeat for Tablet and Desktop:
   - Run same console command
   - Measure text sizes
   - Verify no horizontal scroll
4. Test on actual mobile device (if available):
   - Open app on iPhone or Android
   - Pinch-to-zoom disabled (app shouldn't require zoom)
   - Try to scroll horizontally → Blocked or no content
5. Check common issue areas:
   - Tables (if any): Should be responsive, not overflow
   - Code blocks (if any): Should have horizontal scroll within container, not page-level
   - Images: Should scale down on mobile, not overflow

**Expected Result:**
- ScrollWidth = InnerWidth (no horizontal overflow)
- Body text ≥14px on all sizes
- All text readable at 100% zoom
- No pinch-to-zoom needed
- No horizontal scrollbar appears
- Tables and code blocks don't break layout

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Text Size Validation:**
- [ ] Mobile: Body ≥14px  [ ] Headers ≥18px
- [ ] Tablet: Body ≥14px  [ ] Headers ≥20px
- [ ] Desktop: Body ≥14px  [ ] Headers ≥24px

**Horizontal Scroll Check:**
- [ ] Mobile: No scroll
- [ ] Tablet: No scroll
- [ ] Desktop: No scroll

**Issues Found:**
- [ ] Horizontal scroll present
- [ ] Text too small
- [ ] Zoom required to read
- [ ] Other: _______________________

**Screenshot:** [Mobile without scroll, Tablet without scroll, Desktop without scroll, Console output showing equal widths]

**Notes:** _________________________________

---

## Summary of Phase 2 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-2.1 | Mobile Responsiveness | [ ] | [ ] | |
| TC-2.2 | Tablet Responsiveness | [ ] | [ ] | |
| TC-2.3 | Desktop Responsiveness | [ ] | [ ] | |
| TC-2.4 | No H-Scroll & Readability | [ ] | [ ] | |

**Phase 2 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 3: Navigation & Usability](PHASE_03_Navigation.md)
