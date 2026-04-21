# Conflict Impact — PRD
### Civilian Risk and Infrastructure Disruption Dashboard

---

## Table of Contents
1. [Overview](#overview)
2. [Target Users](#target-users)
3. [Tech Stack](#tech-stack)
4. [Pages & Routes](#pages--routes)
5. [Data Model](#data-model)
6. [Milestones & Git Push Points](#milestones--git-push-points)
7. [Agent Team](#agent-team)
8. [Harness Files](#harness-files)
9. [Ads Integration (Adsterra)](#ads-integration-adsterra)
10. [Google Sheets Webhook](#google-sheets-webhook)
11. [Visitor Counter](#visitor-counter)
12. [SEO Strategy](#seo-strategy)
13. [i18n Setup](#i18n-setup)
14. [Cost Analysis](#cost-analysis)
15. [Launch Checklist](#launch-checklist)

---

## Overview

**Conflict Impact** is a text- and data-centric web dashboard tracking civilian risk and infrastructure disruption caused by active armed conflicts worldwide. It surfaces structured, sector-based impact cards covering schools, hospitals, power grids, water systems, and telecom networks — with no graphic or violent imagery, making it safe for NGO, academic, and humanitarian audiences.

- **URL slug**: `conflict-impact`
- **Tagline**: "See what conflict destroys beyond the headlines."
- **Primary audience**: NGO staff, university researchers, journalists, policy analysts
- **Ad compatibility**: High — clean, educational content; no graphic imagery
- **Monetization**: Adsterra display ads (header, sidebar, in-content, mobile sticky)

---

## Target Users

| Persona | Need | Behavior |
|---|---|---|
| NGO Field Coordinator | Assess operational risk by sector and region | Filters by sector (hospital, school) and country |
| Academic Researcher | Longitudinal data on infrastructure degradation | Downloads or references affected_count data |
| Policy Journalist | Quick country snapshot for article context | Shares individual conflict cards |
| General Public | Understand civilian cost of war | Browses top-impacted regions |

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/ISR for SEO, fast builds |
| Styling | Tailwind CSS v3 | Mobile-first, utility classes |
| i18n | next-intl | 8-language support, server components |
| Data | Local JSON + Google Sheets | Zero-cost, easy editorial updates |
| Hosting | Vercel (free tier) | Auto-deploy from GitHub, edge CDN |
| Analytics/DB | Google Sheets (via webhook) | Visitor log, no cost |
| Ads | Adsterra | CPM ads, conflict/news niche |
| Repo | GitHub (via `gh` CLI) | CI/CD integration |

---

## Pages & Routes

```
/                          → Home — top-impacted regions overview
/[locale]/                 → Localized home (en, ko, ja, zh, es, fr, de, pt)
/[locale]/country/[slug]   → Country detail page (e.g., /en/country/ukraine)
/[locale]/sector/[slug]    → Sector filter page (e.g., /en/sector/hospitals)
/[locale]/about            → About + data methodology
/api/visit                 → POST visitor data → Google Sheets
/api/counter               → GET today + total visit counts
/sitemap.xml               → Auto-generated sitemap
/robots.txt                → Crawler directives
```

---

## Data Model

### `public/data/impacts.json`
```json
[
  {
    "id": "ukr-health-001",
    "country": "Ukraine",
    "country_slug": "ukraine",
    "conflict": "Russia-Ukraine War",
    "sector": "hospitals",
    "status": "partially_destroyed",
    "affected_count": 1200,
    "affected_unit": "facilities",
    "description": "Over 1,200 health facilities damaged or destroyed since Feb 2022.",
    "source": "WHO Ukraine Situation Report",
    "source_url": "https://www.who.int/ukraine",
    "date": "2024-11-01",
    "severity": "critical",
    "trend": "worsening"
  },
  {
    "id": "sdn-water-001",
    "country": "Sudan",
    "country_slug": "sudan",
    "conflict": "Sudan Civil War",
    "sector": "water",
    "status": "non_functional",
    "affected_count": 8500000,
    "affected_unit": "people",
    "description": "8.5 million people lost access to clean water due to infrastructure attacks.",
    "source": "UNICEF Sudan",
    "source_url": "https://www.unicef.org/sudan",
    "date": "2024-10-15",
    "severity": "critical",
    "trend": "stable"
  }
]
```

### `public/data/conflicts.json`
```json
[
  {
    "id": "ukraine",
    "name": "Russia-Ukraine War",
    "slug": "ukraine",
    "start_date": "2022-02-24",
    "active": true,
    "region": "Eastern Europe",
    "parties": ["Russia", "Ukraine"],
    "overview": "Full-scale invasion resulting in widespread civilian displacement and infrastructure damage.",
    "displaced": 6500000,
    "casualties_estimate": "100k+",
    "last_updated": "2024-11-01"
  }
]
```

### Sector taxonomy
```
hospitals | schools | power | water | telecom | roads | housing
```

### Severity levels
```
critical | severe | moderate | limited
```

---

## Milestones & Git Push Points

### Milestone 0 — Repo & Harness Setup
```bash
gh repo create conflict-impact --public --clone
cd conflict-impact
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
npm install next-intl

# Create harness files
mkdir -p research_history
echo '[]' > feature_list.json
echo 'Session 1 started' > claude-progress.txt

git add -A && git commit -m "M0: repo init, Next.js + next-intl scaffold" && git push
```

### Milestone 1 — Data Layer & JSON Files
```bash
mkdir -p public/data
# Add impacts.json, conflicts.json with 20+ real entries

git add -A && git commit -m "M1: data layer — impacts.json, conflicts.json" && git push
echo "M1 complete: $(date)" >> research_history/milestone-1.txt
```

### Milestone 2 — i18n Configuration
```bash
# /i18n.ts, /messages/en.json, /messages/ko.json ... all 8 languages
# middleware.ts with next-intl routing

git add -A && git commit -m "M2: i18n — next-intl, 8 locales, middleware" && git push
echo "M2 complete: $(date)" >> research_history/milestone-2.txt
```

### Milestone 3 — Core UI Components
```bash
# ImpactCard, SectorBadge, SeverityIndicator, CountryHeader
# Soft backgrounds: bg-slate-50, bg-gray-50, bg-neutral-50
# Tailwind: shadow-sm, rounded-xl, border border-gray-100

git add -A && git commit -m "M3: UI components — ImpactCard, SectorBadge, SeverityIndicator" && git push
echo "M3 complete: $(date)" >> research_history/milestone-3.txt
```

### Milestone 4 — Pages & Routes
```bash
# Home page with impact grid
# /country/[slug] with filtered cards
# /sector/[slug] with sector-specific view
# /about page

git add -A && git commit -m "M4: pages — home, country, sector, about" && git push
echo "M4 complete: $(date)" >> research_history/milestone-4.txt
```

### Milestone 5 — API Routes (Visitor Counter + Webhook)
```bash
# /api/visit — POST to Google Sheets
# /api/counter — GET counts

git add -A && git commit -m "M5: API routes — visitor counter, Google Sheets webhook" && git push
echo "M5 complete: $(date)" >> research_history/milestone-5.txt
```

### Milestone 6 — SEO Layer
```bash
# sitemap.xml, robots.txt, metadata per page
# Structured data (JSON-LD), OG tags

git add -A && git commit -m "M6: SEO — sitemap, robots, JSON-LD, OG tags" && git push
echo "M6 complete: $(date)" >> research_history/milestone-6.txt
```

### Milestone 7 — Ads Integration
```bash
# Adsterra placeholders in layout, sidebar, in-content positions

git add -A && git commit -m "M7: ads — Adsterra header, sidebar, in-content, mobile sticky" && git push
echo "M7 complete: $(date)" >> research_history/milestone-7.txt
```

### Milestone 8 — QA & Launch
```bash
vercel --prod
git add -A && git commit -m "M8: QA pass, production deploy" && git push
echo "M8 complete: $(date)" >> research_history/milestone-8.txt
```

---

## Agent Team

| Agent | Role | Primary Files |
|---|---|---|
| **Frontend Agent** | UI components, pages, Tailwind layout | `src/components/`, `src/app/[locale]/` |
| **Backend/Data Agent** | JSON data, API routes, Google Sheets integration | `public/data/`, `src/app/api/` |
| **SEO/Content Agent** | Metadata, sitemap, robots, structured data, translations | `messages/`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| **QA Agent** | Lighthouse audits, i18n checks, link validation, ad slot verification | `research_history/`, test scripts |

### Session Startup Protocol
```bash
cat claude-progress.txt          # Review last session state
cat feature_list.json            # Check feature completion
ls research_history/             # Review milestone logs
git log --oneline -10            # Review recent commits
```

---

## Harness Files

### `feature_list.json`
```json
[
  { "id": "impact-cards", "label": "Infrastructure Impact Cards", "status": "pending", "agent": "frontend" },
  { "id": "sector-filter", "label": "Sector Filter Page", "status": "pending", "agent": "frontend" },
  { "id": "country-page", "label": "Country Detail Page", "status": "pending", "agent": "frontend" },
  { "id": "impacts-json", "label": "impacts.json data (20+ entries)", "status": "pending", "agent": "data" },
  { "id": "conflicts-json", "label": "conflicts.json data", "status": "pending", "agent": "data" },
  { "id": "api-visit", "label": "/api/visit POST route", "status": "pending", "agent": "backend" },
  { "id": "api-counter", "label": "/api/counter GET route", "status": "pending", "agent": "backend" },
  { "id": "sheets-webhook", "label": "Google Sheets webhook", "status": "pending", "agent": "backend" },
  { "id": "i18n-8lang", "label": "8-language i18n", "status": "pending", "agent": "seo" },
  { "id": "sitemap", "label": "sitemap.xml", "status": "pending", "agent": "seo" },
  { "id": "robots", "label": "robots.txt", "status": "pending", "agent": "seo" },
  { "id": "json-ld", "label": "JSON-LD structured data", "status": "pending", "agent": "seo" },
  { "id": "adsterra-header", "label": "Adsterra header banner", "status": "pending", "agent": "frontend" },
  { "id": "adsterra-sidebar", "label": "Adsterra sidebar", "status": "pending", "agent": "frontend" },
  { "id": "adsterra-in-content", "label": "Adsterra in-content", "status": "pending", "agent": "frontend" },
  { "id": "adsterra-mobile-sticky", "label": "Adsterra mobile sticky", "status": "pending", "agent": "frontend" },
  { "id": "visitor-counter-footer", "label": "Visitor counter in footer", "status": "pending", "agent": "frontend" },
  { "id": "vercel-deploy", "label": "Vercel prod deploy", "status": "pending", "agent": "qa" }
]
```

### `claude-progress.txt` (template)
```
Project: Conflict Impact
Last session: [DATE]
Last milestone: M0
Next action: Begin M1 — populate impacts.json with 20+ real entries
Blockers: none
Notes:
```

---

## Ads Integration (Adsterra)

Adsterra account: Sign up at https://publishers.adsterra.com

### Ad Slot Configuration

**Header Banner** (728x90 desktop / 320x50 mobile)
```tsx
// src/components/ads/AdsterraHeader.tsx
'use client';
export default function AdsterraHeader() {
  return (
    <div className="w-full flex justify-center py-2 bg-gray-50 border-b border-gray-100">
      {/* Adsterra Header Banner — replace with actual script */}
      <div
        className="adsterra-header"
        data-slot="header-banner"
        style={{ minHeight: '50px', width: '100%', maxWidth: '728px' }}
      >
        {/* PASTE ADSTERRA HEADER SCRIPT HERE */}
      </div>
    </div>
  );
}
```

**Sidebar Ad** (300x250)
```tsx
// src/components/ads/AdsterraSidebar.tsx
'use client';
export default function AdsterraSidebar() {
  return (
    <div className="hidden lg:block sticky top-4">
      <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
        <p className="text-xs text-gray-400 text-center mb-1">Advertisement</p>
        <div style={{ width: '300px', height: '250px' }}>
          {/* PASTE ADSTERRA 300x250 SCRIPT HERE */}
        </div>
      </div>
    </div>
  );
}
```

**In-Content Ad** (between impact card rows)
```tsx
// src/components/ads/AdsterraInContent.tsx
'use client';
export default function AdsterraInContent() {
  return (
    <div className="my-6 flex justify-center">
      <div className="bg-neutral-50 rounded-lg p-2 border border-gray-100 w-full max-w-2xl">
        <p className="text-xs text-gray-400 text-center mb-1">Advertisement</p>
        {/* PASTE ADSTERRA IN-CONTENT SCRIPT HERE */}
      </div>
    </div>
  );
}
```

**Mobile Sticky Footer** (320x50)
```tsx
// src/components/ads/AdsterraMobileSticky.tsx
'use client';
export default function AdsterraMobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center lg:hidden bg-white border-t border-gray-200">
      <div style={{ width: '320px', height: '50px' }}>
        {/* PASTE ADSTERRA MOBILE STICKY SCRIPT HERE */}
      </div>
    </div>
  );
}
```

---

## Google Sheets Webhook

### Setup
1. Create Google Sheet: "conflict-impact-visits"
2. Columns: `timestamp | locale | path | referrer | user_agent | country_code | session_id`
3. Deploy Google Apps Script as web app (POST handler)

### Apps Script
```javascript
// Google Apps Script — deploy as Web App (Anyone can access)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date().toISOString(),
    data.locale || '',
    data.path || '',
    data.referrer || '',
    data.userAgent || '',
    data.countryCode || '',
    data.sessionId || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Next.js API Route `/api/visit`
```typescript
// src/app/api/visit/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        userAgent: req.headers.get('user-agent') || '',
        countryCode: req.headers.get('x-vercel-ip-country') || '',
      }),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
```

### Layout Middleware (auto-fire on every page visit)
```typescript
// src/app/[locale]/layout.tsx  (server component — fire via useEffect in client wrapper)
// src/components/VisitTracker.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  useEffect(() => {
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        path: pathname,
        referrer: document.referrer,
        sessionId: sessionStorage.getItem('sid') || crypto.randomUUID(),
      }),
    });
  }, [pathname, locale]);
  return null;
}
```

---

## Visitor Counter

### Google Sheets Counter Sheet
- Sheet 2 name: `counts`
- Columns: `date | count`
- Apps Script function increments today's row and returns `{ today, total }`

### `/api/counter` Route
```typescript
// src/app/api/counter/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(process.env.GOOGLE_SHEETS_COUNTER_URL!, {
    next: { revalidate: 60 }, // cache 60s
  });
  const data = await res.json();
  return NextResponse.json(data);
}
```

### Footer Counter Component
```tsx
// src/components/VisitorCounter.tsx
'use client';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [counts, setCounts] = useState({ today: 0, total: 0 });

  useEffect(() => {
    fetch('/api/counter')
      .then(r => r.json())
      .then(setCounts);
  }, []);

  return (
    <div className="text-xs text-gray-400 text-center mt-4 space-x-4">
      <span>Visitors today: <strong className="text-gray-600">{counts.today.toLocaleString()}</strong></span>
      <span>Total: <strong className="text-gray-600">{counts.total.toLocaleString()}</strong></span>
    </div>
  );
}
```

---

## SEO Strategy

### Target Keywords
- Primary: "civilian impact war", "infrastructure conflict damage", "conflict humanitarian impact"
- Secondary: "ukraine infrastructure damage", "war civilian casualties data", "conflict affected hospitals"
- Long-tail: "how many hospitals destroyed in ukraine war", "conflict water supply disruption"

### Metadata per Page
```typescript
// src/app/[locale]/page.tsx
import { Metadata } from 'next';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Conflict Impact — Civilian Risk & Infrastructure Disruption Dashboard',
    description: 'Track the civilian cost of armed conflict: schools, hospitals, power, water, and telecom damage in active war zones worldwide.',
    keywords: ['civilian impact war', 'infrastructure conflict damage', 'conflict humanitarian impact'],
    openGraph: {
      title: 'Conflict Impact Dashboard',
      description: 'Real-time civilian infrastructure disruption data from active conflicts.',
      type: 'website',
      locale: params.locale,
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `https://conflict-impact.vercel.app/${params.locale}`,
      languages: {
        'en': '/en', 'ko': '/ko', 'ja': '/ja', 'zh': '/zh',
        'es': '/es', 'fr': '/fr', 'de': '/de', 'pt': '/pt',
      },
    },
  };
}
```

### JSON-LD Structured Data
```typescript
// src/components/JsonLd.tsx
export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Conflict Impact — Infrastructure Disruption Data',
    description: 'Structured data on civilian infrastructure disruption in active armed conflicts.',
    url: 'https://conflict-impact.vercel.app',
    creator: { '@type': 'Organization', name: 'Conflict Impact' },
    keywords: ['conflict', 'war', 'civilian impact', 'infrastructure', 'humanitarian'],
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### `sitemap.ts`
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
const locales = ['en','ko','ja','zh','es','fr','de','pt'];
const base = 'https://conflict-impact.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about'];
  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.7,
    }))
  );
}
```

### `robots.ts`
```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://conflict-impact.vercel.app/sitemap.xml',
  };
}
```

---

## i18n Setup

### `i18n.ts`
```typescript
// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
```

### `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en','ko','ja','zh','es','fr','de','pt'],
  defaultLocale: 'en',
});
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

