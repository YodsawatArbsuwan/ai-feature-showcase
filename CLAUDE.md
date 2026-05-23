# CLAUDE.md

This file provides guidance to Claude Code (and other AI coding agents) when working with this repository.

## Project Overview

`ai-feature-showcase` is a web application for demonstrating and interactively exploring the company's AI-powered features. The goal is to give users — whether internal stakeholders or external partners — a clear, hands-on experience of what the platform can do.

Core responsibilities:

- Feature catalog: browsing all available AI features grouped by category
- Interactive playground: live demos where users can input data and see AI output in real time
- Feature detail pages: documentation, use-case descriptions, and limitations per feature
- API integration: calling the company's AI service endpoints to power the demos
- Authentication (optional): gating certain advanced demos behind login

Tech stack:

- Next.js `16.1.6` with App Router
- React `19.2.3`
- TypeScript `^5` with `strict: true`
- Tailwind CSS `^4`
- TanStack React Query `^5`
- Generated API client from `@hey-api/openapi-ts` using `@hey-api/client-fetch`
- UI libraries include Ant Design, Lucide React, and custom Tailwind components
- Docker production build uses Next.js `output: "standalone"`

## High-Level Architecture

### Directory Structure

```text
ai-feature-showcase/
├── app/                                    # Next.js App Router — routing layer only, no business logic
│   ├── (marketing)/                        # Public pages, no auth required
│   │   ├── page.tsx                        # Landing page / feature catalog
│   │   ├── features/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Feature info & detail page
│   │   └── layout.tsx
│   ├── (demo)/                             # Interactive playground pages
│   │   ├── demo/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Playground per AI feature
│   │   └── layout.tsx
│   ├── (auth)/                             # Auth pages (only when auth is enabled)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                                # Next.js Route Handlers (server-side proxy, webhooks)
│   │   └── proxy/
│   │       └── [...path]/
│   │           └── route.ts
│   ├── error.tsx                           # Global error boundary
│   ├── not-found.tsx
│   ├── globals.css
│   └── layout.tsx                          # Root layout (fonts, providers, metadata)
│
├── components/                             # All React components
│   ├── ui/                                 # Base UI primitives (Button, Input, Badge, Card, Dialog…)
│   ├── layout/                             # App shell: Header, Sidebar, Footer, Breadcrumb, Nav
│   ├── common/                             # Shared composite components
│   │   ├── feature-card/                   # Feature catalog card
│   │   ├── code-block/                     # Syntax-highlighted code display
│   │   ├── json-viewer/                    # Collapsible JSON result viewer
│   │   ├── error-boundary/                 # React error boundary wrapper
│   │   └── empty-state/                    # Empty / placeholder state UI
│   ├── demo/                               # Per-feature playground components
│   │   ├── text-summarization/
│   │   ├── image-analysis/
│   │   └── _shared/                        # Shared demo primitives (InputPanel, ResultPanel, ApiInfo)
│   └── providers/                          # Global React context providers
│       ├── query-provider.tsx              # TanStack React Query provider
│       └── auth-provider.tsx              # Auth session provider
│
├── features/                               # Feature-scoped business logic (colocation pattern)
│   └── [feature-name]/                     # One directory per AI feature
│       ├── hooks/                          # React Query hooks (useQuery / useMutation)
│       ├── fetchers/                       # API-fetching functions wrapping generated client
│       ├── schemas/                        # Zod validation schemas for inputs/outputs
│       └── types.ts                        # Feature-specific TypeScript types
│
├── hooks/                                  # Shared global React hooks
│   ├── use-feature-list.ts
│   └── use-auth.ts
│
├── lib/                                    # Utilities and service configuration
│   ├── api/
│   │   ├── client.ts                       # OpenAPI client runtime configuration
│   │   └── interceptors.ts                 # Request / response interceptors (auth, logging)
│   ├── auth/
│   │   └── token.ts                        # JWT helpers and session management
│   ├── ai/                                 # AI response formatters and shared AI helpers
│   └── utils/
│       ├── cn.ts                           # className merge utility (clsx + tailwind-merge)
│       └── format.ts                       # Data formatting helpers (dates, numbers, truncation)
│
├── generated/
│   └── api/                                # Auto-generated OpenAPI client — do not hand-edit
│
├── config/                                 # Static app-level configuration
│   ├── features.ts                         # Central AI feature registry and metadata
│   ├── navigation.ts                       # Navigation structure and route constants
│   └── site.ts                             # Site metadata, SEO defaults, global constants
│
├── types/                                  # Global TypeScript type declarations
│   ├── feature.ts                          # FeatureMeta, FeatureCategory, Badge types
│   ├── demo.ts                             # DemoInput, DemoResult, PlaygroundState types
│   └── api.ts                              # Shared API envelope types
│
├── mocks/                                  # Mock responses for development / offline testing
│   └── [feature-name].mock.ts
│
├── public/                                 # Static assets (served as-is by Next.js)
│   ├── images/
│   ├── icons/
│   └── samples/                            # Sample input files for "Try an example" buttons
│
└── scripts/                                # Operational and CI/CD scripts
    ├── compose-up.sh                       # Docker Compose helper
    └── generate-api.sh                     # API generation wrapper
```

