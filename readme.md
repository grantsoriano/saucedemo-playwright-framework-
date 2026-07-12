# SauceDemo Test Automation Framework

End-to-end test automation framework for [SauceDemo](https://www.saucedemo.com), built with Playwright and TypeScript, covering UI, visual regression, and CI/CD reporting.

[![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-username>/<your-repo>/actions/workflows/ci.yml)

**Live Reports:** [Playwright HTML Report](https://<your-username>.github.io/<your-repo>/playwright-report/) · [Allure Report](https://<your-username>.github.io/<your-repo>/allure-report/)

<!-- Replace <your-username> and <your-repo> above once GitHub Pages is live -->

## Tech Stack

| Purpose               | Tool                             |
| --------------------- | -------------------------------- |
| Automation            | Playwright                       |
| Language              | TypeScript                       |
| IDE                   | VS Code                          |
| Version Control       | Git                              |
| Repository            | GitHub                           |
| CI/CD                 | GitHub Actions                   |
| Reporting             | Playwright HTML Report           |
| Advanced Reporting    | Allure                           |
| Linting               | ESLint                           |
| Formatting            | Prettier                         |
| Environment Variables | dotenv                           |
| Package Manager       | pnpm                             |
| Git Hooks             | Husky + lint-staged + commitlint |

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full breakdown of how test specs, page objects, fixtures, configuration, and CI/CD fit together, including a diagram.

## Getting Started

**Prerequisites:** Node.js 20+ (see `.nvmrc`), pnpm

```bash
pnpm install
pnpm exec playwright install chromium
cp .env.example .env
```

## Running Tests

```bash
pnpm test              # run all tests, headless
pnpm test:headed       # run all tests, headed browser
pnpm test:debug        # run in Playwright debug mode
pnpm test:ui           # open Playwright's interactive UI mode
pnpm test:smoke        # run only @smoke tagged tests
pnpm test:regression   # run only @regression tagged tests
```

## Reporting

```bash
pnpm report                              # open the Playwright HTML report
pnpm allure:generate && pnpm allure:open # generate and open the Allure report
```

Both reports are also published automatically on every push to `main` — see the **Live Reports** links at the top of this file.

## CI/CD

Every push and pull request to `main` triggers the GitHub Actions pipeline (`.github/workflows/ci.yml`), which:

1. Installs dependencies (pnpm)
2. Lints and checks formatting
3. Installs the Chromium browser
4. Runs the full test suite
5. Generates the Allure report
6. On push to `main` only: publishes the combined report site to GitHub Pages

<!--
One-time setup for report publishing:
1. Settings → Actions → General → Workflow permissions → "Read and write permissions"
2. Push .github/workflows/ci.yml to main, let the first run complete (creates gh-pages branch)
3. Settings → Pages → Source → "Deploy from a branch" → gh-pages → / (root)
-->

## Test Coverage

Test scenarios span 6 feature areas: **login, inventory, cart, checkout, e2e, visual** — tagged `@smoke` / `@regression` / `@visual` for selective execution. Covers happy paths, validation/negative cases, and cross-feature purchase journeys.

## Design Decisions

See [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) for the reasoning behind key architectural choices (POM, folder structure, dual reporting, quality gates, retry strategy, and more).