### `messages/en.json` (excerpt)
```json
{
  "nav": { "home": "Home", "about": "About", "sectors": "Sectors" },
  "home": {
    "title": "Conflict Impact",
    "subtitle": "Civilian Risk & Infrastructure Disruption",
    "description": "Track the civilian cost of armed conflict worldwide.",
    "filter_by_sector": "Filter by Sector",
    "filter_by_country": "Filter by Country",
    "severity_critical": "Critical",
    "severity_severe": "Severe",
    "severity_moderate": "Moderate",
    "trend_worsening": "Worsening",
    "trend_stable": "Stable",
    "trend_improving": "Improving"
  },
  "sectors": {
    "hospitals": "Hospitals",
    "schools": "Schools",
    "power": "Power Grid",
    "water": "Water Supply",
    "telecom": "Telecommunications",
    "roads": "Roads & Bridges",
    "housing": "Housing"
  },
  "footer": {
    "visitors_today": "Visitors today",
    "visitors_total": "Total visitors",
    "disclaimer": "Data sourced from UN agencies, WHO, and verified NGO reports."
  }
}
```

### `messages/ko.json` (excerpt)
```json
{
  "nav": { "home": "홈", "about": "소개", "sectors": "분야" },
  "home": {
    "title": "분쟁 영향",
    "subtitle": "민간인 위험 및 인프라 피해",
    "description": "전 세계 무력 분쟁이 민간인에게 미치는 영향을 추적합니다.",
    "filter_by_sector": "분야별 필터",
    "filter_by_country": "국가별 필터"
  }
}
```

