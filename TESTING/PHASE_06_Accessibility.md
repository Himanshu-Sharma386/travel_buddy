# PHASE 6: Accessibility Basics Test Cases

**Objective:** Verify text contrast, button labels, alt text on images, and basic keyboard navigation.

---

## Test Case 6.1: Text Contrast Is Readable (WCAG AA Compliant)

**TC-6.1**  
**Title:** All Text Has Sufficient Contrast Against Background (WCAG AA Standard 4.5:1)  
**Prerequisites:** Chrome installed with WAVE or WebAIM Contrast Checker extension

**Steps:**
1. Install WebAIM Contrast Checker extension:
   - https://chrome.google.com/webstore → Search "WebAIM Contrast Checker"
   - Install and enable
2. Navigate to Landing Page
3. Use Contrast Checker on various text elements:
   - Main heading text → Check contrast ratio
     - Result: _____:1 (Goal: ≥4.5:1)
     - Status: ✓ Pass [ ] Fail
   - Body text (paragraphs) → Check contrast ratio
     - Result: _____:1
     - Status: ✓ Pass [ ] Fail
   - Button text → Check contrast ratio
     - Result: _____:1
     - Status: ✓ Pass [ ] Fail
   - Navigation menu items → Check contrast ratio
     - Result: _____:1
     - Status: ✓ Pass [ ] Fail
4. Navigate to Trip Dashboard
5. Check contrast on:
   - Tab labels (active and inactive)
   - Budget tier cards (title and price text)
   - Schedule text in itinerary
   - Safety alert text (especially important for alerts)
6. Check special cases:
   - Alert/Warning text (red on light background) → Check ratio
   - Success message (green on white) → Check ratio
   - Links (if any) → Check contrast
7. Optional: Use Chrome DevTools color picker:
   - Inspect element → Drag eyedropper over text
   - Manually note background and text color
   - Calculate or use Contrast Checker on these colors
8. Any text failing WCAG AA?
   - List failing elements: _______________________

**Expected Result:**
- All body text: Contrast ≥4.5:1
- Headings: Contrast ≥4.5:1
- Buttons: Contrast ≥4.5:1
- Alert/Warning text: Contrast ≥7:1 (even higher)
- No text is hard to read (gray on light gray, etc.)
- All text passes WCAG AA standard

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Contrast Audit:**
| Element | Foreground Color | Background Color | Ratio | Status |
|---------|------------------|------------------|-------|--------|
| Body text | _______ | _______ | _:1 | ✓/✗ |
| Heading | _______ | _______ | _:1 | ✓/✗ |
| Button | _______ | _______ | _:1 | ✓/✗ |
| Alert text | _______ | _______ | _:1 | ✓/✗ |
| Link | _______ | _______ | _:1 | ✓/✗ |

**Failing Elements (Contrast <4.5:1):**
- _________________ (Ratio: _:1, Goal: 4.5:1)
- _________________ (Ratio: _:1, Goal: 4.5:1)

**Screenshot:** [Contrast Checker results, WAVE Audit results]

**Notes:** _________________________________

---

## Test Case 6.2: All Buttons Have Labels/Icons

**TC-6.2**  
**Title:** Every Button Has Visible Text Label or Clear Icon with aria-label  
**Prerequisites:** App is running, DevTools open

**Steps:**
1. Navigate through all pages and identify buttons
2. For each button, check:
   - Does it have visible text label? [ ] Yes [ ] No
   - If not, does it have an icon? [ ] Yes [ ] No
   - If icon-only, does it have aria-label? [ ] Yes [ ] No
3. Inspect buttons in DevTools:
   - Right-click button → Inspect
   - Check for:
     - Inner text (between <button> tags)
     - aria-label attribute
     - title attribute
