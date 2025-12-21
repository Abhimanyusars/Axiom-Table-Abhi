# Testing Guide

## Quick Start Testing

```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000

# Build for production
npm run build

# Test production build
npm start
```

## Feature Testing Checklist

### 1. Token Table Display
- [ ] Table loads with mock data
- [ ] All columns are visible and aligned
- [ ] Token logos/emojis display correctly
- [ ] Verified badges show for verified tokens
- [ ] Trending tags display when applicable
- [ ] Contract addresses are truncated properly

### 2. Tab Navigation
- [ ] "New Pairs" tab shows new tokens
- [ ] "Final Stretch" tab shows final-stretch tokens
- [ ] "Migrated" tab shows migrated tokens
- [ ] "All" tab shows all tokens
- [ ] Tab counts are accurate
- [ ] Active tab is highlighted
- [ ] Tab switching is smooth (<100ms)

### 3. Sorting Functionality
- [ ] Click "Price" header to sort by price
- [ ] Click again to reverse sort direction
- [ ] Sort icons update correctly (↑ ↓)
- [ ] All sortable columns work:
  - [ ] Price
  - [ ] 24h %
  - [ ] Volume
  - [ ] Market Cap
  - [ ] Liquidity
  - [ ] Holders
- [ ] Sorting is fast (<50ms)

### 4. Search Functionality
- [ ] Search bar is visible and accessible
- [ ] Search by token symbol works
- [ ] Search by token name works
- [ ] Search by contract address works
- [ ] Results update in real-time
- [ ] "No tokens found" message when empty
- [ ] Clear search to reset

### 5. Real-time Price Updates
- [ ] Prices update automatically (every 3-5 seconds)
- [ ] Price cells flash green for increases
- [ ] Price cells flash red for decreases
- [ ] Color transitions are smooth (500ms)
- [ ] Multiple tokens update simultaneously
- [ ] Updates continue when table is filtered
- [ ] No memory leaks after 5+ minutes

### 6. Interactive Elements

#### Tooltips
- [ ] Hover over verified badge shows "Verified Token"
- [ ] Hover over liquidity shows full amount
- [ ] Tooltips appear smoothly
- [ ] Tooltips disappear when mouse leaves
- [ ] Tooltips are readable (good contrast)

#### Popovers
- [ ] Click info icon shows popover
- [ ] Popover content is formatted correctly
- [ ] Click outside closes popover
- [ ] Escape key closes popover
- [ ] Multiple popovers don't conflict

#### Modals
- [ ] Click token row opens modal
- [ ] Modal shows all token details
- [ ] Modal has smooth open/close animation
- [ ] Close button works
- [ ] Click outside closes modal
- [ ] Escape key closes modal
- [ ] Body scroll is locked when modal is open

### 7. Token Actions
- [ ] Copy address button works
- [ ] Copy shows success checkmark
- [ ] External link opens in new tab
- [ ] External link goes to correct explorer

### 8. Loading States
- [ ] Initial load shows skeleton
- [ ] Skeleton has shimmer effect
- [ ] Skeleton matches table layout
- [ ] Skeleton disappears when data loads
- [ ] No flash of unstyled content

### 9. Error Handling
- [ ] Error boundary catches errors
- [ ] Error message is user-friendly
- [ ] "Try Again" button works
- [ ] Console shows detailed error (dev mode)
- [ ] No console errors (production)

### 10. Responsive Design

#### Desktop (1024px+)
- [ ] Full table view
- [ ] All columns visible
- [ ] Proper spacing and alignment
- [ ] Hover effects work
- [ ] No horizontal scroll

#### Tablet (768px-1023px)
- [ ] Table adapts to smaller screen
- [ ] Columns remain readable
- [ ] Touch targets are adequate (44px+)
- [ ] No content clipping

#### Mobile (320px-767px)
- [ ] Card layout instead of table
- [ ] Cards show essential info
- [ ] Cards are tappable
- [ ] No horizontal scroll
- [ ] Text is readable (16px+ body text)
- [ ] Search bar is full width
- [ ] Tabs wrap properly

### 11. Performance

