# TravelBuddy UI/UX Test Cases - Complete Manual Testing Guide

**Project:** TravelBuddy (React Frontend + Spring Boot Backend)  
**Test Type:** Manual UI/UX Testing  
**Test Date Range:** [TO BE FILLED BY TESTER]  
**Tester Name:** [TO BE FILLED BY TESTER]  
**Build/Version:** [TO BE FILLED BY TESTER]

---

## 📋 Test Case Index

This document contains detailed step-by-step manual test cases across all 11 phases:

1. **[PHASE 1: Visual Design Consistency](PHASE_01_Visual_Design.md)** — Color scheme, typography, spacing, logo consistency
2. **[PHASE 2: Responsiveness Testing](PHASE_02_Responsiveness.md)** — Mobile, tablet, desktop layouts; no horizontal scroll
3. **[PHASE 3: Navigation & Usability](PHASE_03_Navigation.md)** — Links, buttons, navigation menu, user reach
4. **[PHASE 4: Page Load & Performance](PHASE_04_Performance.md)** — Load times, image optimization, animations, lazy loading
5. **[PHASE 5: Forms & Input Validation](PHASE_05_Forms_Validation.md)** — Registration, trip planning, data persistence
6. **[PHASE 6: Accessibility Basics](PHASE_06_Accessibility.md)** — Contrast, button labels, alt text, keyboard navigation
7. **[PHASE 7: User Flow Testing](PHASE_07_User_Flows.md)** — Registration → Save Trip, Budget comparison, Safety, Routes, Itinerary, Chat, PDF export
8. **[PHASE 8: Error Handling](PHASE_08_Error_Handling.md)** — API errors, validation errors, 404 pages, graceful degradation
9. **[PHASE 9: UX Clarity](PHASE_09_UX_Clarity.md)** — Instructions, button names, workflow simplicity, terminology
10. **[PHASE 10: Cross-Browser Testing](PHASE_10_Cross_Browser.md)** — Chrome, Firefox, Edge consistency
11. **[PHASE 11: College Project Bonus](PHASE_11_Bonus_Items.md)** — Spinner, success toasts, delete confirmation, icons

---

## 🚀 How to Use This Test Plan

### For Each Test Case:
1. **Read the test case** from the appropriate phase document
2. **Perform the steps** exactly as written
3. **Record the result** (✓ PASS or ✗ FAIL) in the [Test Results Tracking Sheet](TEST_RESULTS.md)
4. **Take screenshots** for critical issues or bonus items
5. **Document any bugs** in the [Known Issues Log](KNOWN_ISSUES.md)

### Test Execution Order:
- **Day 1:** Phases 1–3 (Visual design, Responsiveness, Navigation)
- **Day 2:** Phases 4–6 (Performance, Forms, Accessibility)
- **Day 3:** Phases 7–9 (User flows, Error handling, UX clarity)
- **Day 4:** Phases 10–11 (Cross-browser, Bonus items)

---

## 🎯 Key Success Metrics

For successful submission, ensure:
- ✅ All critical user flows pass (Phase 7)
- ✅ No broken links or navigation issues
- ✅ Forms validate correctly and data persists
- ✅ Responsive design works on 3 device sizes
- ✅ Error messages are helpful (no blank pages)
- ✅ All 5 bonus items present
- ✅ Cross-browser consistency verified
- ✅ Test documentation complete with screenshots

---

## 📊 Test Results Summary

| Phase | Total Test Cases | Passed | Failed | Pass Rate |
|-------|------------------|--------|--------|-----------|
| 1. Visual Design | 4 | _ | _ | _% |
| 2. Responsiveness | 3 | _ | _ | _% |
| 3. Navigation | 4 | _ | _ | _% |
| 4. Performance | 4 | _ | _ | _% |
| 5. Forms & Validation | 4 | _ | _ | _% |
| 6. Accessibility | 4 | _ | _ | _% |
| 7. User Flows | 7 | _ | _ | _% |
| 8. Error Handling | 5 | _ | _ | _% |
| 9. UX Clarity | 4 | _ | _ | _% |
| 10. Cross-Browser | 3 | _ | _ | _% |
| 11. Bonus Items | 5 | _ | _ | _% |
| **TOTAL** | **47** | **_** | **_** | **_%** |

---

## 📝 Supporting Documents

- **[TEST_RESULTS.md](TEST_RESULTS.md)** — Detailed pass/fail tracking for each test case
- **[KNOWN_ISSUES.md](KNOWN_ISSUES.md)** — Log of bugs found with severity and reproduction steps
- **[SCREENSHOTS_FOLDER](SCREENSHOTS/)** — Folder for storing test screenshots and videos
- **[BROWSER_COMPARISON.md](BROWSER_COMPARISON.md)** — Side-by-side browser comparison results

---

## 🔍 Critical Test Cases (Must Pass for Submission)

These test cases are **mandatory** and must pass:

- **TC-7.1:** Registration → Trip Generation → Save Trip → Logout/Login → Trip persists ✓
- **TC-7.2:** Budget Tier Comparison — 3 tiers display with accurate costs ✓
- **TC-5.4:** Form Validation — Invalid inputs rejected with error messages ✓
- **TC-3.1:** Navigation — All links work, reach any page in ≤3 clicks ✓
- **TC-2.1:** Responsive Design — Mobile layout renders correctly ✓
- **TC-8.2:** Error Messages — No blank pages, helpful error text displays ✓
- **TC-11.1:** Loading Spinner — Visible during trip generation ✓
- **TC-11.2:** Success Toast — Appears after trip save ✓

---

## 🛠️ Tools You'll Need

- **Chrome DevTools** — For performance monitoring, console errors, responsive design testing
- **Firefox Developer Tools** — For cross-browser testing
- **Edge Developer Tools** — For cross-browser testing
- **Lighthouse** (Chrome) — For page performance analysis
- **WAVE Accessibility Checker** — For accessibility testing
- **Screenshot tool** (Snagit, ShareX, or built-in) — For documenting results
- **Real mobile device** (optional but recommended) — For responsive testing

---

## 📱 Test Environments

### Device Sizes to Test:
- **Mobile:** iPhone 12 (390×844) / Pixel 6 (412×915) / iPad Mini (768×1024)
- **Tablet:** iPad Air (820×1180) / Samsung Tab (1024×768)
- **Desktop:** 1280×720, 1440×900, 1920×1080

### Browsers to Test:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)

---

## 📞 Contact & Support

If you encounter issues or need clarification on any test case:
1. Check the specific phase document for more details
2. Consult the example test case format at the top of each phase document
3. Document the issue in KNOWN_ISSUES.md with reproduction steps

---

**Last Updated:** April 29, 2026  
**Next Review:** [TO BE FILLED]
