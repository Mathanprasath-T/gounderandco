# Gounder & Co. — Premium Furniture & Home Appliances Website

A production-quality MERN website designed and engineered for **Gounder & Co.**, a premier furniture, electronics, and home appliances showroom located in Perundurai, Tamil Nadu, India.

---

## 1. Project Overview & Brand Identity

- **Showroom Name**: Gounder & Co.
- **Proprietor**: Mahalingam
- **Location**: RS Road, Near GH (Government Hospital), Perundurai, Tamil Nadu – 638052
- **Showroom Experience**: 30 Years of Community Trust
- **Operating Hours**: 9:00 AM – 9:00 PM (Monday – Sunday)
- **Showroom Contacts**: +91 70940 74314 / +91 99449 20306
- **WhatsApp Contact**: +91 70940 74314

### Design Tokens & Palette
- **Sage Green (`#718C56`)**: Primary CTAs, badges, and accents.
- **Walnut Brown (`#4F3426`)**: Headings, footer, and premium branding.
- **Amber Glow (`#CA6B14`)**: Subtle highlights and trust indicators.
- **Warm Ivory (`#F3EBDD`)**: Background and warm editorial feel.
- **Soft Beige (`#E8DDCC`)**: Card surfaces, borders, and tabs.
- **Charcoal (`#292722`)**: High-contrast body typography.

### Typography
- **Headings**: Cormorant Garamond (Google Fonts)
- **Body & Navigation**: DM Sans (Google Fonts)

---

## 2. Project Architecture

```
gounder-and-co/
│
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── images/
│   │       ├── hero/
│   │       ├── furniture/
│   │       ├── appliances/
│   │       ├── electronics/
│   │       └── showroom/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky header with exactly 4 main links
│   │   │   ├── Footer.jsx          # Showroom details, contacts & navigation
│   │   │   ├── HeroCinematic.jsx   # GSAP ScrollTrigger canvas sequence
│   │   │   ├── ProductCard.jsx     # Product card with Call & WhatsApp
│   │   │   ├── CategoryCard.jsx    # Image-led department card
│   │   │   ├── BrandShowcase.jsx   # Tabbed client-provided brands
│   │   │   ├── EnquiryModal.jsx    # Quick product inquiry modal
│   │   │   └── ScrollToTop.jsx     # Smooth window scroll on route change
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Hero, intro, 3 categories, featured, brands
│   │   │   ├── AboutPage.jsx       # 30-year story, heritage, pillars
│   │   │   ├── FurniturePage.jsx   # Exactly 3 main categories overview
│   │   │   ├── CategoryPage.jsx    # Dedicated sub-category filtered pages
│   │   │   ├── ContactPage.jsx     # Verified details, map & validated form
│   │   │   └── NotFoundPage.jsx    # 404 page
│   │   ├── data/
│   │   │   ├── businessInfo.js     # Single source of truth for business data
│   │   │   ├── categories.js       # The 3 primary categories
│   │   │   ├── products.js         # Verified catalog with indicative prices
│   │   │   └── brands.js           # Client-provided brand assets
│   │   ├── hooks/
│   │   │   ├── useScrollDirection.js
│   │   │   └── usePrefersReducedMotion.js
│   │   ├── utils/
│   │   │   └── whatsapp.js         # WhatsApp and phone link builder
│   │   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                   # Mongoose connection with resilient fallback
│   ├── controllers/
│   │   └── enquiryController.js    # Create & retrieve enquiries
│   ├── models/
│   │   └── Enquiry.js              # Mongoose schema
│   ├── routes/
│   │   └── enquiryRoutes.js        # REST API endpoints
│   ├── middleware/
│   │   ├── rateLimiter.js          # Express rate limiting & anti-abuse
│   │   ├── validation.js           # Input validation & sanitization
│   │   └── errorHandler.js         # Centralized error handler
│   ├── data/
│   │   └── enquiries.json          # Resilient storage fallback
│   ├── server.js                   # Express application entry
│   └── package.json
│
├── package.json                    # Workspace root runner
└── README.md
```

---

## 3. Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Step 1: Install Dependencies
From the repository root:
```bash
# Install both client and server dependencies
npm run install:all

# Or individually:
cd client && npm install
cd ../server && npm install
```

### Step 2: Environment Variables
Create a `.env` file in `server/` (copy from `server/.env.example`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/gounder_and_co
```

*Note: If MongoDB is not running locally, the server operates automatically in resilient mode, persisting all customer enquiries safely to `server/data/enquiries.json`.*

### Step 3: Run the Development Servers
From the root directory:
```bash
# Run both Backend API and Vite Frontend concurrently:
npm run dev

# Or run separately in two terminals:
# Terminal 1 (Backend):
npm run server

# Terminal 2 (Frontend):
npm run client
```

The application will be live at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 4. Key Features Implemented

1. **Cinematic Hero with Scroll Animation**:
   - Canvas-based progressive image sequence driven by GSAP ScrollTrigger.
   - Pinned hero camera journey with smooth aspect-ratio preservation (`object-fit: cover`).
   - Clean HTML floating content layer with high-contrast warm scrim.
   - Respects `prefers-reduced-motion` and automatically provides an optimized high-resolution fallback on mobile devices.

2. **Four Primary Navigation Sections**:
   - **Home (`/`)**: Cinematic hero, split-layout introduction, three prominent category cards, curated featured highlights, and brand showcase.
   - **About (`/about`)**: Editorial layout highlighting 30 years of community service in Perundurai, authentic wooden craftsmanship, and showroom tour.
   - **Furniture (`/furniture`)**: Dedicated overview of the **exactly three core departments** (Home Appliances, Furniture, Electronics).
   - **Contact Us (`/contact`)**: Showroom address, proprietor Mahalingam, verified phones, opening hours, Google Maps directions, and validated enquiry form.

3. **Category Exploration (`/category/:slug`)**:
   - Dedicated pages for Home Appliances, Furniture, and Electronics.
   - Sub-category filter pills (e.g. Cots & Beds, Living Room, Dining Room, Mattresses).
   - Verified brand associations (Peps, Duroflex, Preethi, Havells, LG, Sony, etc.).
   - Client-provided indicative price ranges (e.g. Furniture ₹5,000–₹40,000, Mattresses ₹3,000–₹40,000, Fans ₹1,500–₹5,000, Mixer grinders ₹2,000–₹18,000).

4. **Interactive Customer Enquiry & WhatsApp**:
   - Dynamic WhatsApp click-to-chat links prefilled with the specific product name and category.
   - Direct `tel:` phone call buttons for one-touch dialer launching on mobile.
   - Quick inquiry modal for customers wanting a callback.

5. **Production Backend & Resilient Persistence**:
   - REST API with `POST /api/enquiries` and `GET /api/enquiries`.
   - Security headers with `helmet`.
   - Rate limiting to protect against spam submissions (`express-rate-limit`).
   - Server-side data validation and sanitization (`express-validator`).
   - Resilient MongoDB connection with local JSON fallback to prevent data loss.