4. Check specific buttons:
   - "Save Trip" button → Has label "Save Trip" [ ] Yes [ ] No
   - "Generate Itinerary" button → Has label "Generate Itinerary" [ ] Yes [ ] No
   - "Select Budget" (on each tier) → Has label "Select Budget Tier: [Tier Name]" or similar [ ] Yes [ ] No
   - Close/X button (if modal) → Has aria-label="Close" [ ] Yes [ ] No
   - Menu toggle (hamburger) → Has aria-label="Open Menu" [ ] Yes [ ] No
5. Examples of good button labels:
   - ✓ "Save Trip"
   - ✓ "Generate Itinerary"
   - ✓ "View Safety Alerts"
   - ✗ "Submit" (too generic)
   - ✗ "→" (no label)
   - ✗ Button with only icon and no aria-label
6. Document all buttons found and their labels:

**Expected Result:**
- Every button has either:
  - Visible text label OR
  - aria-label attribute OR
  - title attribute (for hover tooltip)
- Button text is meaningful (not generic "Click here" or "Submit")
- Icon-only buttons have aria-label
- Action buttons clearly describe action (e.g., "Save Trip", not "Go")

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Button Audit:**
| Button | Label/Text | aria-label | Status |
|--------|-----------|-----------|--------|
| Save Trip | "Save Trip" | - | ✓ |
| Generate | "Generate Itinerary" | - | ✓ |
| Select Tier | "Select [Tier]" | - | ✓ |
| Close Modal | - | "Close" | ✓ |
| Menu Toggle | - | "Open Menu" | ✓ |
| [Other] | _________ | _________ | ✓/✗ |

**Unlabeled Buttons Found:**
- _________________ (Location: __________)
- _________________ (Location: __________)

**Generic Labels Found (Should Improve):**
- "Submit" → Suggest: "________________________"
- "Click here" → Suggest: "________________________"

**Screenshot:** [Button label audit, aria-label inspection in DevTools]

**Notes:** _________________________________

---

## Test Case 6.3: Images Have Alt Text

**TC-6.3**  
**Title:** All Images Have Descriptive Alt Text for Accessibility  
**Prerequisites:** App is running, DevTools open

**Steps:**
1. Navigate to pages with images (Best Places, Logo, etc.)
2. Inspect each image:
   - Right-click image → Inspect
   - Look for alt attribute
   - Document the alt text
3. Check specific images:
   - Attraction images in Best Places:
     - Eiffel Tower image → alt="Eiffel Tower in Paris" [ ] Yes [ ] No [ ] Missing alt
   - Logo:
     - Logo image → alt="TravelBuddy Logo" [ ] Yes [ ] No
   - Safety dashboard icons:
     - Safe icon → alt="Safe (4/5 stars)" [ ] Yes [ ] No
     - Alert icon → alt="Safety Alert" [ ] Yes [ ] No
4. Verify alt text quality:
   - Not empty (alt="") [ ]
   - Not generic (alt="image") [ ]
   - Not just the filename (alt="paris.jpg") [ ]
   - Descriptive (alt="Eiffel Tower at sunset in Paris") ✓
5. Test alt text functionality:
   - In DevTools, disable images (DevTools → Network tab → Throttling → Disconnect)
   - Reload page
   - Alt text should display where images would be
   - Is alt text visible? [ ] Yes [ ] No [ ] N/A (not tested)
6. List all images and their alt text:

**Expected Result:**
- All images have alt text (no empty alt="" or missing alt attribute)
- Alt text is descriptive and meaningful
- Alt text describes the image content (for accessibility readers)
- Decorative images have empty alt="" (alt="" is OK for decorations)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Image Alt Text Audit:**
| Image | Location | Alt Text | Descriptive? | Status |
|-------|----------|----------|-------------|--------|
| Attraction 1 | Best Places | "____________" | ✓/✗ | ✓/✗ |
| Attraction 2 | Best Places | "____________" | ✓/✗ | ✓/✗ |
| Logo | Header | "____________" | ✓/✗ | ✓/✗ |
| Icon - Safe | Safety Dash | "____________" | ✓/✗ | ✓/✗ |
| Icon - Alert | Safety Dash | "____________" | ✓/✗ | ✓/✗ |

