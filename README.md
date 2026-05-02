# BellyBento 🍱

**Homemade Tiffins, Delivered Daily**

BellyBento is a platform that connects tiffin service providers with customers who need daily home-cooked meals. We are a **mediator/aggregator** - we do NOT cook food ourselves. We simply provide the technology platform to connect providers and customers.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Current Phase: Waitlist](#current-phase-waitlist)
- [Business Model](#business-model)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Project Structure](#project-structure)

---

## 🎯 About the Project

BellyBento solves the problem of:
- **Customers**: Finding reliable, hygienic, home-cooked tiffin services in their area
- **Providers**: Getting a platform to reach more customers without marketing hassles

---

## 📝 Current Phase: Waitlist

This repository contains the **waitlist landing page** for BellyBento. The main mobile app is under development.

### Waitlist Features
- Early access signup for customers and tiffin providers
- Location/city collection for demand mapping
- Separate user type tracking (Customer vs Provider)
- Email and phone collection for launch notifications

### Coming Soon (Mobile App)
- Location-based provider discovery
- Subscription management
- In-app ordering and payments
- Review and rating system
- Real-time order tracking

---

## 💼 Business Model

| Role | Description |
|------|-------------|
| **BellyBento** | Technology platform / Aggregator / Mediator |
| **Tiffin Providers** | Independent food business operators who cook and deliver |
| **Customers** | End users who subscribe to tiffin services |

### Revenue Model
- Commission per order from providers
- Subscription fees for premium provider features
- Delivery partner integration (future)

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16, React 18, TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Authentication | Supabase Auth (planned) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GT-BellyBento/bb-user.git

# Navigate to project
cd bb-user

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
# Supabase (for production)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📚 Documentation

Detailed documentation is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [Platform Licenses](docs/platform-licenses.md) | Licenses & compliance required for BellyBento |
| [Provider Licenses](docs/provider-licenses.md) | Licenses required for tiffin service providers |
| [Investor Documents](docs/investor-documents.md) | Documents needed for investor pitch |

---

## 📁 Project Structure

```
bb-user/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # Waitlist API endpoint
│   ├── terms/
│   │   └── page.tsx          # Terms & Conditions
│   ├── privacy/
│   │   └── page.tsx          # Privacy Policy
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Benefits.tsx
│   ├── WaitlistForm.tsx
│   └── Footer.tsx
├── docs/                     # Documentation
│   ├── platform-licenses.md
│   ├── provider-licenses.md
│   └── investor-documents.md
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 📞 Contact

- **Email**: hello@bellybento.com
- **Website**: https://bellybento.com

---

## 📄 Legal

- [Terms & Conditions](/terms)
- [Privacy Policy](/privacy)

---

## 🔒 Disclaimer

BellyBento is a technology platform that connects tiffin service providers with customers. We do NOT:
- Prepare, cook, or handle food
- Employ tiffin providers (they are independent business operators)
- Guarantee food quality (responsibility lies with the provider)

We DO:
- Verify provider FSSAI registration before onboarding
- Provide a platform for discovery and ordering
- Facilitate payments between parties
- Handle customer support and grievance redressal

---

*© 2026 BellyBento. All rights reserved.*
