# Phase 7 Featured Listings - Style Reference Guide

## Quick Overview

All Phase 7 components have been updated to use the AvCon Design System with consistent, accessible styling that matches the existing portal aesthetic.

## Component Breakdown

### 1. FeaturedBadge.jsx
**Purpose**: Display featured listing status with expiry countdown

**Key Features**:
- ⭐ Icon with dynamic text
- Color changes based on expiry status (active = accent color, expired = muted)
- Compact version for inline display
- Full version for prominent display
- ARIA labels for screen readers

**Usage Examples**:
```jsx
// Compact badge (for listing cards)
<FeaturedBadge featured_until={listing.featured_until} compact={true} />

// Full badge (for detail views)
<FeaturedBadge featured_until={listing.featured_until} />
```

**Styling**:
- Active: Accent color background
- Expired: Muted surface background
- Proper color contrast ratios for accessibility

---

### 2. AdminFeaturedListingsManager.jsx
**Purpose**: Admin interface for managing featured listings

**Sections**:

#### Stats Dashboard
- Total Featured count
- Currently Active count
- Expired count
- Cards use CSS Grid responsive layout
- Color-coded values (primary, accent, muted)

#### Tab Navigation
- "Currently Featured" tab
- "Feature a Listing" tab
- Smooth active state transitions
- Keyboard accessible (`role="tab"`)

#### Featured Listings View
- List of currently featured items
- Shows featured duration and days remaining
- Analytics: views and clicks
- Unfeature button for quick management

#### Feature a Listing View
- Browse approved but unfeatured listings
- Quick feature action with one click

#### Feature Modal Dialog
- Duration selector (7, 14, 30, 60 days)
- Optional reason field
- Save and Cancel buttons
- Proper focus management

**Key Interactions**:
- Smooth hover effects on cards
- Shadow elevation on interaction
- Loading states during API calls
- Error messaging with proper styling

---

### 3. FeaturedListingsSection.jsx
**Purpose**: Public-facing featured opportunities showcase

**Key Features**:
- Responsive grid layout (4 columns on desktop, 2 on tablet, 1 on mobile)
- Featured badge with accent color
- Organization logo preview
- Category and location tags
- Description preview (truncated to 2 lines)
- "Learn More" link with hover effect

**Grid Layout**:
```css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
```

**Card Styling**:
- White background with subtle shadow
- Accent-colored left border (2px)
- Smooth hover effect (slight lift + enhanced shadow)
- Proper spacing between elements

**Typography Hierarchy**:
- Card title: Medium font, dark text
- Organization: Small font, muted text
- Tags: Extra small font, colored backgrounds
- Description: Extra small font, muted text

---

## Design System Constants

### Colors
```javascript
--avcon-primary         // #1e40af (main brand)
--avcon-primary-light   // #dbeafe (light variant)
--avcon-primary-dark    // #1e3a8a (dark variant)

--avcon-accent          // #ea580c (featured/premium)
--avcon-accent-light    // #ffefd5 (light variant)
--avcon-accent-dark     // #c23b00 (dark variant)

--avcon-error           // #dc2626 (alerts)
--avcon-error-light     // #fee2e2 (light variant)
--avcon-error-dark      // #991b1b (dark variant)

--avcon-text-dark       // #1f2937 (primary text)
--avcon-text-muted      // #6b7280 (secondary text)
--avcon-white           // #ffffff (background)
--avcon-surface         // #f9fafb (card background)
--avcon-border          // #e5e7eb (borders)
```

### Spacing Scale
```
--space-1  = 0.25rem (4px)
--space-2  = 0.5rem  (8px)
--space-3  = 0.75rem (12px)
--space-4  = 1rem    (16px)
--space-6  = 1.5rem  (24px)
--space-8  = 2rem    (32px)
--space-12 = 3rem    (48px)
```

### Typography
```
--avcon-font-small   = 0.875rem (14px)
--avcon-font-base    = 1rem     (16px)
--avcon-font-medium  = 1.125rem (18px)
--avcon-font-large   = 1.875rem (30px)
```

### Border Radius
```
--avcon-radius-small   = 0.375rem (6px)
--avcon-radius-medium  = 0.5rem   (8px)
```

### Shadows
```
--avcon-shadow-small   = 0 1px 2px 0 rgba(0,0,0,0.05)
--avcon-shadow-medium  = 0 4px 6px -1px rgba(0,0,0,0.1)
--avcon-shadow-large   = 0 10px 15px -3px rgba(0,0,0,0.1)
```

---

## Accessibility Features

### ARIA Landmarks
- Proper heading hierarchy
- Status updates announced to screen readers
- Dialog roles for modals
- Tab roles for navigation

### Keyboard Navigation
- All buttons and form fields are keyboard accessible
- Tab order follows visual flow
- Modal contains focus properly
- No keyboard traps

### Visual Accessibility
- Color contrast meets WCAG AA (4.5:1 for text)
- No information conveyed by color alone
- Clear focus indicators
- Proper link underlines

### Form Accessibility
- All inputs have associated labels
- Error messages properly associated
- Required fields clearly marked
- Helpful placeholder text

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| CSS Custom Props | 49+ | 31+ | 9.1+ | 15+ |
| Flexbox | 29+ | 18+ | 6.1+ | 12+ |
| -webkit-line-clamp | 68+ | 68+ | 5.1+ | 79+ |
| Transform | All | All | 4+ | All |

---

## Component Integration Points

### With Admin Dashboard
- Used in `AdminDashboard.jsx` for pending review cards
- Integrated with approval workflow

### With Organization Dashboard  
- Shows featured status on org's listings
- Renewal/extension UI

### With Public Directory
- Prominent featured section above search results
- Special styling to differentiate from regular listings

---

## Performance Notes

- Inline CSS avoids parsing Tailwind classes
- CSS custom properties enable dynamic theming
- Grid layout uses auto-fill for efficient responsive behavior
- Minimal re-renders through proper state management
- Shadow transitions use GPU acceleration

---

## Future Enhancements

1. **Analytics Dashboard**: Display featured listing performance metrics
2. **Advanced Filtering**: Filter by duration, cost tier, or performance
3. **Bulk Operations**: Feature/unfeature multiple listings at once
4. **Custom Branding**: Allow organizations to customize featured badge
5. **A/B Testing**: Compare featured vs non-featured listing performance
6. **Promotion Packages**: Bundle featured listings with other services