---

## Cost Analysis

| Resource | Plan | Monthly Cost |
|---|---|---|
| Vercel Hosting | Free (Hobby) | $0 |
| GitHub Repo | Free | $0 |
| Google Sheets | Free (personal) | $0 |
| Google Apps Script | Free | $0 |
| Domain (optional) | Namecheap .com | ~$1/month |
| Adsterra | Publisher (revenue) | +revenue |
| **Total** | | **$0–$1/month** |

Vercel free limits: 100GB bandwidth, 100 deployments/day, serverless function executions within hobby limits — sufficient for 50k–200k monthly visitors.

---

## Launch Checklist

### Pre-Launch
- [ ] `impacts.json` has minimum 20 entries across 5+ countries
- [ ] `conflicts.json` has minimum 8 active conflicts
- [ ] All 8 locale message files populated
- [ ] Google Sheets webhook URL stored in Vercel environment variables
- [ ] `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_COUNTER_URL` set in Vercel dashboard
- [ ] Adsterra account approved; ad scripts inserted in placeholder components
- [ ] Lighthouse score: Performance ≥ 85, SEO = 100, Accessibility ≥ 90
- [ ] All 8 locale routes render correctly (`/en`, `/ko`, `/ja`, `/zh`, `/es`, `/fr`, `/de`, `/pt`)
- [ ] Visitor counter increments and displays in footer
- [ ] sitemap.xml accessible and validates
- [ ] robots.txt accessible