**Missing Alt Text:**
- _________________ (Location: __________)
- _________________ (Location: __________)

**Poor Alt Text (Too Generic):**
- "image" → Improve to: "________________________"
- "photo" → Improve to: "________________________"

**Screenshot:** [Alt text in DevTools, Images with alt text displayed, Missing alt audit]

**Notes:** _________________________________

---

## Test Case 6.4: Keyboard Navigation Without Traps

**TC-6.4**  
**Title:** App Is Navigable Using Only Keyboard (Tab, Shift+Tab, Enter) Without Getting Stuck  
**Prerequisites:** App is running

**Steps:**
1. Close mouse and use keyboard only
2. Start on Landing Page
3. Press Tab repeatedly:
   - Should cycle through all interactive elements (buttons, links, inputs)
   - Order should be logical (left-to-right, top-to-bottom)
   - Tab order sequence: ___________________
4. Test specific flows:
   - Tab → Focus on "Plan Trip" button
   - Press Enter → Should trigger action [ ] Yes [ ] No
   - Tab → Focus on form input (Destination)
   - Type → Should accept input [ ] Yes [ ] No
   - Tab → Focus on "Submit" button
   - Press Enter → Should submit [ ] Yes [ ] No
5. Navigate through registration form:
   - Tab order: Name field → Email field → Password → Confirm → Submit [ ] Correct [ ] Wrong
   - Try to exit form with Tab:
     - Focus should wrap (Tab at end goes to start) [ ] Yes [ ] No
     - Or Tab should go to next section [ ] Yes [ ] No
6. Navigate to Trip Dashboard:
   - Tab through tabs:
     - Can select tabs via keyboard? [ ] Yes [ ] No
     - Method: [Tab + Enter] OR [Arrow keys] OR [Ctrl+Tab]
   - Tab through budget tiers:
     - Can select tier via keyboard? [ ] Yes [ ] No
7. Test for keyboard traps (focus gets stuck):
   - Tab repeatedly → Does focus ever get stuck? [ ] Yes [ ] No [ ] Cannot tell
   - If trapped, note location: _______________________
   - Can you escape with Escape key? [ ] Yes [ ] No
8. Test modals (if any):
   - Open modal (e.g., delete confirmation)
   - Tab within modal → Focus stays within modal [ ] Yes [ ] No
   - Press Escape → Modal closes [ ] Yes [ ] No
   - Focus returns to button that opened modal [ ] Yes [ ] No

**Expected Result:**
- All interactive elements reachable via Tab
- Tab order is logical and left-to-right
- Enter/Space activates buttons
- No keyboard traps (focus doesn't get stuck)
- Can navigate entire app with keyboard alone
- Modals trap focus (focus within modal) until closed
- Escape key closes modals/dialogs

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Keyboard Navigation Audit:**
- [ ] All elements reachable via Tab
- [ ] Tab order is logical
- [ ] Enter/Space activates buttons
- [ ] No keyboard traps
- [ ] Can complete registration via keyboard
- [ ] Can switch dashboard tabs via keyboard
- [ ] Escape closes modals

**Keyboard Trap Found:**
- Location: _______________________
- Description: _______________________
- Severity: [ ] Critical [ ] Major [ ] Minor

**Tab Order Issues:**
- Expected: Name → Email → Password → Confirm → Submit
- Actual: _______________________

**Screenshot:** [Tab focus visible (use CSS outline), Tab order sequence, Modal keyboard trap test]

**Notes:** _________________________________

---

## Summary of Phase 6 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-6.1 | Text Contrast | [ ] | [ ] | |
| TC-6.2 | Button Labels | [ ] | [ ] | |
| TC-6.3 | Image Alt Text | [ ] | [ ] | |
| TC-6.4 | Keyboard Navigation | [ ] | [ ] | |

**Phase 6 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 7: User Flow Testing](PHASE_07_User_Flows.md)
