# Quick Reference Testing Checklist

Print this page for quick reference during testing!

---

## 🎯 Critical Tests (MUST PASS)

### Day 1 Priority - TC-7.1 (First Thing!)
```
[ ] Register new user
[ ] Generate trip to destination
[ ] Save the trip
[ ] Logout
[ ] Login again
[ ] Verify trip still exists
Result: [ ] ✓ PASS  [ ] ✗ FAIL
```
**⚠️ If this fails, submit cannot proceed.**

---

## 📱 Device Testing Breakpoints

- **Mobile:** 375px–480px (iPhone 12, iPhone 14)
- **Tablet:** 768px–1024px (iPad)
- **Desktop:** 1280px+ (Monitor)

**Test all three!**

---

## 🌐 Browser Testing

Test in all three browsers:
1. [ ] Google Chrome
2. [ ] Mozilla Firefox  
3. [ ] Microsoft Edge

**Chrome first (baseline), then compare others.**

---

## 🔥 5 Bonus Items (15% Extra Credit)

Test each one:

- [ ] **1. Loading Spinner** — Animated spinner during trip generation (TC-11.1)
- [ ] **2. Success Toast** — Green message after save (TC-11.2)
- [ ] **3. Delete Modal** — Confirmation before delete (TC-11.3)
- [ ] **4. Icons** — Used throughout app (TC-11.4)
- [ ] **5. Confirmations** — For critical actions (TC-11.5)

**All 5 = +15% bonus | 4 = +10% | 3 = +5%**

---

## 📊 Quick Progress Tracker

### Phase 1: Visual Design (4 tests)
- [ ] TC-1.1 Color scheme
- [ ] TC-1.2 Typography
- [ ] TC-1.3 Spacing
- [ ] TC-1.4 Logo
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 2: Responsiveness (4 tests)
- [ ] TC-2.1 Mobile (375px)
- [ ] TC-2.2 Tablet (768px)
- [ ] TC-2.3 Desktop (1280px)
- [ ] TC-2.4 No horizontal scroll
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 3: Navigation (4 tests)
- [ ] TC-3.1 All links functional
- [ ] TC-3.2 Menu clear
- [ ] TC-3.3 3-click rule
- [ ] TC-3.4 Back button
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 4: Performance (4 tests)
- [ ] TC-4.1 Load time <3 sec
- [ ] TC-4.2 Images <500KB
- [ ] TC-4.3 Smooth animations
- [ ] TC-4.4 Lazy loading
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 5: Forms & Validation (3 tests) ⭐ CRITICAL
- [ ] TC-5.1 Registration validation
- [ ] TC-5.2 Trip form validation
- [ ] TC-5.3 Data persistence ⭐⭐⭐
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 6: Accessibility (4 tests)
- [ ] TC-6.1 Text contrast (4.5:1)
- [ ] TC-6.2 Button labels
- [ ] TC-6.3 Image alt text
- [ ] TC-6.4 Keyboard nav
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 7: User Flows (7 tests) ⭐ CRITICAL
- [ ] TC-7.1 Registration → Persistence ⭐⭐⭐
- [ ] TC-7.2 Budget planner
- [ ] TC-7.3 Safety dashboard
- [ ] TC-7.4 Route optimizer
- [ ] TC-7.5 Time management
- [ ] TC-7.6 AI chat
- [ ] TC-7.7 PDF export
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 8: Error Handling (5 tests)
- [ ] TC-8.1 Server errors
- [ ] TC-8.2 Validation errors
- [ ] TC-8.3 404 pages
- [ ] TC-8.4 Missing data
- [ ] TC-8.5 Timeout
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 9: UX Clarity (4 tests)
- [ ] TC-9.1 Clear instructions
- [ ] TC-9.2 Meaningful button names
- [ ] TC-9.3 Simple workflow
- [ ] TC-9.4 Consistent terminology
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 10: Cross-Browser (4 tests)
- [ ] TC-10.1 Chrome baseline
- [ ] TC-10.2 Firefox comparison
- [ ] TC-10.3 Edge comparison
- [ ] TC-10.4 Summary matrix
**Status:** [ ] All PASS  [ ] Some FAIL

