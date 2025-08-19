#!/bin/bash

# CodeQL Health Check Script
echo "🔍 CodeQL Configuration Health Check"
echo "===================================="

# Check if CodeQL workflow exists
if [ -f ".github/workflows/codeql.yml" ]; then
    echo "✅ CodeQL workflow found"
else
    echo "❌ CodeQL workflow missing"
    exit 1
fi

# Check if CodeQL config exists
if [ -f ".github/codeql-config.yml" ]; then
    echo "✅ CodeQL configuration found"
else
    echo "⚠️  CodeQL configuration missing (optional)"
fi

# Check for common issues
echo ""
echo "🔧 Checking for common issues:"

# Check if target directory is properly ignored
if grep -q "target/" .gitignore; then
    echo "✅ Target directory ignored in .gitignore"
else
    echo "⚠️  Target directory not ignored - may cause analysis issues"
fi

# Check if generated files are ignored
if grep -q "generated/" .gitignore; then
    echo "✅ Generated files ignored"
else
    echo "⚠️  Generated files not ignored - may cause noise in results"
fi

# Check TypeScript configuration
if [ -f "tsconfig.json" ]; then
    echo "✅ TypeScript configuration found"
else
    echo "⚠️  TypeScript configuration missing"
fi

echo ""
echo "📊 Project Statistics:"
echo "Java files: $(find src/main/java -name "*.java" | wc -l)"
echo "TypeScript files: $(find src/main/frontend -name "*.ts" -o -name "*.tsx" | grep -v generated | wc -l)"
echo "JavaScript files: $(find . -name "*.js" -not -path "./target/*" -not -path "./node_modules/*" -not -path "./e2e-tests/node_modules/*" | wc -l)"

echo ""
echo "✨ CodeQL health check complete!"