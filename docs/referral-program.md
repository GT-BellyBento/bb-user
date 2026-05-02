# Referral Program (Wallet Credits & Rewards)

A practical guide to building a referral system that drives viral growth for tiffin marketplaces.

---

## Introduction

Referral programs are one of the most cost-effective ways to acquire new customers and providers. When a happy user recommends BellyBento to a friend, both parties get rewarded.

### Why Referrals Work

| Benefit | Explanation |
|---------|-------------|
| **Lower CAC** | Referred customers cost ₹50-100 vs ₹300-800 for paid ads |
| **Higher Trust** | Friend's recommendation beats any advertisement |
| **Better Retention** | Referred users stay 25-30% longer |
| **Viral Growth** | 1 happy customer → 3-5 new customers |
| **Local Network Effect** | Tiffin is local – friends/colleagues naturally share |

### CAC Comparison

| Acquisition Method | Cost per Customer | Quality |
|--------------------|-------------------|---------|
| Google/Meta Ads | ₹300-₹800 | Medium |
| Influencer Marketing | ₹200-₹500 | Medium |
| **Referral Program** | **₹50-₹100** | **High** |
| Organic (SEO/Word of mouth) | ₹0 | High |

> **Key Insight:** Referrals are 5-10x cheaper than paid ads and bring higher-quality users.

---

## How the Referral System Works

### Basic Flow

```
1. User A shares referral code/link with User B
2. User B signs up using the code
3. User B places first order
4. Both User A and User B get wallet credits
5. Credits can be used at checkout
```

### Visual Flow

```
┌─────────────┐    shares code    ┌─────────────┐
│   User A    │ ───────────────▶  │   User B    │
│  (Referrer) │                   │ (New User)  │
└─────────────┘                   └─────────────┘
      │                                  │
      │                                  │ signs up & orders
      │                                  ▼
      │                           ┌─────────────┐
      │                           │  First Order │
      │                           │  Completed   │
      │                           └─────────────┘
      │                                  │
      ▼                                  ▼
┌─────────────┐                   ┌─────────────┐
│  Gets ₹50   │                   │  Gets ₹50   │
│   Credit    │                   │    OFF      │
└─────────────┘                   └─────────────┘
```

---

## Reward Structure

### Customer Referrals

| Action | Referrer Gets | New Customer Gets |
|--------|---------------|-------------------|
| Friend signs up | - | - |
| Friend places **first order** | ₹50 wallet credit | ₹50 off first order |
| Friend completes **5 orders** | ₹25 bonus credit | - |
| Friend completes **10 orders** | ₹25 bonus credit | ₹25 loyalty credit |

**Total potential earnings per referral: ₹100**

### Provider Referrals

| Action | Referrer Gets | New Provider Gets |
|--------|---------------|-------------------|
| Provider signs up | - | - |
| Provider gets **first customer** | ₹100 wallet credit | 0% commission for 1st month |
| Provider completes **10 orders** | ₹50 bonus credit | - |
| Provider stays **3 months** | ₹50 bonus credit | ₹100 promotional credit |

**Total potential earnings per provider referral: ₹200**

---

## Wallet & Credits System

### How Wallet Works

Every user has a wallet balance that can be used at checkout:

```
┌─────────────────────────────────────────────────────┐
│  💰 My Wallet                                       │
│                                                     │
│  Available Balance: ₹150                           │
│                                                     │
│  Recent Activity:                                   │
│  + ₹50   Referral bonus (Priya joined)   2 May     │
│  + ₹50   Referral bonus (Amit joined)    28 Apr    │
│  - ₹50   Used on order #1234             25 Apr    │
│  + ₹50   Welcome bonus                   20 Apr    │
│                                                     │
│  [Refer Friends] [Transaction History]              │
└─────────────────────────────────────────────────────┘
```

### Credit Types