### Typical Data Flow

```
User interaction in app/(demo)/demo/[slug]/page.tsx
  └─▶ components/demo/[feature]/<FeatureName>Demo.tsx   (playground UI)
        └─▶ features/[feature]/hooks/<feature>.hook.ts  (React Query mutation)
              └─▶ features/[feature]/fetchers/<feature>.fetcher.ts
                    └─▶ generated/api/                  (generated OpenAPI client)
                          └─▶ lib/api/client.ts          (auth + base URL)
```

Use this layering consistently. UI components should not call generated API functions directly; always go through the feature's fetcher and hook.

### Layer Responsibilities

`app/` pages are thin route shells — they import a single feature demo component and pass route params. No business logic lives in `app/`.

`components/` holds all React UI. `ui/` contains unstyled base primitives. `common/` contains shared composite components. `demo/` contains per-feature playground widgets.

`features/[name]/` colocates everything needed for one AI feature: its hooks, fetchers, schemas, and types. This makes features easy to add, remove, or review in isolation.

`lib/` contains framework-agnostic utilities and service configuration that are shared across features.

`config/` contains static data (feature registry, navigation) that does not change at runtime.

## Feature Registry

All AI features are declared in `config/features.ts`. Each entry includes:

```ts
export type FeatureMeta = {
  slug: string; // URL slug, e.g. "text-summarization"
  name: string; // Display name
  category: FeatureCategory; // e.g. "NLP", "Vision", "Audio", "Data"
  description: string; // Short description shown on the catalog card
  docsUrl?: string; // Link to full API docs if available
  badge?: "New" | "Beta" | "Stable";
  disabled?: boolean; // Hide from catalog without deleting
};
```

When adding a new AI feature:

1. Add an entry to `config/features.ts` with the feature's metadata.
2. Create `features/<feature-name>/types.ts` — input/output TypeScript types.
3. Create `features/<feature-name>/schemas/` — Zod schemas for input validation.
4. Create `features/<feature-name>/fetchers/<feature>.fetcher.ts` — API call.
5. Create `features/<feature-name>/hooks/<feature>.hook.ts` — React Query hook.
6. Create `components/demo/<feature-name>/<FeatureName>Demo.tsx` — playground UI.
7. Add a mock response in `mocks/<feature-name>.mock.ts` for offline development.
8. The route `app/(demo)/demo/[slug]/page.tsx` auto-resolves via the slug — no new route file needed unless the feature needs a custom layout.

## Commands

Prefer using Yarn in this repository because `yarn.lock` exists and `postinstall` runs API generation.

Common commands:

```bash
yarn dev              # Start Next.js development server
yarn build            # Build production bundle
yarn start            # Start production server after build
yarn lint             # Run ESLint
yarn generate:api     # Regenerate OpenAPI client into generated/api
```

## Environment Variables

See `.env.example` for the baseline values.

Required/important variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME="AI Feature Showcase"
OPENAPI_SPEC_URL=http://localhost:4000/_api-json
NODE_ENV=development
# Optional: enable auth gate
NEXT_PUBLIC_AUTH_ENABLED=false
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` is embedded into the browser bundle by Next.js. For Docker builds, pass it as a build argument.
- `OPENAPI_SPEC_URL` is used by `openapi-ts.config.ts` when running `yarn generate:api`.
- `NEXT_PUBLIC_AUTH_ENABLED` toggles whether login is required to access demo pages.
- Do not commit secrets. Treat `.env`, `.env.local`, `.env.production`, and `.env.demo` as potentially sensitive.

## Generated API Client Rules

`generated/api/` is generated code. Do not manually edit files in this directory.

When the AI service API contracts change:

1. Ensure the backend OpenAPI spec is reachable at `OPENAPI_SPEC_URL`.
2. Run:

   ```bash
   yarn generate:api
   ```

3. Update fetchers/hooks/demo components to match updated types and method names.
4. Run lint/build checks.

Generated client configuration:

- Config file: `openapi-ts.config.ts`
- Output: `generated/api`
- Client: `@hey-api/client-fetch`
- Generated services are class-based (`services.asClass: true`)

## API Client and Authentication

`lib/api/client.ts` configures the generated client:

- Base URL: `process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"`
- Interceptors live in `lib/api/interceptors.ts` — request interceptor adds `Authorization: Bearer <token>` when a token exists in browser `localStorage` (only when `NEXT_PUBLIC_AUTH_ENABLED=true`)

