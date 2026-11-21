# Day 01 · Field Notes

## The problem

Independent neighborhood places are scattered across paid listings and social posts.

## How this project helps

Build a searchable, community-maintained guide with clear details and a submission path.

## Your implementation challenge

The interface, starter records, React state, and event-handler wiring are already written. The service functions in `src/services/challenge.js` are intentionally unfinished and throw visible errors. Implement the functions and their backend; keep UI rendering in `src/App.jsx` and domain rules/network access in the service layer. Starter records are fictional fixtures, not production data.

### Learning goals

- Validate place submissions.
- Implement search and category filters.
- Persist saved places and prevent duplicates.

### API contract

- `GET /api/places?query=...&category=...` returns JSON shaped like `{"records":[{"id":"...","title":"...","description":"...","category":"...","meta":"...","image":"...","imageAlt":"..."}]}`.
- `POST /api/places/:recordId/actions` accepts a JSON action and returns a JSON result. Validate inputs and enforce authorization in the backend.
- Configure `VITE_API_BASE_URL` when the API is served from another origin. Vite variables prefixed with `VITE_` are public in the browser bundle; never put secrets there.

### Definition of done

- [ ] Validate place submissions.
- [ ] Implement search and category filters.
- [ ] Persist saved places and prevent duplicates.
- [ ] Show loading, empty, and recoverable error states without disguising failures as success.
- [ ] Add automated tests for service logic and API boundary cases.
- [ ] Check keyboard navigation and a narrow mobile viewport.

## Run the project

From the challenge root, install once with `npm install`, then run `npm run dev --workspace=01-field-notes`. You can also run `npm run dev` from this folder. Build with `npm run build --workspace=01-field-notes`.

## Contributing

Choose one focused improvement (a tested rule, accessible interaction, or clarified API contract). Create a branch, explain the user problem and intended behavior, run the app and build, and document verification in your pull request. Keep credentials and personal information out of fixtures. Preserve the unfinished exercise functions unless contributing an explicitly marked optional reference solution.
