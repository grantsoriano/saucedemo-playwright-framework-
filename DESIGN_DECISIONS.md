# Design Decisions

This document captures the reasoning behind key choices in this framework,
not just what was built but why.

## Why Page Object Model (POM)

SauceDemo has a small, stable set of pages (login, inventory, cart,
checkout steps, confirmation). POM keeps locators and page-specific actions
in one place per page, so if the app's markup changes, only one file needs
updating rather than every test that touches that page. It also makes specs
read like user stories (`loginPage.loginAs(user)`) instead of raw
Playwright calls.

## Why Feature-Based Test Folders (Not Type-Based)

Organizing by feature (`login/`, `cart/`, `checkout/`) rather than by test
type (`smoke/`, `regression/`) keeps all tests related to one part of the
app together, which scales better as coverage grows. Selective execution
(smoke vs. regression) is still possible without duplicating folder
structure, by tagging test titles (`@smoke`, `@regression`) instead —
Playwright's `--grep` flag filters on these tags directly.

## Why a Separate `e2e/` Folder

Cross-feature user journeys (login → browse → cart → checkout → confirm)
don't naturally belong to any single feature folder. Isolating them in
`e2e/` keeps feature-level tests focused on validating one component in
isolation, while `e2e/` demonstrates the ability to design tests that
mirror real user behavior end-to-end — a distinct skill from
component-level test design.

## Why Both Playwright HTML Report and Allure

Playwright's built-in HTML report is fast and requires no extra tooling —
good for quick local debugging. Allure adds richer visualization (trend
history, categorized failures, step-level detail) that's closer to what
teams use in production. Running both shows familiarity with the built-in
tooling as well as a more advanced reporting solution, without one
replacing the other.

## Why pnpm

Faster installs and stricter dependency resolution than npm (no
phantom dependencies), with a smaller disk footprint via content-addressable
storage. Increasingly the default choice in modern JS/TS tooling setups.

## Why Husky + lint-staged + commitlint

Catching lint/formatting issues and non-conventional commit messages at
commit time — rather than only in CI — keeps the git history clean from the
first commit and avoids "fix lint" cleanup commits cluttering the log. CI
still re-checks everything as a second layer, in case a hook is bypassed
locally.

## Why 0 Retries Locally / 2 in CI

Locally, a failing test should fail immediately so it can be debugged
without waiting on retries. In CI, transient flake (network timing, runner
resource contention) is more common, so a small retry budget avoids
false-negative pipeline failures without masking genuinely broken tests
(a test that fails all 3 attempts is very likely a real bug, not flake).

## Why Chromium Only

Keeps the CI pipeline fast and the framework focused on demonstrating test
design quality rather than cross-browser matrix maintenance. The framework
is structured so adding Firefox/WebKit later is a one-line change in
`playwright.config.ts` (`projects` array), not a redesign.

## Why GitHub Pages for Report Publishing

Workflow artifacts (zips) require downloading and unzipping to view a
report — not something a reviewer will do. Publishing to GitHub Pages gives
a permanent, clickable URL that shows real, current test results without
requiring anyone to clone the repo or run anything locally.
