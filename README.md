# Playwright + TypeScript Automation Project

## Overview
This project is a test automation framework built using Playwright and TypeScript. It includes:

- Tests for web application - http://www.solarweb.com
- Page Object Model (POM) architecture for maintainability
- Built-in Playwright reporting for test results
- Automatic formatting with Prettier

Test Structure
- /tests → Contains test files
- /pages → Page Object Model (POM) classes
- /fixture → Custom test setup (e.g., global hooks, authentication)
- playwright.config.ts → Playwright configuration file

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

1. **Node.js**
   - Ensure you have Node.js (>= 16.x) installed. You can download it from Node.js.
     ```bash
     node -v
     ```

2. **npm**
   - Node.js comes with npm by default. To check if it's installed:
     ```bash
     npm -v
     ```

3. **Playwright**
   - Playwright library is used for API testing.

4. **Git (Version Control)**
   ```bash
     git --version
   ```

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/sumanrathodqa/playwright-api-tests.git
   ```

2. Navigate into the project directory
   cd <project-directory>

4. Install dependencies
     ```bash
     npm install
     ```

## Running Tests

1. Run all tests
   ```bash
   npx playwright test
   ```

2. Run tests in headed mode (see browser UI)
   ```bash
   npx playwright test --headed
   ```

3. To run a specific test file:
   ```bash
   npx playwright test tests/energy-balance-chart-data.spec.ts
   ```

5. Run tests with UI mode (for debugging)
   ```bash
   npx playwright test --ui
   ```

## Viewing Reports
Playwright generates a report that you can view after running tests:
  ```bash
  npx playwright show-report
  ```
