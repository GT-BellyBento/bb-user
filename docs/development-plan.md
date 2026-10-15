# BellyBento Development Plan

**Target Launch:** August 2026  
**Start Date:** May 19, 2026  
**Timeline:** 12 weeks  
**Tech Stack:** Flutter + Dart (Mobile) | Node.js/Next.js (Backend)

---

## Tech Stack Overview

### Mobile Apps (Customer + Provider)
| Component | Technology |
|-----------|------------|
| Framework | Flutter 3.x |
| Language | Dart |
| State Management | Riverpod or Provider |
| Local Storage | Hive or SharedPreferences |
| HTTP Client | Dio |
| Push Notifications | Firebase Cloud Messaging |

### Backend
| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Next.js API Routes or Express.js |
| Database | Supabase (PostgreSQL) or Firebase |
| Authentication | Supabase Auth / Firebase Auth |
| Payments | Razorpay |
| File Storage | Supabase Storage / Cloudinary |
| Hosting | Vercel (Next.js) or Railway (Node) |

### Infrastructure
| Component | Technology |
|-----------|------------|
| Version Control | GitHub |
| CI/CD | GitHub Actions |
| App Distribution | Google Play Console |
| Analytics | Firebase Analytics |
| Crash Reporting | Firebase Crashlytics |

---

## MVP Feature Scope

### Customer App (Must Have for Launch)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Phone/OTP Login | 🔴 P0 | Medium |
| Browse Providers (by location) | 🔴 P0 | Medium |
| View Provider Profile + Menu | 🔴 P0 | Low |
| Place One-Time Order | 🔴 P0 | Medium |
| Subscribe (Daily/Weekly Plan) | 🔴 P0 | High |
| Online Payment (Razorpay) | 🔴 P0 | Medium |
| Order History | 🔴 P0 | Low |
| Rate & Review | 🟡 P1 | Low |
| Profile Management | 🟡 P1 | Low |
| Delivery Address Management | 🔴 P0 | Low |

### Customer App (Post-Launch / V2)

| Feature | Priority |
|---------|----------|
| Live Delivery Tracking | 🟢 P2 |
| In-App Chat with Provider | 🟢 P2 |
| Wallet & Credits | 🟢 P2 |
| Referral Program | 🟢 P2 |
| Multiple Payment Methods | 🟢 P2 |

