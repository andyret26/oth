# Project overview

This repository contains the **Oth! (osu! Tournament History)** web frontend. It provides player tournament history and statistics, tournament management, and match comparison screens. The frontend calls a separate Oth API; API implementation is outside this repository.

## Quick map

```text
.
├── src/                  # Vite + React + TypeScript web app
│   ├── App.tsx            # Application routes
│   ├── main.tsx           # Browser entry point and global providers
│   ├── pages/              # Route-level screens
│   ├── components/         # Shared and feature-specific UI
│   ├── services/           # API client and requests
│   ├── helpers/            # Data types, transformations, validation, form data
│   └── assets/             # Assets imported by source modules
├── public/                 # Files served from the site root
├── mobile-app/src/          # Empty directory scaffold for a possible mobile app
├── cypress/                 # Cypress end-to-end spec and support files
├── docs/                    # Agent guidance, ADRs, and project documentation
├── GLOSSARY.md              # Central domain vocabulary
├── package.json             # Scripts and dependencies for the web app
├── vite.config.ts           # Vite plugins and build configuration
└── tsconfig*.json            # TypeScript configuration
```

## Where to find things

### App startup and routing

- [`src/main.tsx`](../src/main.tsx) mounts the React app, configures Auth0 and browser routing, and adds the global navigation bar and toast notifications.
- [`src/App.tsx`](../src/App.tsx) maps URL paths to page components. `PrivateRoute` protects pages that require authentication.
- [`src/components/PrivateRoute.tsx`](../src/components/PrivateRoute.tsx) contains the authentication gate used by protected routes.

### Screens

Page-level components are in `src/pages/`; screen-specific styles generally sit beside the component.

| Area | Files | Route |
| --- | --- | --- |
| Landing and player search | `Landing.tsx`, `Landing.scss` | `/` |
| Tournament history | `History/` | `/history/:id` |
| Match comparison | `MatchCompare/` | `/match-compare` |
| Qualification statistics | `QualStats.tsx` | `/qual-stats` |
| Player statistics | `Stats/` | `/player/:id/stats` (authenticated) |
| Create or edit a tournament | `CreateTournament/`, `EditTournament/` | `/tournament/create`, `/tournament/edit/:id` (authenticated) |
| Add a player | `AddPlayer/` | `/player/add` (authenticated) |
| Access denied and unknown paths | `Unauthorized.tsx`, `NotFound.tsx` | `/unauthorized`, unmatched paths |

The navigation bar is mounted in `main.tsx`, so it is shared across routes. Route behavior and access requirements are defined in `App.tsx`.

### Shared UI and data

- `src/components/` contains reusable UI and components grouped by feature. `components/common/` holds general controls; folders such as `navBar/`, `TourneyCard/`, and `MatchCompare/` hold related UI.
- [`src/services/othApiService.ts`](../src/services/othApiService.ts) is the Axios client and the home for frontend-to-API requests.
- [`src/helpers/interfaces.ts`](../src/helpers/interfaces.ts) defines shared TypeScript data shapes. `functions.ts` has shared transformations and validation; JSON files hold form configuration data.
- `src/assets/` is for assets imported by TypeScript or CSS. `public/` is for assets addressed by root URL, such as `/Images/othLogo.png`.

### Docs and supporting code

- [`GLOSSARY.md`](../GLOSSARY.md) is the central source for domain terms. Follow [`docs/agents/domain.md`](agents/domain.md) when changing domain documentation.
- `docs/adr/` is the designated location for architecture decision records.
- [`docs/agents/issue-tracker.md`](agents/issue-tracker.md) explains the GitHub Issues workflow.
- `cypress/` contains the end-to-end spec and Cypress support files; [`cypress.config.ts`](../cypress.config.ts) configures Cypress. There is currently no Cypress script in `package.json`.
- `mobile-app/src/` has empty `context/`, `helpers/`, `navigation/`, `screens/`, and `services/` directories. The current pnpm workspace includes only the root package, so this scaffold is not an active workspace app yet.

## Common change paths

- To add or change a screen, update its page component and styles, then register or adjust its route in `src/App.tsx`.
- To change shared presentation, look in `src/components/`; check for a feature-specific component before adding another copy of shared UI.
- To change API calls, update `src/services/othApiService.ts` and the related types in `src/helpers/interfaces.ts`.
- To change tournament form behavior, inspect the relevant page under `src/pages/`, shared validation/conversion in `src/helpers/functions.ts`, and form data in `src/helpers/`.
- For authentication or route access changes, inspect `src/main.tsx`, `src/App.tsx`, and `src/components/PrivateRoute.tsx` together.

## Development commands and configuration

The root package is managed with pnpm. The scripts currently defined in `package.json` are:

- `pnpm dev` — start the Vite development server.
- `pnpm build` — run TypeScript checking and create a production build.
- `pnpm lint` — run ESLint.
- `pnpm preview` — serve the built output locally.

Auth0 configuration uses the `VITE_AUTH_DOMAIN` and `VITE_AUTH_CLIENT_ID` environment variables; see [`README.md`](../README.md). The API base URL is selected in `src/services/othApiService.ts`: development uses `http://localhost:5110/api/v1`, and production uses `https://osu-th-api.azurewebsites.net/api/v1`.

Other root configuration files include `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `tsconfig.node.json`, `cypress.config.ts`, and `vercel.json` (SPA route rewrites for deployment).
