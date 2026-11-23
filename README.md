# Field Notes

## The problem

Independent neighborhood places are scattered across paid listings and social posts.

## How this project helps

Build a searchable, community-maintained guide with clear details and a submission path.

### Learning goals

- Validate place submissions with JavaScript.
- Implement search and category filters.
- Persist saved places in the browser and prevent duplicates.
- Practice Node.js and npm as the local frontend development toolchain.

### I am done when you can

- Submit a new place and see useful validation feedback.
- Search and filter categories.
- Save a place and have it persist after reloading.
- Show loading, empty, and recoverable error states.
- Check the layout at narrow and wide viewport sizes.

## Challenge scope

This is a JavaScript frontend challenge. Use the supplied fictional starter records and browser storage. Keep the experience useful with local data if an online API is unavailable. Do not create a custom API or put secrets in browser code or public `VITE_` variables.

### Optional client-side API practice

Use browser `fetch()` to consume a relevant, established public API. Handle loading, empty, network, and non-success HTTP responses, and validate returned data before using it.

## UI constraints

- No emoji.
- Avoid fully rounded buttons and an everything-centered layout; use clear alignment and hierarchy.
- Use deep, balanced colors. Do not use gradients or glow effects.

## Run the project

Use Node.js LTS (which includes npm). From the repository root, install once with `npm install`, then run `npm run dev --workspace=field-notes`. You can also run `npm run dev` from this folder. Build with `npm run build --workspace=field-notes`. These commands run the frontend development and build tools.

## Contributing

Choose one focused improvement (a tested JavaScript rule, accessible interaction, or clearer client-side fetch behavior). Explain the user problem and intended behavior, run the app and build, and document verification in your pull request. Keep credentials and personal information out of fixtures. Preserve unfinished exercise functions unless contributing an explicitly marked optional reference solution.