### Provider App (Must Have for Launch)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Phone/OTP Login | 🔴 P0 | Medium |
| Dashboard (Today's Orders) | 🔴 P0 | Medium |
| View Order Details | 🔴 P0 | Low |
| Mark Order as Delivered | 🔴 P0 | Low |
| Menu Management (Add/Edit/Delete) | 🔴 P0 | Medium |
| Set Availability (On/Off) | 🔴 P0 | Low |
| View Earnings | 🔴 P0 | Medium |
| Profile Settings | 🟡 P1 | Low |
| Subscription Management | 🟡 P1 | Medium |

### Provider App (Post-Launch / V2)

| Feature | Priority |
|---------|----------|
| Analytics Dashboard | 🟢 P2 |
| Promotional Tools | 🟢 P2 |
| Payout History | 🟢 P2 |
| Customer Chat | 🟢 P2 |

### Backend API (Must Have)

| API | Priority | Description |
|-----|----------|-------------|
| Auth | 🔴 P0 | OTP login, session management |
| Users | 🔴 P0 | Customer + Provider profiles |
| Providers | 🔴 P0 | List, search, filter by location |
| Menu | 🔴 P0 | CRUD for menu items |
| Orders | 🔴 P0 | Create, update status, history |
| Subscriptions | 🔴 P0 | Create, pause, cancel |
| Payments | 🔴 P0 | Razorpay integration |
| Reviews | 🟡 P1 | Create, list by provider |
| Notifications | 🟡 P1 | Push notification triggers |

---

## 12-Week Development Schedule

### Phase 1: Setup & Foundation (Week 1-2)
**May 19 - June 1**

#### Week 1: Project Setup
| Day | Task | Output |
|-----|------|--------|
| Mon | Set up Flutter project structure | Customer + Provider apps initialized |
| Tue | Set up Node.js/Next.js backend | API project with folder structure |
| Wed | Set up Supabase (DB + Auth) | Database tables created |
| Thu | Design database schema | All tables + relationships |
| Fri | Set up GitHub repos + CI/CD | Version control ready |
| Sat-Sun | UI/UX wireframes | All screens sketched |

#### Week 2: Authentication + Base UI
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Auth API (OTP send/verify) | /api/auth endpoints |
| Tue | Flutter: Login screen UI | Phone input + OTP screen |
| Wed | Flutter: Connect login to backend | Working OTP login |
| Thu | Flutter: App navigation setup | Bottom nav, routing |
| Fri | Flutter: Base UI components | Buttons, cards, inputs |
| Sat-Sun | Buffer / catch up | - |

**Week 2 Milestone:** ✅ User can login via OTP on both apps

---

### Phase 2: Customer App Core (Week 3-5)
**June 2 - June 22**

#### Week 3: Provider Discovery
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Provider list API | GET /api/providers |
| Tue | Backend: Provider detail + menu API | GET /api/providers/:id |
| Wed | Flutter: Home screen (provider list) | List view with cards |
| Thu | Flutter: Provider detail screen | Profile + menu display |
| Fri | Flutter: Location/area filter | Filter by area |
| Sat-Sun | Polish + testing | - |

**Week 3 Milestone:** ✅ Customer can browse and view providers

#### Week 4: Ordering System
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Create order API | POST /api/orders |
| Tue | Backend: Order history API | GET /api/orders |
| Wed | Flutter: Order placement flow | Select items → confirm |
| Thu | Flutter: Address selection | Add/select delivery address |
| Fri | Flutter: Order confirmation screen | Order summary |
| Sat-Sun | Buffer / catch up | - |

**Week 4 Milestone:** ✅ Customer can place an order (no payment yet)

#### Week 5: Payments + Subscriptions
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Razorpay integration | Payment API |
| Tue | Flutter: Payment screen | Razorpay checkout |
| Wed | Backend: Subscription model | Create/manage subscriptions |
| Thu | Flutter: Subscription selection | Daily/weekly plan UI |
| Fri | Flutter: Order history screen | Past orders list |
| Sat-Sun | End-to-end testing | - |

**Week 5 Milestone:** ✅ Customer can pay and subscribe

---

### Phase 3: Provider App Core (Week 6-8)
**June 23 - July 13**

#### Week 6: Provider Dashboard
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Provider orders API | GET /api/provider/orders |
| Tue | Flutter: Provider dashboard UI | Today's orders view |
| Wed | Flutter: Order detail screen | View order info |
| Thu | Backend: Update order status API | PATCH /api/orders/:id |
| Fri | Flutter: Mark as delivered | Status update flow |
| Sat-Sun | Buffer / testing | - |

**Week 6 Milestone:** ✅ Provider can see and manage orders

#### Week 7: Menu Management
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Menu CRUD API | POST/PUT/DELETE /api/menu |
| Tue | Flutter: Menu list screen | Provider's menu items |
| Wed | Flutter: Add/Edit menu item | Form with image upload |
| Thu | Backend: Image upload (Cloudinary/Supabase) | File upload API |
| Fri | Flutter: Set availability toggle | Turn ordering on/off |
| Sat-Sun | Buffer / testing | - |

**Week 7 Milestone:** ✅ Provider can manage their menu

#### Week 8: Earnings & Profile
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Earnings calculation API | GET /api/provider/earnings |
| Tue | Flutter: Earnings screen | Total, pending, paid |
| Wed | Flutter: Provider profile setup | Name, photo, description |
| Thu | Backend: Subscription management | Provider view of subscribers |
| Fri | Flutter: Subscriber list | View active subscriptions |
| Sat-Sun | Full provider app testing | - |

**Week 8 Milestone:** ✅ Provider app feature complete

---

### Phase 4: Integration & Polish (Week 9-10)
**July 14 - July 27**

#### Week 9: Notifications + Reviews
| Day | Task | Output |
|-----|------|--------|
| Mon | Backend: Firebase FCM setup | Push notification service |
| Tue | Flutter: Push notification handling | Receive + display |
| Wed | Backend: Review API | POST/GET /api/reviews |
| Thu | Flutter: Rate order flow | Star rating + comment |
| Fri | Flutter: Reviews on provider profile | Display ratings |
| Sat-Sun | Cross-app testing | - |

**Week 9 Milestone:** ✅ Notifications + Reviews working

#### Week 10: Polish & Bug Fixes
| Day | Task | Output |
|-----|------|--------|
| Mon | UI polish - Customer app | Consistent styling |
| Tue | UI polish - Provider app | Consistent styling |
| Wed | Error handling | Loading states, error messages |
| Thu | Edge cases | Empty states, offline handling |
| Fri | Performance optimization | Lazy loading, caching |
| Sat-Sun | Internal testing | - |

**Week 10 Milestone:** ✅ Apps polished and stable

---

### Phase 5: Testing & Launch Prep (Week 11-12)
**July 28 - August 10**

#### Week 11: Beta Testing
| Day | Task | Output |
|-----|------|--------|
| Mon | Recruit 5 test providers | Real providers in Udaipur |
| Tue | Recruit 10 test customers | Friends/family/waitlist |
| Wed | Beta release (internal) | APK distribution |
| Thu | Collect feedback | Bug reports, UX issues |
| Fri | Priority bug fixes | Critical fixes |
| Sat-Sun | More testing | - |

**Week 11 Milestone:** ✅ Beta tested with real users

#### Week 12: Launch
| Day | Task | Output |
|-----|------|--------|
| Mon | Final bug fixes | All critical issues resolved |
| Tue | Play Store listing | Screenshots, description |
| Wed | Submit to Play Store | App review (2-7 days) |
| Thu | Prepare launch marketing | Social posts, provider outreach |
| Fri | App approved (hopefully) | Live on Play Store |
| Sat-Sun | **LAUNCH DAY** 🚀 | Go live in Udaipur |

**Week 12 Milestone:** ✅ BellyBento LIVE

---

## Database Schema (Supabase/PostgreSQL)

```sql
-- Users (both customers and providers)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(255),
  role VARCHAR(20) NOT NULL, -- 'customer' or 'provider'
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Provider Profiles
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  business_name VARCHAR(100) NOT NULL,
  description TEXT,
  address TEXT,
  area VARCHAR(100),
  city VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  fssai_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Menu Items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_veg BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customer Addresses
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  label VARCHAR(50), -- 'home', 'work', 'other'
  address_line TEXT NOT NULL,
  area VARCHAR(100),
  city VARCHAR(50),
  pincode VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  address_id UUID REFERENCES addresses(id),
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, preparing, delivered, cancelled
  order_type VARCHAR(20) NOT NULL, -- 'one_time' or 'subscription'
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed
  payment_id VARCHAR(100), -- Razorpay payment ID
  delivery_date DATE,
  delivery_time VARCHAR(20), -- 'lunch' or 'dinner'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  menu_item_id UUID REFERENCES menu_items(id),
  quantity INT DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  address_id UUID REFERENCES addresses(id),
  plan_type VARCHAR(20) NOT NULL, -- 'daily', 'weekdays', 'custom'
  meal_type VARCHAR(20) NOT NULL, -- 'lunch', 'dinner', 'both'
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- active, paused, cancelled
  monthly_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions (for provider payouts)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  order_id UUID REFERENCES orders(id),
  amount DECIMAL(10,2) NOT NULL,
  commission DECIMAL(10,2) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### Authentication
```
POST /api/auth/send-otp      - Send OTP to phone
POST /api/auth/verify-otp    - Verify OTP, return token
POST /api/auth/logout        - Invalidate session
```

### Users
```
GET  /api/users/me           - Get current user profile
PUT  /api/users/me           - Update profile
POST /api/users/addresses    - Add address
GET  /api/users/addresses    - List addresses
PUT  /api/users/addresses/:id - Update address
```

### Providers
```
GET  /api/providers          - List providers (with filters)
GET  /api/providers/:id      - Provider detail + menu
GET  /api/providers/:id/reviews - Provider reviews
```

### Provider Dashboard (Protected)
```
GET  /api/provider/profile   - Get provider profile
PUT  /api/provider/profile   - Update profile
GET  /api/provider/orders    - Today's orders
GET  /api/provider/orders/:id - Order detail
PATCH /api/provider/orders/:id - Update order status
GET  /api/provider/menu      - List menu items
POST /api/provider/menu      - Add menu item
PUT  /api/provider/menu/:id  - Update menu item
DELETE /api/provider/menu/:id - Delete menu item
GET  /api/provider/earnings  - Earnings summary
GET  /api/provider/subscribers - Active subscriptions
```

### Orders
```
POST /api/orders             - Create order
GET  /api/orders             - Order history
GET  /api/orders/:id         - Order detail
```

### Subscriptions
```
POST /api/subscriptions      - Create subscription
GET  /api/subscriptions      - My subscriptions
PUT  /api/subscriptions/:id  - Pause/resume
DELETE /api/subscriptions/:id - Cancel
```

### Payments
```
POST /api/payments/create    - Create Razorpay order
POST /api/payments/verify    - Verify payment
```

### Reviews
```
POST /api/reviews            - Add review
```

---

## Flutter Project Structure

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   └── routes.dart
├── core/
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   └── widgets/           # Shared widgets
├── data/
│   ├── models/
│   ├── repositories/
│   └── services/
│       ├── api_service.dart
│       ├── auth_service.dart
│       └── storage_service.dart
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── providers/
│   ├── home/
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── providers/
│   ├── provider_detail/
│   ├── orders/
│   ├── profile/
│   └── provider_app/      # Provider-specific features
│       ├── dashboard/
│       ├── menu/
│       ├── earnings/
│       └── settings/
└── shared/
    ├── models/
    └── widgets/
```

---

## Daily Standup Template

Use this for daily progress tracking:

```
Date: ___________

Yesterday:
- [ ] Task completed
- [ ] Task completed

Today:
- [ ] Task planned
- [ ] Task planned

Blockers:
- None / Description

Notes:
- Any important observations
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Feature creep** | Strict MVP scope, defer to v2 |
| **Technical blockers** | Have backup solutions ready |
| **Time overrun** | Weekly buffer built in |
| **Testing gaps** | Start beta testing in Week 11 |
| **Play Store rejection** | Submit early, have time for fixes |

---

## Launch Checklist

### Pre-Launch (Week 11)
- [ ] Beta testing with 5 providers
- [ ] Beta testing with 10 customers
- [ ] All critical bugs fixed
- [ ] Payment flow tested end-to-end
- [ ] Provider onboarding process ready

### Play Store Submission
- [ ] App icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (phone + tablet)
- [ ] App description
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] FSSAI compliance note (if required)

### Marketing
- [ ] Social media announcement ready
- [ ] Provider outreach list ready
- [ ] Launch day posts scheduled
- [ ] Waitlist email ready

### Operations
- [ ] Provider support WhatsApp group
- [ ] Customer support process
- [ ] Payment reconciliation process
- [ ] Daily order monitoring setup

---

## Success Metrics (First 30 Days)

| Metric | Target |
|--------|--------|
| Providers onboarded | 10-15 |
| Customers acquired | 50-100 |
| Orders placed | 200+ |
| Subscription rate | 30%+ |
| Customer retention (Week 2) | 50%+ |
| Provider retention | 80%+ |
| App crashes | < 1% |
| Average rating | 4.0+ |

---

## Contact & Resources

### Key Links
- GitHub Repo: [To be created]
- Supabase Dashboard: [To be created]
- Razorpay Dashboard: [To be created]
- Play Console: [To be created]

### Documentation
- [Flutter Docs](https://docs.flutter.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Razorpay Flutter](https://razorpay.com/docs/payments/payment-gateway/flutter-integration/)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/flutter/client)

---

**Last Updated:** May 19, 2026  
**Next Review:** Weekly every Monday
