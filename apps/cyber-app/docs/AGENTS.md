# AGENTS.md — Agent guidance for this repository

Purpose: provide concise, actionable instructions for AI coding agents to be productive working in this frontend repo.

Quick commands
- **dev**: `npm run dev` — start the Vite dev server with HMR.
- **build**: `npm run build` — type-check and build for production.
- **lint**: `npm run lint` — run ESLint across the workspace.
- **preview**: `npm run preview` — serve the production build locally.

Key files and docs (link, don't embed)
- **README**: [README.md](README.md) — template notes and ESLint guidance.
- **Architecture**: [.workflow/ARCHITECTURE.md](.workflow/ARCHITECTURE.md) — feature-based architecture and conventions.
- **Package manifest**: [package.json](package.json) — scripts and dependencies.
- **Vite config**: [vite.config.ts](vite.config.ts) — app build and dev configuration.
- **TypeScript**: [tsconfig.json](tsconfig.json) and [tsconfig.app.json](tsconfig.app.json) — compiler settings used by builds and tooling.

Where to look first
- `src/features/` — feature modules (pages, components, slices, services).
- `src/shared/` — reusable components, hooks, services, and utils.
- `src/store/` — global store setup and registration patterns.
- `routes/`, `layouts/` — routing and page layout patterns.

Conventions and notes
- Architecture: feature-based organization. Keep feature-specific state and logic inside the feature folder.
- Linting: ESLint is configured; prefer fixing lint problems rather than suppressing rules.
- Type checking: `npm run build` runs `tsc -b` to enforce project references.
- No test runner configured in package.json (create tests under `tests/` or add a script if needed).

Agent behavior guidelines
- Prefer linking to existing docs rather than copying them. When you need to explain a file, link to it and summarize in 1–2 lines.
- Run `npm run dev` for local development; run `npm run build && npm run lint` for CI checks.
- When making code changes, follow existing folder patterns under `src/features/*` and `src/shared/*`.

Suggested next customizations
- Create an agent prompt that runs lint + build and reports failing files.
- Add a small skill to generate new feature scaffolds (`create-feature`) following the project's folder layout.

Questions or feedback: ask for preferred CI commands, test frameworks, or additional conventions to include.
