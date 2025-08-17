# Testing Guide

## 🧪 Testing Strategy

The Toolbox application uses a multi-layered testing approach:

- **Backend Unit Tests** - JUnit tests for services and repositories
- **End-to-End Tests** - Playwright tests for complete user workflows
- **Manual Testing** - Guided testing scenarios for RBAC validation

## 🎭 End-to-End Testing with Playwright

### Setup and Execution

**Automated execution (recommended):**
```bash
./mvnw verify -Ph2,e2e-test
```

**Convenience script:**
```bash
./run-e2e-tests.sh
```

**Manual development mode:**
```bash
# Terminal 1: Start application
./mvnw spring-boot:run

# Terminal 2: Run tests
cd e2e-tests
npm test
```

### Test Structure

```
e2e-tests/
├── tests/
│   ├── auth.spec.js           # Authentication flows
│   └── permissions.spec.js    # RBAC validation
├── package.json               # Node.js dependencies
└── playwright.config.js       # Test configuration
```

### Test Coverage

#### Authentication Tests (`auth.spec.js`)
- ✅ Admin login flow
- ✅ User login flow
- ✅ Dashboard navigation
- ✅ Basic UI functionality

#### Permission Tests (`permissions.spec.js`)
- ✅ Admin access to all screens
- ✅ User restricted access
- ✅ Access denied handling
- ✅ UI filtering validation

### Test Configuration

**Playwright Configuration:**
```javascript
module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};
```

**Maven Integration:**
```xml
<profile>
  <id>e2e-test</id>
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <executions>
          <execution>
            <id>start-app</id>
            <phase>pre-integration-test</phase>
            <goals><goal>start</goal></goals>
          </execution>
          <execution>
            <id>stop-app</id>
            <phase>post-integration-test</phase>
            <goals><goal>stop</goal></goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</profile>
```

## 🔐 RBAC Testing Scenarios

### Automated RBAC Validation

The E2E tests automatically validate:

1. **Admin User Access**
   - All 9 dashboard tiles visible
   - All menu items accessible
   - No "Access Denied" messages

2. **Regular User Access**
   - Only 5 permitted dashboard tiles visible
   - Restricted screens show "Access Denied"
   - Menu items filtered by permissions

3. **Permission Matrix Validation**
   - Task List: Both users have access
   - Reference: User has read-only access
   - Functional Areas: Admin only
   - Permissions: Admin only
   - Users: Admin only

### Manual Testing Checklist

#### Admin User Testing (`admin` / `123`)
- [ ] Login successful
- [ ] Dashboard shows all 9 tiles
- [ ] All menu items accessible
- [ ] Can access Permissions screen
- [ ] Can modify user permissions
- [ ] Write operations work on all screens

#### Regular User Testing (`user` / `123`)
- [ ] Login successful
- [ ] Dashboard shows 5 tiles only
- [ ] Restricted screens show "Access Denied"
- [ ] Cannot access admin screens
- [ ] Write operations blocked on read-only screens
- [ ] Menu items filtered correctly

#### Permission Management Testing
- [ ] Access `/permissions` as admin
- [ ] View current permission matrix
- [ ] Modify user permissions
- [ ] Save changes successfully
- [ ] Logout and login as user
- [ ] Verify permission changes applied

## 🚀 Running Tests

### Prerequisites
- Java 21+
- Maven 3.6+
- Node.js 18+ (automatically managed by Maven)

### Test Execution Options

**1. Full automated pipeline:**
```bash
./mvnw verify -Ph2,e2e-test
```
- Starts Spring Boot application
- Installs Node.js and npm dependencies
- Runs all Playwright tests
- Stops application
- Generates test reports

**2. Quick execution:**
```bash
./run-e2e-tests.sh
```
- Convenience wrapper script
- Same functionality as Maven command
- Better for development workflow

**3. Development mode:**
```bash
# Keep application running for faster test iterations
./mvnw spring-boot:run

# In another terminal
cd e2e-tests
npm test
```

### Test Reports

**Console Output:**
- Real-time test execution status
- Pass/fail results for each test
- Error details for failed tests

**Artifacts (on failure):**
- Screenshots in `e2e-tests/test-results/`
- Videos in `e2e-tests/test-results/`
- Detailed logs for debugging

## 🔧 Test Maintenance

### Adding New Tests

**1. Authentication Tests:**
```javascript
test('new auth scenario', async ({ page }) => {
  await page.goto('/');
  // Test implementation
});
```

**2. Permission Tests:**
```javascript
test('new permission scenario', async ({ page }) => {
  await loginAsUser(page, 'admin', '123');
  // Permission validation
});
```

### Test Utilities

**Login Helper:**
```javascript
async function loginAsUser(page, username, password) {
  await page.goto('/');
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('vaadin-button[theme="primary"]');
  await page.waitForURL('/dashboard');
}
```

### Debugging Tests

**Run with UI (development):**
```bash
cd e2e-tests
npx playwright test --ui
```

**Run specific test:**
```bash
cd e2e-tests
npx playwright test auth.spec.js
```

**Debug mode:**
```bash
cd e2e-tests
npx playwright test --debug
```

## 📊 Test Results

### Success Criteria

**All tests passing indicates:**
- ✅ Authentication system working
- ✅ RBAC permissions enforced correctly
- ✅ UI filtering based on permissions
- ✅ Access control properly implemented
- ✅ Error handling for unauthorized access

### Common Issues

**Test Timeouts:**
- Application startup may take longer than expected
- Increase timeout in `playwright.config.js`

**Element Not Found:**
- Vaadin components may have dynamic selectors
- Use more specific selectors or wait strategies

**Permission Issues:**
- Database state may affect test results
- Tests use H2 in-memory database for isolation

## 🎯 Best Practices

### Test Design
- ✅ Use descriptive test names
- ✅ Test one scenario per test case
- ✅ Include both positive and negative cases
- ✅ Use helper functions for common operations

### Maintenance
- ✅ Keep tests independent and isolated
- ✅ Use stable selectors (avoid dynamic IDs)
- ✅ Update tests when UI changes
- ✅ Monitor test execution times

### CI/CD Integration
- ✅ Run tests on every commit
- ✅ Fail builds on test failures
- ✅ Generate and archive test reports
- ✅ Notify team of test results

This comprehensive testing strategy ensures the reliability and security of the RBAC system while providing fast feedback during development.