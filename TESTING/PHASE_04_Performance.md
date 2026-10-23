# PHASE 4: Page Load & Performance Test Cases

**Objective:** Verify pages load quickly (<2–3 seconds), images are optimized, animations are smooth, and lazy loading works.

---

## Test Case 4.1: Page Load Time Within 2–3 Seconds

**TC-4.1**  
**Title:** Landing Page and Dashboard Load Within Acceptable Time Frame  
**Prerequisites:** Chrome DevTools open, Network throttling disabled initially

**Steps:**
1. Open Chrome DevTools (F12) → Network tab
2. Check "Disable cache" checkbox (forces fresh load)
3. Navigate to Landing Page
   - Watch Network tab → Note the Finish time (bottom of tab)
   - Load time should be <3 seconds
   - Document: _______ seconds
4. Clear cache and navigate to Trip Dashboard (requires login)
   - Load time should be <2 seconds (might be cached backend)
   - Document: _______ seconds
5. Test on slower network (simulate):
   - DevTools → Network tab → Throttling dropdown
   - Select "Slow 3G" or "4G"
   - Reload Landing Page
   - Should still load within 5–6 seconds
   - Document load time: _______ seconds
6. Open DevTools → Performance tab
   - Click reload → Record performance
   - Wait until page fully loads
   - Check for:
     - First Contentful Paint (FCP) < 2 seconds
     - Largest Contentful Paint (LCP) < 2.5 seconds
7. Generate a trip itinerary:
   - This may take longer due to backend processing
   - LoadingScreen should display with spinner
   - Total time from click to itinerary display: _______ seconds
   - Spinner should display entire time (not disappear prematurely)

**Expected Result:**
- Landing Page loads in <3 seconds
- Dashboard loads in <2 seconds
- First paint visible within <2 seconds
- Even on slow network, loads within 5–6 seconds
- LoadingScreen displays during backend processing
- No blank page or long white screen

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Load Time Measurements:**
| Page | Normal Network | Slow 3G | FCP | LCP |
|------|----------------|---------|-----|-----|
| Landing | ___s | ___s | ___s | ___s |
| Dashboard | ___s | ___s | ___s | ___s |
| Trip Generation | ___s | ___s | - | - |

**Issues Found:**
- [ ] Landing Page >3 seconds
- [ ] Dashboard >2 seconds
- [ ] Slow 3G >6 seconds
- [ ] Blank page visible
- [ ] Other: _______________________

**Screenshot:** [Network tab timing, Performance metrics, Slow 3G network throttling test]

**Notes:** _________________________________

---

## Test Case 4.2: Images Are Optimized (<500KB Each)

**TC-4.2**  
**Title:** Images Load Quickly and Don't Exceed Size Limits  
**Prerequisites:** Chrome DevTools open

**Steps:**
1. Navigate to Best Places component (attractions with images)
2. Open DevTools → Network tab
3. Filter by "Images" (or look at all files)
4. Check each image:
   - File size should be <500KB each
   - Document file sizes: [Image 1: ___KB] [Image 2: ___KB] etc.
   - Format should be optimized (JPEG, PNG, WebP — not BMP or TIFF)
5. Check image loading time:
   - Each image should load <1 second
   - Document load times
6. Navigate to other image-heavy components:
   - Safety Dashboard (if has icons/images)
   - Route Optimizer (map tiles)
   - Verify all images load quickly
7. Test on slow network:
   - Enable "Slow 3G" throttling
   - Scroll through attractions
   - Images should load with placeholder first, then appear
   - No broken image icons (should show alt text or placeholder)
8. Check for missing images:
   - Any image with red X or broken link? [ ] Yes [ ] No
   - If yes, note: ________________

**Expected Result:**
- All images <500KB each
- Load time <1 second per image
- Optimized format (JPEG/PNG/WebP)
- No broken images
- Missing images show placeholder + alt text (not red X)
- Images are responsive (scale on mobile)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Image Audit:**
| Image | File Size | Format | Load Time | Status |
|-------|-----------|--------|-----------|--------|
| Attraction 1 | ___KB | PNG/JPEG/WebP | ___s | ✓/✗ |
| Attraction 2 | ___KB | PNG/JPEG/WebP | ___s | ✓/✗ |
| Logo | ___KB | PNG/SVG/WebP | ___s | ✓/✗ |

**Oversized Images (>500KB):**
- _________________ (Size: ___KB)

**Broken/Missing Images:**
- _________________

**Screenshot:** [Network tab image list, Individual image properties, Placeholder images on slow network]

**Notes:** _________________________________

---

## Test Case 4.3: Smooth Animations and Transitions

**TC-4.3**  
**Title:** UI Animations Are Smooth, No Stuttering or Janky Transitions  
**Prerequisites:** App is running, DevTools open

**Steps:**
1. Navigate to Trip Dashboard
2. Test tab switching animation:
   - Click "Budget" tab → Should smoothly transition (fade or slide)
   - Not instant and jarring
   - Duration ~300–500ms (feels natural)
   - Record: Animation duration = ___ms, Smooth? [ ] Yes [ ] No
