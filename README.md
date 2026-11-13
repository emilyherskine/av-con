# AV-Con

This repository contains the AV-Con website, a React-based site for the AV-Con event and related content. The app is organised around a set of route-based pages for event information, ticket booking, schedules, news, speaker and sponsor content, exhibitor registration, the Aviation Pathway Portal, AvCon Network, and the AvCon Ezine.

## What is in this project?

The frontend is built with React and uses React Router for page navigation. The project also includes styling and UI support from React Bootstrap, Material UI, and Font Awesome, along with form and email-related libraries.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The app will usually be available at http://localhost:3000.

## Available scripts

- `npm start` — start the development server.
- `npm test` — run the test suite.
- `npm run build` — create a production build in the `build` folder.
- `npm run deploy` — build the app and deploy it using GitHub Pages.

## Project structure

- `src/App.jsx` defines the main routes for the site.
- `src/Home`, `src/Event`, `src/BookTickets`, and related folders contain individual page components.
- `src/CommonComponents` holds shared UI pieces such as the header, footer, and hero section.

## Deployment

The project is configured with a homepage of `http://avcon.ie/` and uses `gh-pages` for deployment from the `build` output.

## Aviation Pathway Portal (in progress)

The public directory displays approved, unexpired listings managed through an
in-house Node/Express API and SQLite. It does not include bundled sample
opportunities; real listings must be submitted and approved before they appear.
No Docker or Supabase is needed. Listings without an expiry date remain
available; expired listings are hidden. Edits to approved listings require
another review.

### Local development

1. Run `npm run start:portal-api` and, in a separate terminal, `npm start`.
   The frontend uses `http://localhost:3001/api/portal` in development.
2. Register a **test** organisation. To make an account an administrator,
   run `npm run portal:make-admin -- test@example.com` with the registered
   email, then sign out and back in.
3. Run `npm run test:portal-api` for API tests. The database and uploaded files
   are stored under `server/portal/data/` (ignored by Git). Set `PORTAL_DATA_DIR`
   to an absolute path to use a different local directory. `PORTAL_PORT` and
   `PORTAL_SITE_ORIGIN` change the API port and permitted frontend origin;
   `REACT_APP_PORTAL_API_URL` sets the frontend's API URL.

JPEG, PNG, WebP and PDF uploads are limited to 10 MiB, checked by file
signature, and scanned using the locally installed `clamscan` executable.
Install ClamAV and its current signature database separately. Uploads fail
closed if scanning is unavailable, reports an error, or detects malware.
There is no browser-side bypass. Save a draft before adding files. Changing
files on a submitted or approved listing requires returning it to draft or
pausing it and submitting it for review again.

**Local testing only:** account email verification, password recovery,
organisation administration, renewal reminders, durable hosting, backups,
scanner updates and production security review are not implemented. Registration
currently signs users in without verifying email. The API binds to loopback and
refuses production mode; GitHub Pages cannot host the API. Do not expose it to
the public or use real personal data until these gaps are addressed. Any
remaining listings in a local database are local test data, not production
opportunities.

