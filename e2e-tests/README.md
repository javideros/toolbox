# E2E Tests

End-to-end tests for the Vaadin + shadcn/ui application using Playwright.

## Setup
1. Install dependencies: `npm install`
2. Start the application: `./mvnw spring-boot:run`
3. Run tests: `npx playwright test`

## Test Structure
- `auth/` - Authentication related tests
- `permissions/` - RBAC and permission tests
- `navigation/` - Menu and dashboard navigation tests