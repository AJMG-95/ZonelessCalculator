# Zoneless Calculator

A lightweight calculator built with **Angular 20** running in **zoneless mode** for snappy change detection. Unit tests run on **Karma + Jasmine** (ChromeHeadless). Styling is powered by **Tailwind CSS v4**.

> **Why zoneless?**
> Running without Zone.js reduces overhead and makes rendering more predictable. This project showcases a simple, real UI working **without zones**.


---

## Tech Stack

- **Angular 20** (standalone APIs)
- **Zoneless change detection** (no Zone.js runtime)
- **Karma + Jasmine** (unit testing, headless by default)
- **Tailwind CSS v4** (via `@tailwindcss/postcss` & PostCSS 8)
- **RxJS 7.8**
- **TypeScript 5.8**

---

### Prerequisites
- Node 18+ (or 20+)
- npm 9+

### Install
```bash
npm ci
# or
npm install
```

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

```bash
npm run test:coverage
```