3. Test budget tier selection:
   - Click "Select" on a budget tier
   - Should smoothly highlight the tier
   - Other tiers should fade/dim
   - Smooth? [ ] Yes [ ] No
4. Test itinerary expand/collapse:
   - Click activity in Time Management
   - Should smoothly expand/collapse (not instant pop)
   - Smooth? [ ] Yes [ ] No
5. Test map interactions (Route Optimizer):
   - Pan/zoom map
   - Should be fluid (not laggy)
   - Smooth? [ ] Yes [ ] No
6. Open DevTools → Performance tab:
   - Record while switching tabs
   - Check for frame drops (should maintain 60 FPS)
   - Any long tasks (>50ms)? [ ] Yes [ ] No
7. Open DevTools → Rendering tab:
   - Check "Show paint timing"
   - Trigger animations
   - Watch for excessive repaints (paint flashing in green)

**Expected Result:**
- All animations smooth (60 FPS)
- Transitions feel natural (not too fast, not too slow)
- No stuttering or janky movement
- Tab switching smooth
- Form interactions smooth
- Map interactions fluid
- No long rendering tasks (>50ms)

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Animation Smoothness:**
- [ ] Tab Switching: Smooth [ ] Stutters [ ] Lag
- [ ] Budget Selection: Smooth [ ] Stutters [ ] Lag
- [ ] Itinerary Expand: Smooth [ ] Stutters [ ] Lag
- [ ] Map Interactions: Smooth [ ] Stutters [ ] Lag

**Frame Rate Issues:**
- [ ] Maintains 60 FPS
- [ ] Drops to <30 FPS in areas: _________________
- [ ] Long tasks detected (>50ms): [ ] Yes [ ] No

**Screenshot:** [Performance metrics showing frame rate, Paint timing visualization]

**Notes:** _________________________________

---

## Test Case 4.4: Lazy Loading for Large Datasets

**TC-4.4**  
**Title:** Content Loads As User Scrolls (Pagination or Infinite Scroll Works)  
**Prerequisites:** App is running, Best Places component loaded with many attractions

**Steps:**
1. Navigate to Best Places component
2. Observe initial load:
   - How many attractions shown initially? _____ items
   - Initial load time fast? [ ] Yes [ ] No
3. Scroll down to bottom of list:
   - Do more items appear? [ ] Yes [ ] No
   - Is there a "Load More" button? [ ] Yes [ ] No
   - Document behavior: ___________________________
4. If infinite scroll:
   - Continue scrolling
   - New items should load automatically
   - No noticeable delay between scroll and new items appearing
   - Smooth? [ ] Yes [ ] No
5. If "Load More" button:
   - Click button
   - New items appear
   - Button still available for more [ ] Yes [ ] No
6. Test with slow network:
   - Enable "Slow 3G"
   - Scroll to trigger load
   - Loading indicator appears? [ ] Yes [ ] No
   - Items appear after delay? [ ] Yes [ ] No
7. Scroll back to top:
   - Previously loaded items still visible? [ ] Yes [ ] No
   - Scroll position maintained? [ ] Yes [ ] No

**Expected Result:**
- Initial load fast (shows ~10–20 items first)
- Additional items load as user scrolls (pagination or infinite scroll)
- No jank or long waits between item loads
- Loading indicator visible during fetch
- Scrolling back shows previously loaded items

**Actual Result:** [FILL DURING TESTING]

**Status:** [ ] PASS  [ ] FAIL  [ ] BLOCKED

**Lazy Loading Method:**
- [ ] Infinite Scroll
- [ ] Pagination ("Load More" button)
- [ ] Other: ___________________________

**Load Behavior:**
- Initial items loaded: _____ 
- Load time for additional items: ___s
- Smooth scrolling? [ ] Yes [ ] No
- Loading indicator visible? [ ] Yes [ ] No
- Items retained on scroll back? [ ] Yes [ ] No

**Issues Found:**
- [ ] Items don't load on scroll
- [ ] Scroll position not maintained
- [ ] Loading indicator missing
- [ ] Other: _______________________

**Screenshot:** [Initial load, After scrolling, Loading indicator, Slow network test]

**Notes:** _________________________________

---

## Summary of Phase 4 Results

| Test Case | Title | Pass | Fail | Notes |
|-----------|-------|------|------|-------|
| TC-4.1 | Load Time | [ ] | [ ] | |
| TC-4.2 | Image Optimization | [ ] | [ ] | |
| TC-4.3 | Smooth Animations | [ ] | [ ] | |
| TC-4.4 | Lazy Loading | [ ] | [ ] | |

**Phase 4 Overall:** [ ] ALL PASSED  [ ] SOME ISSUES  [ ] CRITICAL FAILURES

**Next Step:** Proceed to [PHASE 5: Forms & Input Validation](PHASE_05_Forms_Validation.md)
