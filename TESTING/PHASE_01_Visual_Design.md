# PHASE 1: Visual Design Consistency Test Cases

**Objective:** Verify consistent color scheme, fonts, button styles, alignment, spacing, logo, and branding across all pages.

**Pages to Test:**
- Landing Page
- Trip Dashboard
- Components: Budget Planner, Safety Dashboard, Best Places, Route Optimizer, Time Management

---

## Test Case Format (Example)

```
TEST CASE: TC-1.X
Title: [Test Case Title]
Prerequisites: [What must be true before testing]
Steps:
  1. [Action]
  2. [Action]
  3. [Verification step]
Expected Result: [What should happen]
Actual Result: [FILL DURING TESTING]
Status: [ ] PASS  [ ] FAIL  [ ] BLOCKED
Notes: [Any observations]
Screenshot: [If applicable, attach screenshot]
```

---

## Test Case 1.1: Color Scheme Consistency

**TC-1.1**  
**Title:** Primary and Secondary Colors Applied Consistently Across All Pages  
**Prerequisites:** App is running and accessible at localhost:5173 (or deployed URL)

**Steps:**
1. Navigate to Landing Page
2. Note the primary color (usually blue/teal for buttons and highlights)
3. Navigate to Trip Dashboard
4. Verify the same primary color is used for:
   - Active tab indicator
   - Submit/CTA buttons
   - Hover states
5. Open Budget Planner component (via Trip Dashboard)
6. Verify primary color appears on "Select" buttons for budget tiers
7. Open Safety Dashboard component
8. Verify:
   - Green color for "Safe" indicators
   - Red/Orange for "Caution/Alert" indicators
   - Yellow for "Warning" fraud alerts
9. Open Best Places component
10. Verify primary color on "View Details" / "Learn More" buttons
11. Open Route Optimizer component
12. Verify primary color on location buttons and route controls
13. Open Time Management component
14. Verify primary color on activity expansion controls

**Expected Result:**
- Primary color consistent across all buttons (same hex code or RGB)
- Alert colors consistent: Red for danger, Green for safe, Yellow for warning, Blue for info
- No pages use different color schemes
- Color usage is intentional, not random

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Notes:** 
- Document the primary color hex code: ________
- Document alert colors: Safe = _______, Alert = _______, Warning = _______

**Screenshot:** [Attach comparison of colors across pages]

---

## Test Case 1.2: Typography Consistency

**TC-1.2**  
**Title:** Font Family, Font Size, and Font Weight Consistent Across All Pages  
**Prerequisites:** App is running

**Steps:**
1. Open Chrome DevTools (F12) → Elements tab
2. Navigate to Landing Page
3. Inspect the main heading (h1) "TravelBuddy" or similar
   - Note: Font family, size, weight
   - Example: `font-family: 'Inter', sans-serif; font-size: 2.5rem; font-weight: 700;`
4. Navigate to Trip Dashboard
5. Inspect the page title
   - Verify same font family and weight as h1 on Landing Page
   - Font size can differ (use h1 sizing standards)
6. Navigate to each component and inspect:
   - Section headings (h2): Should be consistent in font family, weight, size ratio
   - Body text (p tags): Should be 14–16px, same font family
   - Button text: Should be same font family, 600+ weight
   - Form labels: Should be consistent
7. Record all font properties in a table

**Expected Result:**
- All headings use same font family (e.g., "Inter", "Roboto", "Poppins")
- Font weight progression: H1 (700) → H2 (600) → H3 (500) → Body (400) → Light (300)
- All body text is 14–16px
- No random font switches
- Font should be legible on all sizes

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Font Family Used:** _________________  
**Heading Font Sizes:** H1=____, H2=____, H3=____  
**Body Font Size:** ____px

**Notes:** [Any font inconsistencies found]

**Screenshot:** [Attach DevTools inspected element showing font properties]

---

## Test Case 1.3: Spacing & Alignment Consistency

**TC-1.3**  
**Title:** Padding, Margins, and Element Alignment Follow Consistent Grid System  
**Prerequisites:** App is running

**Steps:**
1. Open Chrome DevTools → Rendering tab → Show paint flashing
2. Navigate to Landing Page
3. Inspect spacing around:
   - Page margins (space from page edge to content): Should be 16px, 24px, or 32px
   - Card padding (space inside cards): Should be consistent
   - Between sections: Should be consistent vertical spacing
4. Use the ruler/grid overlay in DevTools to measure spacing
5. Navigate to Trip Dashboard and measure same spacing points
6. Check all components for:
   - Button spacing (distance between buttons)
   - Input field padding
   - Gap between form fields
   - Icon and text alignment within buttons
7. Verify alignment:
   - Text is left-aligned in most cases
   - Center-aligned only for hero sections or modals
   - No misaligned text or floating elements

**Expected Result:**
- All margins/padding follow a consistent scale (e.g., 8px, 16px, 24px, 32px)
- Vertical spacing between sections is consistent (24px, 32px, etc.)
- Horizontal padding consistent (16px sides on mobile, 24px on tablet, 32px on desktop)
- No "random" spacing that breaks the pattern
- All elements properly aligned (no text hanging off edges)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Spacing Scale Used:** 8px / 16px / 24px / 32px / [other: _____]  
**Page Margins:** Vertical=___px, Horizontal=___px  
**Card Padding:** ___px

**Notes:** [Alignment issues, if any]

**Screenshot:** [Attach DevTools with measurements overlay]

---

## Test Case 1.4: Logo & Branding Visibility on All Pages

**TC-1.4**  
**Title:** Logo and Branding Visible on All Pages and in PDF Export  
**Prerequisites:** App is running, user is logged in (for dashboard access)

**Steps:**
1. Navigate to Landing Page
   - Verify logo is visible in top-left header
   - Verify logo is clickable → Returns to home
   - Note logo size and styling
2. Click "Plan a Trip" or similar → Navigate to Trip Dashboard
   - Verify same logo visible in header
   - Verify logo is same size and styling as Landing Page
3. Verify logo on:
   - Budget Planner tab
   - Safety Dashboard tab
   - Best Places tab
   - Route Optimizer tab
   - Time Management tab
4. Navigate to any form (Registration, Trip Planning)
   - Verify branding elements (logo, brand color, brand tagline if applicable)
5. Complete a trip plan and generate PDF:
   - Click "Export as PDF" button
   - Download completes successfully
   - Open PDF file
   - Verify logo appears in PDF header/footer
   - Verify brand colors appear in PDF (not black & white)

**Expected Result:**
- Logo visible on all pages, consistent size and placement
- Logo clickable and navigates to home
- Branding (colors, fonts, logo) present in PDF export
- Logo not pixelated (use SVG or high-res PNG)
- PDF export maintains brand colors and logo quality

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Logo Location Verified:** [ ] Landing Page  [ ] Dashboard  [ ] All tabs  [ ] PDF  

**Logo Clickable:** [ ] Yes  [ ] No  

**Notes:** [Logo quality, sizing, PDF export issues]

**Screenshot:** [Logo on Landing Page, Logo on Dashboard, Logo in PDF]

---

## Summary of Phase 1 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-1.1 | Color Consistency | [ ] | [ ] | |
| TC-1.2 | Typography | [ ] | [ ] | |
| TC-1.3 | Spacing & Alignment | [ ] | [ ] | |
| TC-1.4 | Logo & Branding | [ ] | [ ] | |

**Phase 1 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 2: Responsiveness Testing](PHASE_02_Responsiveness.md)
