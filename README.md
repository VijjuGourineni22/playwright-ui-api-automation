# Playwright UI + API Automation

![Playwright Tests](https://github.com/<your-username>/playwright-ui-api-automation/actions/workflows/playwright.yml/badge.svg)

End-to-end UI tests and REST API tests built with **Playwright** and **TypeScript**, using the Page Object Model and run in CI with GitHub Actions.

## What is tested

| Layer | Target app | Coverage |
|---|---|---|
| UI | [Sauce Demo](https://www.saucedemo.com) | Login (valid, invalid, locked-out, empty field), cart (add, remove), full checkout |
| API | [Restful-Booker](https://restful-booker.herokuapp.com) | Auth token, POST, GET, PUT, PATCH, DELETE, 403 and 404 negative cases, response body and header assertions |
| Hybrid | Both | API used for test setup/cleanup alongside a UI check |

## Tech stack

- Playwright Test, TypeScript
- Page Object Model (`pages/`)
- Typed API client helper (`utils/apiClient.ts`)
- Cross-browser UI runs: Chromium, Firefox, WebKit
- GitHub Actions CI with HTML report artifact

## Project structure

```
├── tests/
│   ├── ui/        login, cart, checkout specs
│   ├── api/       booking API spec
│   └── hybrid/    API setup + UI verification
├── pages/         LoginPage, InventoryPage, CartPage, CheckoutPage
├── utils/         apiClient.ts, testData.ts
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

## Getting started

```bash
npm install
npx playwright install
npx playwright test
```

Useful commands:

```bash
npm run test:ui       # UI tests on Chromium, Firefox and WebKit
npm run test:api      # API tests only
npm run test:hybrid   # hybrid test
npm run test:headed   # watch the browser run
npm run report        # open the HTML report
```

## Notes

- Both target sites are public practice applications meant for test automation.
- The Restful-Booker API is shared and resets periodically, so each test creates its own data instead of relying on existing records.

## Author

Vijayalakshmi Gourineni, Automation QA Engineer | SDET
