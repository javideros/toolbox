#!/bin/bash
# Vaadin + shadcn/ui Development Setup Script (macOS/Linux)
# This script configures VS Code with essential extensions and settings

echo "🚀 Setting up VS Code for Vaadin + shadcn/ui development..."

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java not found. Please install Java 21+ first."
    echo "   Download from: https://adoptium.net/"
    exit 1
fi

java_version=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$java_version" -lt 21 ]; then
    echo "❌ Java 21+ required. Found version: $java_version"
    echo "   Download from: https://adoptium.net/"
    exit 1
fi
echo "✅ Java $java_version found"

# Check Maven wrapper
if [ ! -f "./mvnw" ]; then
    echo "❌ Maven wrapper not found. Run from project root directory."
    exit 1
fi
echo "✅ Maven wrapper found"

# Check VS Code
if ! command -v code &> /dev/null; then
    echo "❌ VS Code not found. Please install Visual Studio Code first."
    echo "   Download from: https://code.visualstudio.com/"
    exit 1
fi
echo "✅ VS Code found"

# Detect Java and Maven paths
echo "🔍 Detecting Java and Maven paths..."

if [ -n "$JAVA_HOME" ]; then
    java_home="$JAVA_HOME"
else
    java_path=$(which java)
    java_home=$(dirname $(dirname $(readlink -f $java_path)))
fi
echo "✅ Java Home: $java_home"

if [ -n "$MAVEN_HOME" ]; then
    maven_home="$MAVEN_HOME"
elif command -v mvn &> /dev/null; then
    mvn_path=$(which mvn)
    maven_home=$(dirname $(dirname $(readlink -f $mvn_path)))
fi

if [ -n "$maven_home" ]; then
    echo "✅ Maven Home: $maven_home"
else
    echo "ℹ️ Using Maven wrapper (./mvnw)"
fi

echo "📦 Installing essential VS Code extensions..."

# Essential extensions for this project
extensions=(
    "vscjava.vscode-java-pack"           # Java Extension Pack
    "vmware.vscode-spring-boot"          # Spring Boot Tools
    "vscjava.vscode-maven"               # Maven for Java
    "ms-vscode.vscode-typescript-next"   # TypeScript
    "bradlc.vscode-tailwindcss"          # Tailwind CSS IntelliSense
    "esbenp.prettier-vscode"             # Prettier
    "ms-vscode.vscode-eslint"            # ESLint
    "formulahendry.auto-rename-tag"      # Auto Rename Tag
    "christian-kohler.path-intellisense" # Path Intellisense
    "ms-vscode.vscode-json"              # JSON Language Features
    "redhat.vscode-yaml"                 # YAML Language Support
    "ms-playwright.playwright"           # Playwright Test
    "github.copilot"                     # GitHub Copilot (optional)
)

for ext in "${extensions[@]}"; do
    echo "Installing $ext..."
    code --install-extension "$ext" --force
done

echo "⚙️ Configuring VS Code settings..."

# Create .vscode directory if it doesn't exist
mkdir -p .vscode

# VS Code settings with detected paths
cat > .vscode/settings.json << EOF
{
  "java.configuration.updateBuildConfiguration": "automatic",
  "java.compile.nullAnalysis.mode": "automatic",
  "java.home": "$java_home",
  "java.import.maven.enabled": true,
  "java.maven.downloadSources": true,$(if [ -n "$maven_home" ]; then echo "
  \"maven.executable.path\": \"$maven_home/bin/mvn\",
  \"java.configuration.maven.userSettings\": \"$maven_home/conf/settings.xml\","; fi)
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "files.associations": {
    "*.tsx": "typescriptreact"
  },
  "emmet.includeLanguages": {
    "typescriptreact": "html"
  }
}
EOF

# Launch configuration for debugging
cat > .vscode/launch.json << 'EOF'
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot App",
      "request": "launch",
      "mainClass": "com.example.application.Application",
      "projectName": "toolbox",
      "args": "",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
EOF

# Tasks for common operations
cat > .vscode/tasks.json << 'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Maven: Clean Install",
      "type": "shell",
      "command": "./mvnw",
      "args": ["clean", "install"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "Spring Boot: Run",
      "type": "shell",
      "command": "./mvnw",
      "args": ["spring-boot:run"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "E2E Tests",
      "type": "shell",
      "command": "./run-e2e-tests.sh",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
EOF

# Extensions recommendations
cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "vscjava.vscode-java-pack",
    "vmware.vscode-spring-boot",
    "vscjava.vscode-maven",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-playwright.playwright",
    "github.copilot"
  ]
}
EOF

echo "✅ VS Code setup complete!"
echo ""
echo "📋 What was configured:"
echo "  • Essential extensions installed"
echo "  • Java & TypeScript settings optimized"
echo "  • Debug configuration for Spring Boot"
echo "  • Build tasks for Maven & testing"
echo "  • Tailwind CSS IntelliSense enabled"
echo ""
echo "🚀 Next steps:"
echo "  1. Restart VS Code"
echo "  2. Open this project folder"
echo "  3. Press F5 to start debugging"
echo ""
echo "Opening VS Code..."

# Open VS Code in current directory
code .