| Credit Type | How Earned | Validity | Usage Limit |
|-------------|------------|----------|-------------|
| **Referral Credit** | Referring friends | 90 days | Max 50% of order |
| **Welcome Bonus** | First signup | 30 days | First order only |
| **Loyalty Credit** | Completing milestones | 60 days | Max 50% of order |
| **Promotional Credit** | Campaigns/offers | 15-30 days | As specified |

### Redemption Rules

| Rule | Value |
|------|-------|
| Minimum order to use credits | ₹100 |
| Maximum credit per order | 50% of order value |
| Can combine with other offers? | No (only one discount) |
| Credits expiry | 90 days from earning |
| Transferable? | No |

### Example Checkout

```
Order Summary:
─────────────────────────────────────
Lunch Tiffin (30 days)        ₹3,000
Platform Fee                     ₹10
─────────────────────────────────────
Subtotal                      ₹3,010

💰 Apply Wallet Credit         -₹150  (₹150 available)
   [Using ₹150 of ₹150]
─────────────────────────────────────
Total Payable                 ₹2,860
─────────────────────────────────────
```

---

## Referral Code System

### Code Format

Each user gets a unique referral code:

| Format | Example | Best For |
|--------|---------|----------|
| Name-based | RAHUL50 | Easy to remember |
| Random | BLB7X9K2 | Unique, no conflicts |
| Phone-based | REF9876543210 | Easy tracking |

**Recommendation:** Use name-based codes (RAHUL50, PRIYA50) – easier to share verbally.

### Sharing Options

```
┌─────────────────────────────────────────────────────┐
│  🎁 Refer & Earn ₹50                                │
│                                                     │
│  Share your code with friends:                      │
│                                                     │
│  ┌─────────────────────────────────┐               │
│  │  RAHUL50                    📋  │               │
│  └─────────────────────────────────┘               │
│                                                     │
│  Or share your link:                               │
│  bellybento.com/join/RAHUL50                       │
│                                                     │
│  [WhatsApp] [SMS] [Copy Link] [More]               │
│                                                     │
│  You get ₹50 • Your friend gets ₹50 off           │
└─────────────────────────────────────────────────────┘
```

### Pre-written Share Messages

**WhatsApp Message:**
```
Hey! I've been using BellyBento for daily tiffins - it's amazing! 🍱

Use my code RAHUL50 to get ₹50 off your first order.

Download: bellybento.com/join/RAHUL50
```

**SMS Message:**
```
Get ₹50 off homemade tiffins on BellyBento! 
Use code: RAHUL50
Link: bellybento.com/join/RAHUL50
```

---

## Anti-Fraud Rules

### Why Fraud Prevention Matters

Without rules, users will create fake accounts to earn referral credits.

### Fraud Prevention Rules

| Rule | Implementation |
|------|----------------|
| **Phone verification** | OTP required for signup |
| **Unique device check** | One account per device ID |
| **Self-referral block** | Can't use own code |
| **Same household limit** | Max 2 referrals from same address |
| **Payment method check** | Referred user must use unique payment method |
| **Order completion required** | Credit only after order delivered |
| **Minimum order value** | First order must be ₹100+ |

### Referral Limits

| Limit | Value | Reason |
|-------|-------|--------|
| Max referrals per month | 10 | Prevent abuse |
| Max referrals lifetime | 100 | Reasonable cap |
| Credit expiry | 90 days | Create urgency |
| Cooldown between referrals | None | Encourage sharing |

### Red Flags (Auto-block)

| Suspicious Activity | Action |
|--------------------|--------|
| 5+ referrals from same IP | Review & block |
| Referred user cancels within 24h | No credit given |
| Same payment method used | Block referral |
| Unusual referral velocity | Manual review |

---

## Referral Tiers (Gamification)

### Referral Levels

Reward top referrers with status and bonus rewards:

| Level | Referrals | Badge | Bonus |
|-------|-----------|-------|-------|
| **Starter** | 0-2 | - | Standard ₹50/referral |
| **Bronze** | 3-5 | 🥉 | ₹60/referral |
| **Silver** | 6-10 | 🥈 | ₹75/referral |
| **Gold** | 11-25 | 🥇 | ₹100/referral |
| **Platinum** | 25+ | 💎 | ₹100/referral + VIP perks |

