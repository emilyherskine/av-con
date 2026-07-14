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

