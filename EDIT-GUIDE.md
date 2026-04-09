# Great Bay Pressure Wash — Website Edit Guide

## Quick Reference: What to Change Where

---

## 1. PHONE NUMBER
Current: (631) 921-2732

If you need to change the phone number, search-and-replace across all HTML files:
- Find: `6319212732`
- Replace with: your new number (digits only, for `href="tel:..."`)
- Find: `(631) 921-2732`
- Replace with: your new number (formatted, for display)

Files affected: every .html file

---

## 2. EMAIL ADDRESS
Current: greatbaypressurewash@gmail.com

Search-and-replace:
- Find: `greatbaypressurewash@gmail.com`
- Replace with: your new email

---

## 3. WEBSITE DOMAIN
Current placeholder: `greatbaypressurewash.com`

Once your Namecheap domain is live, update:
- `sitemap.xml` — all URL entries
- Every `<link rel="canonical" ...>` tag in each HTML file
- Every `og:url` and `og:image` meta tag
- The LocalBusiness schema `@id` and `url` fields in index.html

---

## 4. LOGO
Place your logo file at:
```
images/logo.png
```
The logo is referenced as `images/logo.png` (root pages) and `../images/logo.png` (blog pages).
Recommended dimensions: 300px wide × 100px tall (PNG with transparent background works best)

---

## 5. IMAGES — How to Add Real Photos

Each placeholder has a comment showing the exact filename to use. For example:
```html
<!-- Replace with: <img src="images/house-washing-long-island-ny.jpg" alt="..." /> -->
```

### Recommended image naming convention:
```
house-washing-long-island-ny.jpg
house-washing-oakdale-ny.jpg
roof-washing-long-island-ny.jpg
driveway-cleaning-sayville-ny.jpg
patio-cleaning-long-island-ny.jpg
paver-cleaning-sealing-long-island-ny.jpg
commercial-pressure-washing-long-island-ny.jpg
great-bay-team-oakdale-ny.jpg
great-bay-equipment-oakdale.jpg
```

### Rules for image SEO:
- Include your city/location in the filename (already done in examples above)
- Keep alt text descriptive: `alt="House washing before and after in Oakdale, NY"`
- Optimize images to under 200KB before uploading (use tinypng.com)
- Minimum 1200px wide for hero/feature images

---

## 6. SERVICE AREAS — Adding New Towns

To add a new service area:

**Step 1:** Add the town to `service-areas.html` — copy one of the existing `<div id="town-name">` blocks and update the content.

**Step 2:** Add the town to the footer area grid on every page (search for `areas-grid` or the footer service areas section).

**Step 3:** Add the town to the schema markup in `index.html`:
```json
{"@type": "City", "name": "NEW TOWN", "addressRegion": "NY"}
```

**Step 4:** Update `sitemap.xml` if you create a dedicated landing page for that town.

---

## 7. SEO — Updating Title Tags & Meta Descriptions

Each page has a `<title>` and `<meta name="description">` in the `<head>`. To edit:
- Keep titles under 60 characters
- Keep meta descriptions under 160 characters
- Include your primary keyword and city name in both

---

## 8. CONTACT FORM — Connecting to Netlify

The contact form on `contact.html` is pre-configured for **Netlify Forms**:
```html
<form data-netlify="true" name="contact">
```

When you deploy to Netlify:
1. Netlify automatically detects and activates this form
2. Go to your Netlify dashboard → Forms to see submissions
3. You can set up email notifications in Netlify dashboard → Forms → Settings
4. No code changes needed — it works out of the box on Netlify

**To redirect after submission** (optional): Add `action="/thank-you.html"` to the form tag and create a `thank-you.html` page.

---

## 9. GOOGLE ANALYTICS / GOOGLE SEARCH CONSOLE

**Google Analytics (GA4):**
Add this before `</head>` on every page:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Replace `G-XXXXXXXXXX` with your GA4 Measurement ID.

**Google Search Console:**
After deploying, go to search.google.com/search-console and add your property. Verify ownership and submit your sitemap URL:
`https://greatbaypressurewash.com/sitemap.xml`

---

## 10. TESTIMONIALS — Updating with Real Reviews

Find the testimonial sections (search for `testimonial-card` in any HTML file). Each card follows this pattern:

```html
<div class="testimonial-card">
  <div class="stars">★★★★★</div>
  <p class="testimonial-text">"YOUR REVIEW TEXT HERE."</p>
  <div class="testimonial-author">
    <div class="author-avatar">INITIALS</div>
    <div class="author-info">
      <div class="name">Customer Name</div>
      <div class="location">Town, NY</div>
    </div>
  </div>
</div>
```

Replace the placeholder testimonials with real Google reviews as you collect them.

---

## 11. DEPLOYING TO NETLIFY

1. Create a free account at netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the entire `great-bay-pressure-wash` folder
4. Netlify gives you a temporary URL (e.g. amazing-site-123.netlify.app)
5. Go to Site settings → Domain management → Add custom domain
6. Enter your Namecheap domain (e.g. greatbaypressurewash.com)
7. Update Namecheap DNS: point nameservers to Netlify's (they'll show you exactly what to set)
8. SSL/HTTPS is automatic and free through Netlify

---

## 12. FILE STRUCTURE OVERVIEW

```
great-bay-pressure-wash/
├── index.html                    ← Homepage
├── house-washing.html            ← /house-washing
├── roof-washing.html             ← /roof-washing
├── driveway-cleaning.html        ← /driveway-cleaning
├── patio-cleaning.html           ← /patio-cleaning
├── paver-cleaning-sealing.html   ← /paver-cleaning-sealing
├── commercial-pressure-washing.html ← /commercial-pressure-washing
├── service-areas.html            ← /service-areas
├── about.html                    ← /about
├── contact.html                  ← /contact
├── sitemap.xml
├── robots.txt
├── css/
│   └── styles.css               ← All site styles (colors, fonts, layout)
├── js/
│   └── main.js                  ← Sticky header, FAQ accordion, mobile menu
├── images/
│   └── logo.png                 ← YOUR LOGO GOES HERE
└── blog/
    ├── index.html               ← /blog/
    ├── how-often-pressure-wash-house-long-island.html
    ├── soft-washing-vs-pressure-washing.html
    ├── best-time-roof-cleaning-new-york.html
    ├── remove-mold-mildew-siding.html
    └── is-pressure-washing-safe-for-concrete.html
```

---

## 13. COLOR SCHEME — Changing Colors

All colors are defined as CSS variables at the top of `css/styles.css`:
```css
:root {
  --primary:       #0B7EE8;   /* Electric blue */
  --primary-dark:  #0060C7;   /* Darker blue */
  --primary-deeper:#003F8A;   /* Navy blue */
  --accent:        #3CB043;   /* Green (from logo) */
  --accent-dark:   #2A8032;   /* Darker green */
}
```
Change these values to update the entire site's color scheme at once.

---

## PRIORITY CHECKLIST AFTER DEPLOYMENT

- [ ] Copy `images/logo.png` from your logo folder
- [ ] Add real photos and replace placeholder image comments
- [ ] Update domain in sitemap.xml and canonical tags
- [ ] Connect Google Analytics (GA4)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Netlify form notifications (email alerts for new leads)
- [ ] Create Google Business Profile and link website
- [ ] Collect and add real customer testimonials
- [ ] Build local citations (Yelp, Angi, HomeAdvisor, Thumbtack) with consistent NAP