### Platinum Perks

- Priority customer support
- Early access to new features
- Free delivery for 3 months
- Exclusive provider access
- Featured in "Top Referrers" leaderboard

---

## When to Launch Referral Program

### Timing Guide

| Stage | Customers | Recommendation |
|-------|-----------|----------------|
| **Launch** | 0-100 | ❌ Focus on product, not referrals |
| **Early Growth** | 100-500 | ✅ Soft launch with loyal users |
| **Growth** | 500-1000 | ✅ Full launch, promote heavily |
| **Scale** | 1000+ | ✅ Optimize, add tiers & gamification |

### Prerequisites

Before launching referrals:
- [ ] Product is stable (no major bugs)
- [ ] Users are satisfied (NPS > 30)
- [ ] Repeat order rate > 40%
- [ ] Wallet/credits system built
- [ ] Fraud detection in place
- [ ] Tracking & analytics ready

---

## Example Implementation

### Database Schema (Simplified)

```
Users Table:
- user_id
- referral_code (unique)
- referred_by (user_id)
- wallet_balance

Referrals Table:
- referral_id
- referrer_id
- referred_user_id
- status (pending/completed/expired)
- credit_amount
- created_at
- completed_at

Wallet_Transactions Table:
- transaction_id
- user_id
- type (credit/debit)
- amount
- source (referral/promo/order)
- expires_at
- created_at
```

### API Endpoints

```
POST /api/referral/apply
- Apply referral code during signup

GET /api/referral/stats
- Get user's referral statistics

GET /api/wallet/balance
- Get wallet balance

POST /api/wallet/redeem
- Use credits at checkout
```

---

## Revenue Impact

### Cost-Benefit Analysis

**Assumptions:**
- Average order value: ₹3,000/month
- Commission: 10%
- Referral cost: ₹100 (₹50 + ₹50)
- LTV per customer: 6 months

**Calculation:**
```
Platform revenue per customer:
= ₹3,000 × 10% × 6 months
= ₹1,800 LTV

Referral cost:
= ₹100

ROI per referral:
= (₹1,800 - ₹100) / ₹100
= 17x return ✅
```

### Projected Referral Revenue

Assuming 1,000 active customers with 20% participating in referrals:

| Metric | Value |
|--------|-------|
| Active referrers | 200 |
| Avg referrals per user | 3 |
| New customers from referrals | 600 |
| Referral cost | ₹60,000 |
| Revenue from referred customers (6 months) | ₹10,80,000 |
| **Net gain** | **₹10,20,000** |

---

## Key Takeaways

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|---------|
| Reward both referrer & referee | Only reward one side |
| Use simple ₹ credits (not points) | Create complex point systems |
| Make sharing easy (WhatsApp) | Require app download to share |
| Set reasonable limits | Allow unlimited referrals |
| Verify before crediting | Credit immediately on signup |
| Track everything | Launch without analytics |

### Quick Reference

| Parameter | Recommended Value |
|-----------|-------------------|
| Referrer reward | ₹50 wallet credit |
| New user reward | ₹50 off first order |
| Credit validity | 90 days |
| Max usage per order | 50% of order value |
| Monthly referral limit | 10 |
| Min order to use credits | ₹100 |

### Success Metrics to Track

| Metric | Target |
|--------|--------|
| Referral participation rate | >15% of users |
| Referral conversion rate | >30% of shared codes |
| Cost per referred customer | <₹100 |
| Referred customer retention | >60% at 3 months |
| Referral revenue contribution | 10-20% of new customers |

---

## Glossary

- **Referrer** – User who shares their referral code
- **Referee** – New user who signs up using a referral code
- **Wallet Credit** – Platform currency that can be used at checkout
- **Referral Code** – Unique code assigned to each user for sharing
- **CAC** – Customer Acquisition Cost
- **LTV** – Lifetime Value of a customer
- **Viral Coefficient** – Number of new users each existing user brings

---

*Last updated: May 2026*