Auth storage helpers are in `lib/auth/token.ts`:

- `AUTH_TOKEN_STORAGE_KEY = "auth_token"`
- `AUTH_USER_STORAGE_KEY = "auth_user"`
- Provides JWT payload decoding, session persistence, retrieval, and clearing

Best practices:

- Guard browser-only APIs with `typeof window !== "undefined"`.
- Do not access `localStorage` or browser APIs from Server Components.
- Keep token handling centralized in `lib/auth/token.ts` and `lib/api/client.ts`.
- Do not log tokens, authorization headers, or sensitive payloads.

## Next.js and React Conventions

Follow App Router conventions.

- Files under `app/**/page.tsx` are route pages.
- Files under `app/**/layout.tsx` are route layouts.
- Components are Server Components by default.
- Add `"use client";` only when a file uses hooks, event handlers, browser APIs, React Query hooks, or interactive demo state.
- Keep client component boundaries as small as practical — the feature catalog can be a Server Component; only the interactive playground needs client-side rendering.
- Prefer colocating demo-specific UI near the route; move reusable components into `components/`.

React best practices:

- Prefer function components.
- Keep components focused and composable.
- Avoid mixing data fetching, state orchestration, and rendering in one large component.
- Use stable keys from feature slugs or backend IDs; avoid array indexes for mutable lists.
- Prefer explicit prop types and exported reusable types.
- Avoid unnecessary `useEffect`; derive values during render when possible.
- Do not introduce global state unless genuinely needed. React Query handles server-state caching.

## TypeScript Rules

TypeScript is strict. Keep code type-safe.

- Avoid `any`. Use generated API types, local DTOs, generics, or `unknown` with narrowing.
- Prefer `type` for object shapes unless declaration merging is needed.
- Use `import type` for type-only imports.
- Keep function parameters and return types explicit for exported functions, fetchers, hooks, and utilities.
- Reuse generated OpenAPI response/request types from `@/generated/api` where possible.
- Preserve the `@/*` path alias defined in `tsconfig.json`.
- Do not weaken `tsconfig.json` strictness to make errors disappear.

## Data Fetching Pattern

Use the fetcher + hook pattern. Each AI feature owns its fetchers and hooks inside `features/[feature-name]/`.

Fetcher responsibilities (`features/[name]/fetchers/<name>.fetcher.ts`):

- Import generated API functions/types from `generated/api`.
- Call generated client methods.
- Transform UI-level params into the shape expected by the generated methods.
- Check `response.data` and throw meaningful errors if absent.
- Return typed response data.

Hook responsibilities (`features/[name]/hooks/<name>.hook.ts`):

- Wrap fetchers with `useQuery` or `useMutation`.
- Define stable, descriptive query keys.
- Use `enabled` for queries that require required parameters.
- Type query/mutation data and variables.
- Handle invalidation or cache resets after mutations when needed.

Shared global hooks that are not feature-specific live in `hooks/` at the project root.

Query key guidance:

```ts
["feature", featureSlug, "demo", params][("feature", "list", category)][
  ("feature", featureSlug, "metadata")
];
```

Keep query keys serializable and deterministic.

## Demo Playground UI Guidelines

Interactive demo components live in `components/demo/<feature-name>/`.

Each demo component should:

- Show a clear **input area** (text box, file upload, dropdowns, sliders) matching the feature's expected input.
- Show an **output/result area** that renders the AI response in a human-friendly format (formatted text, annotated image, audio player, charts, JSON viewer, etc.).
- Show meaningful **loading**, **empty**, and **error** states.
- Include a **"Try an example"** button that populates the input with a sample so users can explore without typing.
- Show a summary of the **API call** (endpoint, latency, model used) in a collapsible panel for technically inclined users.
- Be accessible: semantic form elements, proper labels, keyboard navigation.

Avoid:

- Exposing raw API errors to users — show friendly messages.
- Blocking the entire page on a single slow request — use streaming or progressive loading where possible.
- Hard-coding demo responses; always go through the fetcher/hook pipeline (or mocks in development).

## Styling and UI Conventions

The project uses Tailwind utility classes throughout JSX.

- Follow consistent visual patterns: white/dark cards, subtle borders, rounded corners, spacing via Tailwind utilities.
- Preserve dark mode classes where present (`dark:*`).
- Feature category badges and status badges (`New`, `Beta`, `Stable`) should use the shared `<Badge />` component.
- Thai text may be used in some UI labels and messages; keep wording natural and consistent.
- Prefer reusable shared components in `components/common/` for cards, code blocks, JSON viewers, and common states.
- Avoid introducing new UI library dependencies without a strong reason and team agreement.