### Phase 11: Bonus Items (5 tests) 🔥
- [ ] TC-11.1 Loading spinner ⭐
- [ ] TC-11.2 Success toast ⭐
- [ ] TC-11.3 Delete modal ⭐
- [ ] TC-11.4 Icons ⭐
- [ ] TC-11.5 Confirmations ⭐
**Status:** [ ] All 5 present (+15%)  [ ] 4 present (+10%)  [ ] 3 present (+5%)

---

## 🐛 Critical Bugs to Watch For

- **No data persistence** after logout/login ❌
- **Broken links or buttons** ❌
- **Blank pages on errors** ❌
- **Horizontal scrollbar** on mobile ❌
- **Form doesn't validate** ❌
- **Images missing or broken** ❌
- **Console errors** (DevTools) ❌
- **Slow page load** (>3 seconds) ❌

---

## 📸 Screenshots to Capture

Minimum required:
- [ ] Landing page
- [ ] Registration form
- [ ] Trip dashboard
- [ ] Budget planner (3 tiers)
- [ ] Safety dashboard
- [ ] Route optimizer
- [ ] Time management
- [ ] PDF export
- [ ] Mobile view (responsive)
- [ ] Tablet view (responsive)
- [ ] Desktop view
- [ ] Error message example
- [ ] Loading spinner (animated)
- [ ] Success toast
- [ ] Delete confirmation modal
- [ ] Chrome version
- [ ] Firefox version
- [ ] Edge version
- [ ] Keyboard navigation demo
- [ ] Accessibility audit

**Total: 20+ screenshots minimum**

---

## ⏱️ Testing Timeline

**Day 1 (Morning):** Phases 1–3 (2 hours)  
[ ] ✓ Complete

**Day 2 (Morning):** Phases 4–6 (2.5 hours)  
[ ] ✓ Complete

**Day 3 (Morning):** Phases 7–9 (3 hours)  
[ ] ✓ Complete

**Day 4 (Morning):** Phases 10–11 (3 hours)  
[ ] ✓ Complete

**Total: 10–12 hours over 4 days**

---

## ✅ Final Submission Checklist

Before submitting to college:

- [ ] **CRITICAL:** TC-7.1 PASSES (Persistence works)
- [ ] **CRITICAL:** TC-5.3 PASSES (Forms validate, data saves)
- [ ] **CRITICAL:** TC-3.1 PASSES (All links work)
- [ ] **CRITICAL:** TC-2.1 PASSES (Mobile responsive)
- [ ] **CRITICAL:** All Phase 8 tests PASS (No blank error pages)
- [ ] 90%+ of all 47 tests PASS (42+ passing)
- [ ] All 5 bonus items present and working
- [ ] TEST_RESULTS.md fully filled in
- [ ] KNOWN_ISSUES.md documented (if any)
- [ ] 20+ screenshots captured and organized
- [ ] Cross-browser testing completed
- [ ] No console errors (DevTools)
- [ ] Performance verified (<3 sec load)
- [ ] Accessibility basics verified
- [ ] Tester sign-off completed

---

## 🚀 Ready? Start Here

1. [ ] Open TESTING/README.md
2. [ ] Open TESTING/TEST_CASES_INDEX.md
3. [ ] Start with TESTING/PHASE_01_Visual_Design.md
4. [ ] Follow the 4-day schedule above
5. [ ] Track in TEST_RESULTS.md
6. [ ] Submit when all checks pass! ✓

---

## 📞 Need Help?

- Test case unclear? → Read the full phase document
- Don't understand a test? → Check the example in the test case
- Found a bug? → Document in KNOWN_ISSUES.md
- Have a question? → Review TEST_CASES_INDEX.md for context

---

**Let's get this submission ready! 🎓✨**

*Time to complete all testing: 10–12 hours*  
*Quality impact on grade: +25–30% (critical for good marks)*  
*Bonus potential: +15% (for all 5 bonus items)*
