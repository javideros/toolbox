#!/bin/bash

echo "🚀 Starting E2E Test Suite"
echo "=========================="

# Clean previous builds
echo "📦 Cleaning previous builds..."
./mvnw clean

# Run E2E tests with Maven profile and H2 database
echo "🧪 Running E2E tests with H2 database..."
./mvnw verify -Ph2,e2e-test

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ All E2E tests passed!"
else
    echo "❌ E2E tests failed!"
    exit 1
fi

echo "📊 Test results available in:"
echo "   - e2e-tests/playwright-report/"
echo "   - e2e-tests/test-results/"