### Deploy Command
```bash
vercel --prod
```

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add canonical tags verified in all pages
- [ ] Monitor Google Sheets for incoming visit data
- [ ] Set up Adsterra payment details
- [ ] Schedule weekly data review (impacts.json updates)

---

## UI Design Notes

### Color Palette
```
Background:   bg-slate-50 (page), bg-gray-50 (cards), bg-neutral-50 (sidebar)
Text:         text-gray-900 (headings), text-gray-600 (body), text-gray-400 (meta)
Borders:      border-gray-100, border-gray-200
Shadows:      shadow-sm, hover:shadow-md
Accent Critical: bg-red-50 text-red-700 border-red-200
Accent Severe:   bg-orange-50 text-orange-700 border-orange-200
Accent Moderate: bg-yellow-50 text-yellow-700 border-yellow-200
Sector icons:    Lucide React (no external images)
```

### ImpactCard Component
```tsx
// src/components/ImpactCard.tsx
import { Building2, Droplets, Zap, Wifi, GraduationCap } from 'lucide-react';

const sectorIcons = {
  hospitals: Building2, water: Droplets, power: Zap,
  telecom: Wifi, schools: GraduationCap,
};

const severityStyles = {
  critical: 'bg-red-50 border-red-200 text-red-700',
  severe: 'bg-orange-50 border-orange-200 text-orange-700',
  moderate: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  limited: 'bg-green-50 border-green-200 text-green-700',
};

export default function ImpactCard({ impact }: { impact: Impact }) {
  const Icon = sectorIcons[impact.sector] || Building2;
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {impact.sector}
          </span>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${severityStyles[impact.severity]}`}>
          {impact.severity}
        </span>
      </div>
      <h3 className="text-gray-900 font-semibold text-base mb-1">{impact.country}</h3>
      <p className="text-gray-600 text-sm mb-3">{impact.description}</p>
      <div className="text-xs text-gray-400 flex justify-between">
        <span>{impact.affected_count.toLocaleString()} {impact.affected_unit}</span>
        <span>{impact.date}</span>
      </div>
    </div>
  );
}
```
