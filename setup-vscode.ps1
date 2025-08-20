# Vaadin + shadcn/ui Development Setup Script
# This script configures VS Code with essential extensions and settings

Write-Host "🚀 Setting up VS Code for Vaadin + shadcn/ui development..." -ForegroundColor Green

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

# Check Java
if (!(Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Java not found. Please install Java 21+ first." -ForegroundColor Red
    Write-Host "   Download from: https://adoptium.net/" -ForegroundColor Cyan
    exit 1
}

$javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_.ToString().Split('"')[1] }
if ($javaVersion -lt "21") {
    Write-Host "❌ Java 21+ required. Found: $javaVersion" -ForegroundColor Red
    Write-Host "   Download from: https://adoptium.net/" -ForegroundColor Cyan
    exit 1
}
Write-Host "✅ Java $javaVersion found" -ForegroundColor Green

# Check Maven (via wrapper)
if (!(Test-Path "./mvnw") -and !(Test-Path "./mvnw.cmd")) {
    Write-Host "❌ Maven wrapper not found. Run from project root directory." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Maven wrapper found" -ForegroundColor Green

# Check VS Code
if (!(Get-Command code -ErrorAction SilentlyContinue)) {
    Write-Host "❌ VS Code not found. Please install Visual Studio Code first." -ForegroundColor Red
    Write-Host "   Download from: https://code.visualstudio.com/" -ForegroundColor Cyan
    exit 1
}
Write-Host "✅ VS Code found" -ForegroundColor Green

# Detect Java and Maven paths
Write-Host "🔍 Detecting Java and Maven paths..." -ForegroundColor Yellow

$javaHome = $env:JAVA_HOME
if (!$javaHome) {
    $javaPath = (Get-Command java).Source
    $javaHome = Split-Path (Split-Path $javaPath -Parent) -Parent
}
Write-Host "✅ Java Home: $javaHome" -ForegroundColor Green

$mavenHome = $env:MAVEN_HOME
if (!$mavenHome -and (Get-Command mvn -ErrorAction SilentlyContinue)) {
    $mvnPath = (Get-Command mvn).Source
    $mavenHome = Split-Path (Split-Path $mvnPath -Parent) -Parent
}
if ($mavenHome) {
    Write-Host "✅ Maven Home: $mavenHome" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Using Maven wrapper (./mvnw)" -ForegroundColor Cyan
}

Write-Host "📦 Installing essential VS Code extensions..." -ForegroundColor Yellow

# Essential extensions for this project
$extensions = @(
    "vscjava.vscode-java-pack",           # Java Extension Pack
    "vmware.vscode-spring-boot",          # Spring Boot Tools
    "vscjava.vscode-maven",               # Maven for Java
    "ms-vscode.vscode-typescript-next",   # TypeScript
    "bradlc.vscode-tailwindcss",          # Tailwind CSS IntelliSense
    "esbenp.prettier-vscode",             # Prettier
    "ms-vscode.vscode-eslint",            # ESLint
    "formulahendry.auto-rename-tag",      # Auto Rename Tag
    "christian-kohler.path-intellisense", # Path Intellisense
    "ms-vscode.vscode-json",              # JSON Language Features
    "redhat.vscode-yaml",                 # YAML Language Support
    "ms-playwright.playwright",           # Playwright Test
    "github.copilot"                      # GitHub Copilot (optional)
)

foreach ($ext in $extensions) {
    Write-Host "Installing $ext..." -ForegroundColor Cyan
    code --install-extension $ext --force
}

Write-Host "⚙️ Configuring VS Code settings..." -ForegroundColor Yellow

# Create .vscode directory if it doesn't exist
$vscodeDir = ".vscode"
if (!(Test-Path $vscodeDir)) {
    New-Item -ItemType Directory -Path $vscodeDir
}

# VS Code settings with detected paths
$settings = @{
    "java.configuration.updateBuildConfiguration" = "automatic"
    "java.compile.nullAnalysis.mode" = "automatic"
    "java.home" = $javaHome
    "java.import.maven.enabled" = $true
    "java.maven.downloadSources" = $true
    "typescript.preferences.importModuleSpecifier" = "relative"
    "typescript.suggest.autoImports" = $true
    "editor.formatOnSave" = $true
    "editor.defaultFormatter" = "esbenp.prettier-vscode"
    "editor.codeActionsOnSave" = @{
        "source.organizeImports" = $true
        "source.fixAll.eslint" = $true
    }
    "tailwindCSS.includeLanguages" = @{
        "typescript" = "typescript"
        "typescriptreact" = "typescriptreact"
    }
    "files.associations" = @{
        "*.tsx" = "typescriptreact"
    }
    "emmet.includeLanguages" = @{
        "typescriptreact" = "html"
    }
}

# Add Maven home if detected
if ($mavenHome) {
    $settings["maven.executable.path"] = "$mavenHome\bin\mvn"
    $settings["java.configuration.maven.userSettings"] = "$mavenHome\conf\settings.xml"
}

$settings | ConvertTo-Json -Depth 3 | Out-File -FilePath "$vscodeDir/settings.json" -Encoding UTF8

# Launch configuration for debugging
$launch = @{
    "version" = "0.2.0"
    "configurations" = @(
        @{
            "type" = "java"
            "name" = "Spring Boot App"
            "request" = "launch"
            "mainClass" = "com.example.application.Application"
            "projectName" = "toolbox"
            "args" = ""
            "envFile" = "`${workspaceFolder}/.env"
        }
    )
}

$launch | ConvertTo-Json -Depth 3 | Out-File -FilePath "$vscodeDir/launch.json" -Encoding UTF8

# Tasks for common operations
$tasks = @{
    "version" = "2.0.0"
    "tasks" = @(
        @{
            "label" = "Maven: Clean Install"
            "type" = "shell"
            "command" = "./mvnw"
            "args" = @("clean", "install")
            "group" = "build"
            "presentation" = @{
                "echo" = $true
                "reveal" = "always"
                "focus" = $false
                "panel" = "shared"
            }
        },
        @{
            "label" = "Spring Boot: Run"
            "type" = "shell"
            "command" = "./mvnw"
            "args" = @("spring-boot:run")
            "group" = "build"
            "presentation" = @{
                "echo" = $true
                "reveal" = "always"
                "focus" = $false
                "panel" = "shared"
            }
        },
        @{
            "label" = "E2E Tests"
            "type" = "shell"
            "command" = "./run-e2e-tests.sh"
            "group" = "test"
            "presentation" = @{
                "echo" = $true
                "reveal" = "always"
                "focus" = $false
                "panel" = "shared"
            }
        }
    )
}

$tasks | ConvertTo-Json -Depth 4 | Out-File -FilePath "$vscodeDir/tasks.json" -Encoding UTF8

# Extensions recommendations
$extensions_json = @{
    "recommendations" = $extensions
}

$extensions_json | ConvertTo-Json | Out-File -FilePath "$vscodeDir/extensions.json" -Encoding UTF8

Write-Host "📝 Creating development documentation..." -ForegroundColor Yellow

# Quick start guide
$quickStart = @"
# VS Code Development Setup Complete! 🎉

## Quick Start Commands

### Maven Commands
- **Clean & Install**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Maven: Clean Install"
- **Run Application**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Spring Boot: Run"
- **Run Tests**: `./mvnw test`

### Debugging
- **Start Debugging**: `F5` (launches Spring Boot app)
- **Set Breakpoints**: Click left margin in Java files

### Frontend Development
- **Format Code**: `Shift+Alt+F`
- **Auto Import**: `Ctrl+Shift+O`
- **Tailwind IntelliSense**: Automatic in .tsx files

### Useful Shortcuts
- **Command Palette**: `Ctrl+Shift+P`
- **Quick Open**: `Ctrl+P`
- **Terminal**: `Ctrl+`` (backtick)
- **Explorer**: `Ctrl+Shift+E`

### Project Structure
```
src/
├── main/
│   ├── java/           # Backend Java code
│   └── frontend/       # React frontend
│       ├── components/ # shadcn/ui components
│       ├── views/      # Page components
│       └── styles/     # CSS files
└── test/              # Backend tests
e2e-tests/             # Playwright E2E tests
```

### Getting Started
1. Open terminal: `Ctrl+`` 
2. Run: `./mvnw spring-boot:run`
3. Open: http://localhost:8080
4. Login: admin/123 or user/123

Happy coding! 🚀
"@

$quickStart | Out-File -FilePath "VSCODE_SETUP.md" -Encoding UTF8

Write-Host "✅ VS Code setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What was configured:" -ForegroundColor Cyan
Write-Host "  • Essential extensions installed" -ForegroundColor White
Write-Host "  • Java & TypeScript settings optimized" -ForegroundColor White
Write-Host "  • Debug configuration for Spring Boot" -ForegroundColor White
Write-Host "  • Build tasks for Maven & testing" -ForegroundColor White
Write-Host "  • Tailwind CSS IntelliSense enabled" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Restart VS Code" -ForegroundColor White
Write-Host "  2. Open this project folder" -ForegroundColor White
Write-Host "  3. Check VSCODE_SETUP.md for quick start guide" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to open VS Code..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open VS Code in current directory
code .