#### Initial Load
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] TTI < 3s
- [ ] No layout shift (CLS = 0)

#### Interactions
- [ ] Tab switching < 100ms
- [ ] Sorting < 100ms
- [ ] Search input responsive
- [ ] Modal open < 200ms
- [ ] Smooth animations (60fps)

#### Bundle Size
- [ ] Total JS < 200 KB
- [ ] No duplicate dependencies
- [ ] Tree-shaking working

### 12. Accessibility

#### Keyboard Navigation
- [ ] Tab through interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals/popovers
- [ ] Focus indicators visible
- [ ] Logical tab order

#### Screen Reader
- [ ] Images have alt text
- [ ] Buttons have labels
- [ ] Links are descriptive
- [ ] Table has proper semantics
- [ ] ARIA labels where needed

#### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Interactive elements ≥ 3:1
- [ ] Color not sole differentiator
- [ ] Focus indicators visible

## Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iOS Safari (iPhone)
- [ ] Chrome Android
- [ ] Samsung Internet

## Performance Testing Tools

### Lighthouse
```bash
# In Chrome DevTools
1. F12 to open DevTools
2. Lighthouse tab
3. Select all categories
4. Run on Desktop and Mobile
5. Verify scores ≥ 90
```

### Bundle Analysis
```bash
npm run build
# Check output for bundle sizes
# Main bundle should be ~87 KB
# Page bundle should be ~78 KB
```

### Network Throttling
```bash
# In Chrome DevTools
1. Network tab
2. Throttling: "Fast 3G"
3. Test page load
4. Should still be usable
```

## Manual Testing Script

### Happy Path (5 minutes)
1. Open app in browser
2. Wait for table to load
3. Switch between tabs (New Pairs, Final Stretch, Migrated)
4. Sort by Price (ascending, then descending)
5. Search for a token name
6. Click on a token to open modal
7. Copy contract address
8. Close modal
9. Wait 10 seconds to see price updates
10. Resize browser to mobile size
11. Verify card layout works

### Edge Cases (3 minutes)
1. Search for non-existent token
2. Verify "No tokens found" message
3. Clear search
4. Rapidly switch tabs
5. Click sort headers rapidly
6. Open multiple modals
7. Test with slow network (throttled)

## Automated Testing (Future)

```javascript
// Example test structure
describe('TokenTable', () => {
  it('should load and display tokens', () => {
    // Test implementation
  });
  
  it('should sort by price', () => {
    // Test implementation
  });
  
  it('should search tokens', () => {
    // Test implementation
  });
});
```

## Common Issues & Solutions

### Issue: Table not loading
- Check console for errors
- Verify network requests
- Check Redux DevTools state
- Rebuild node_modules

### Issue: Real-time updates not working
- Check useWebSocketPriceUpdates hook
- Verify dispatch is called
- Check Redux state updates
- Look for memory leaks

### Issue: Slow performance
- Check Lighthouse score
- Profile with React DevTools
- Check for unnecessary re-renders
- Verify memoization

### Issue: Styling broken
- Clear .next folder
- Rebuild: npm run build
- Check Tailwind config
- Verify CSS is loaded

## Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse scores ≥ 90
- [ ] All features work
- [ ] Responsive on all devices
- [ ] Accessible (keyboard + screen reader)
- [ ] Fast performance (<100ms interactions)
- [ ] Git committed
- [ ] README updated with URLs
- [ ] Video recorded and uploaded
- [ ] Deployed to Vercel

## Test Results Template

```markdown
# Test Results - [Date]

## Environment
- Browser: Chrome 120
- OS: macOS Sonoma
- Device: MacBook Pro 16"

## Lighthouse Scores
- Performance: 95/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

## Feature Tests
- ✅ Token display
- ✅ Tab navigation
- ✅ Sorting
- ✅ Search
- ✅ Real-time updates
- ✅ Modals
- ✅ Responsive design

## Performance
- FCP: 1.2s
- LCP: 1.8s
- TTI: 2.3s
- CLS: 0

## Issues Found
None

## Notes
All features working as expected. Performance is excellent.
```

