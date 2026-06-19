# Project Architecture — Quick Map

You only need to touch ~20 files. Everything else is library code (shadcn/ui)
or auto-generated (Cloud integration, route tree). Use this map to find what
you need fast.

## 1. Pages (what the user sees)

File-based routing — filename = URL.

| URL            | File                             | Purpose                                     |
| -------------- | -------------------------------- | ------------------------------------------- |
| `/`            | `src/routes/index.tsx`           | Homepage (hero, categories, trending, etc.) |
| `/salons`      | `src/routes/salons.index.tsx`    | All-salons list with filters                |
| `/salons/:id`  | `src/routes/salons.$salonId.tsx` | Single salon detail page                    |
| `/book/:id`    | `src/routes/book.$salonId.tsx`   | Booking form                                |
| `/ai-advisor`  | `src/routes/ai-advisor.tsx`      | AI beauty advisor page                      |
| `/gallery`     | `src/routes/gallery.tsx`         | Before & After gallery                      |
| `/memberships` | `src/routes/memberships.tsx`     | Membership plans                            |
| (root layout)  | `src/routes/__root.tsx`          | App shell — wraps every page                |

## 2. Reusable Components

| File                                         | What it does                               |
| -------------------------------------------- | ------------------------------------------ |
| `src/components/SiteLayout.tsx`              | Header + footer wrapper used by every page |
| `src/components/SalonCard.tsx`               | Salon tile shown in lists/grids            |
| `src/components/BeforeAfter.tsx`             | Drag-to-compare slider                     |
| `src/components/ThemeToggle.tsx`             | Light/dark mode switch                     |
| `src/components/home/Hero.tsx`               | Homepage hero section                      |
| `src/components/home/CategoryCards.tsx`      | Haircut / Bridal / Spa / Grooming cards    |
| `src/components/home/TrendingServices.tsx`   | "Popular this week" strip                  |
| `src/components/home/Stats.tsx`              | Numbers band (salons, bookings, etc.)      |
| `src/components/home/AIAdvisor.tsx`          | AI advisor widget                          |
| `src/components/home/BeforeAfterGallery.tsx` | Homepage B/A teaser                        |
| `src/components/home/MembershipPlans.tsx`    | Plan pricing cards                         |
| `src/components/home/SalonMap.tsx`           | Map preview block                          |
| `src/components/home/FeatureLinks.tsx`       | Links to sub-pages                         |

## 3. Data & Logic

| File                            | What it does                                               |
| ------------------------------- | ---------------------------------------------------------- |
| `src/data/salons.ts`            | All salon records, categories, before/after pairs, reviews |
| `src/data/services.ts`          | Trending services list                                     |
| `src/lib/aiAdvisor.ts`          | Offline recommendation rules (fallback)                    |
| `src/lib/aiAdvice.functions.ts` | Server function calling Lovable AI (Gemini)                |
| `src/lib/utils.ts`              | `cn()` helper for className merging                        |

## 4. Styling

| File             | What it does                                               |
| ---------------- | ---------------------------------------------------------- |
| `src/styles.css` | Design tokens (colors, gradients, shadows), Tailwind setup |

## 5. DO NOT EDIT — generated / library

| Folder/File                                       | Why                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| `src/components/ui/*` (50+ files)                 | shadcn/ui primitives (Button, Card, Dialog…). Import them; don't modify. |
| `src/integrations/supabase/*`                     | Lovable Cloud client + types. Auto-generated.                            |
| `src/routeTree.gen.ts`                            | Auto-generated route registry.                                           |
| `src/router.tsx`, `src/start.ts`, `src/server.ts` | App bootstrap.                                                           |
| `.env`, `supabase/config.toml`                    | Cloud config. Auto-managed.                                              |

## TL;DR

- **Want to change a page?** Edit `src/routes/<page>.tsx`.
- **Want to change a salon's info?** Edit `src/data/salons.ts`.
- **Want to change colors / theme?** Edit `src/styles.css`.
- **Want to add a new section?** Make a component in `src/components/home/` and drop it into the page.