## Error Handling and Loading States

- Every demo playground must handle loading, empty result, and error states explicitly.
- Fetchers should throw meaningful `Error` objects when expected data is missing.
- Components should not swallow errors silently.
- Use the existing `ErrorBoundary` where appropriate for feature-level failures.
- Avoid exposing raw technical error details to end users — show a friendly message and optionally log the detail to the console in development only.

## Performance Guidelines

- Keep Client Components minimal to reduce client bundle size; the feature catalog page can be fully server-rendered.
- Use dynamic imports (`next/dynamic`) for heavy demo components (e.g., image annotators, audio visualizers, rich editors).
- Avoid unnecessary re-renders; memoize only when there is a real measured cost.
- Do not refetch aggressively; configure React Query invalidation intentionally.
- Large demo inputs (images, audio files) should be validated for size client-side before uploading.

## Security Guidelines

- Never commit real credentials, API keys, or production secrets.
- Never log auth tokens or sensitive payloads.
- Validate and sanitize user-controlled values used in API request bodies.
- Keep authorization behavior centralized in the API client interceptor.
- Do not use `dangerouslySetInnerHTML` unless absolutely necessary and sanitized.
- Treat AI API responses as external data; guard optional fields before rendering.
- If user-submitted content is rendered (e.g., AI-generated HTML), sanitize it before display.

## Testing and Verification

There is currently no dedicated test script in `package.json`. At minimum, run:

```bash
yarn lint
yarn build
```

For changes involving generated API types:

```bash
yarn generate:api
yarn lint
yarn build
```

For UI/demo changes:

1. Run `yarn dev`.
2. Open `http://localhost:3000`.
3. Navigate to the affected feature page.
4. Try the demo with a real input and with the "Try an example" sample.
5. Verify loading, result, and error states (you can simulate errors by passing an invalid input or disabling the network).
6. Verify dark mode rendering if applicable.

For Docker/deployment changes:

```bash
sh scripts/compose-up.sh local up
sh scripts/compose-up.sh local logs
```

## Code Change Best Practices for Agents

Before changing code:

1. Read the relevant files first.
2. Check `config/features.ts` to understand the feature registry.
3. Identify the correct layer: `app/` (routing) → `components/` (UI) → `features/[name]/` (logic) → `lib/` (utilities).
4. Check nearby patterns and reuse them.
5. Identify whether the file is a Server Component or Client Component.
6. Check types from `generated/api` and `features/[name]/types.ts` before inventing local shapes.

While changing code:

- Make the smallest safe change that solves the task.
- Preserve existing behavior unless explicitly asked to change it.
- Keep imports ordered and remove unused imports.
- Do not hand-edit generated files.
- Do not change package manager files unless dependency changes are required.
- Do not add dependencies without user approval.
- Do not run git mutations (commit, push, reset, rebase, checkout) unless explicitly requested.

After changing code:

1. Run the most relevant verification command (`yarn lint`, `yarn build`, or targeted command).
2. Fix any issues introduced by the change.
3. Summarize changed files and verification results.

## Common Pitfalls

- Forgetting `"use client";` in demo playground components that use hooks or browser APIs.
- Adding `"use client";` too high in the tree and unnecessarily increasing the client bundle.
- Calling generated API functions directly from UI components instead of using fetchers/hooks.
- Editing `generated/api/` manually.
- Running `yarn generate:api` when the backend OpenAPI spec is not running/reachable.
- Using browser APIs during SSR without guards.
- Logging sensitive auth/session data.
- Weakening TypeScript strictness instead of fixing types.
- Adding a new feature to the UI without registering it in `config/features.ts`.
- Hard-coding mock responses in the component instead of using `mocks/` and the fetcher pipeline.

## Important Files

- `config/features.ts` - central AI feature registry (start here when exploring)
- `config/site.ts` - site metadata and global constants
- `package.json` - scripts and dependencies
- `tsconfig.json` - TypeScript strict config and `@/*` alias
- `eslint.config.mjs` - ESLint config
- `next.config.ts` - Next.js config with standalone output
- `openapi-ts.config.ts` - OpenAPI generation config
- `lib/api/client.ts` - generated client runtime configuration
- `lib/api/interceptors.ts` - request/response interceptors
- `lib/auth/token.ts` - auth token and session helpers
- `lib/utils/cn.ts` - className merge utility
- `components/providers/query-provider.tsx` - React Query provider
- `components/providers/auth-provider.tsx` - Auth session provider
- `Dockerfile` - multi-stage standalone production build
- `scripts/compose-up.sh` - Docker Compose helper
