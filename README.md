# Vaadin + shadcn/ui Integration Framework

A **demonstration framework** and **reference implementation** showcasing how to build modern full-stack applications with **Vaadin** (Java backend), **shadcn/ui** (React frontend components), and **Tailwind CSS**.

> **Purpose**: This project serves as both a working framework for building enterprise applications and a comprehensive example of integrating Vaadin's full-stack Java capabilities with modern React UI libraries.

## 🎯 Framework Capabilities

### Core Integration Features

- **Vaadin 24** - Full-stack Java framework with React frontend
- **shadcn/ui** - Beautiful, accessible React components
- **Tailwind CSS** - Utility-first CSS framework
- **RBAC System** - Role-based access control with screen-level permissions
- **Dynamic UI** - Permission-filtered dashboard and navigation
- **Configuration-Driven** - Single JSON file controls screens and permissions
- **Dark/Light Mode** - Theme switching with system preference detection
- **Spring Boot** - Backend with JPA and security
- **Multi-Database Support** - H2 (development) and DB2 (production) profiles
- **TypeScript** - Full type safety across the frontend
- **E2E Testing** - Playwright-based automated testing with Maven integration
- **Permission Management UI** - Complete role-based permission matrix interface

## 🏗️ Architecture Demonstration

### Integration Stack

**Backend:**
- Java 21
- Spring Boot 3.x
- Vaadin 24
- Spring Security
- Spring Data JPA
- H2 Database (dev) / DB2 (prod)

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
- Zod validation
- Lucide React icons

## 🚀 Try the Demo

### Prerequisites
- Java 21+
- Maven 3.6+
- Node.js 18+ (for frontend dependencies)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vaadin-shadcn-integration
   ```

2. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Access the application**
   - Open http://localhost:8080
   - Login with demo credentials:
     - **Admin:** `admin` / `123`
     - **User:** `user` / `123`

### Production Build

```bash
./mvnw -Pproduction package
```

## 🎨 Component Integration Showcase

Demonstrates seamless integration of shadcn/ui with Vaadin components:

- **Hybrid UI** - shadcn/ui components alongside Vaadin Grid, TextField, etc.
- **Consistent Theming** - Unified dark/light mode across both component systems
- **Form Integration** - Zod validation with Vaadin form components
- **Toast Notifications** - Sonner toasts replacing Vaadin notifications
- **Responsive Design** - Tailwind CSS with Vaadin's responsive capabilities

## 🗄️ Database Profiles

**H2 (Development - Default):**
```bash
./mvnw spring-boot:run
```

**DB2 (Production):**
```bash
./mvnw spring-boot:run -Pdb2
```

## 🧪 Testing

### End-to-End Testing

The project includes comprehensive E2E testing with Playwright:

**Run E2E tests (automated):**
```bash
./mvnw verify -Ph2,e2e-test
```

**Run E2E tests (convenience script):**
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

**Test Coverage:**
- Authentication flows (admin/user login)
- RBAC screen access validation
- Permission-based UI filtering
- Dashboard and navigation functionality

## 📁 Project Structure

```
src/
├── main/
│   ├── java/                          # Backend Java code
│   │   ├── config/                     # Configuration classes
│   │   ├── security/                   # Security configuration
│   │   ├── permissions/                # RBAC permission system
│   │   ├── roles/                      # Role management
│   │   ├── functionalarea/            # Domain modules
│   │   └── taskmanagement/            # Task management
│   ├── frontend/                       # React frontend
│   │   ├── components/                 # React components
│   │   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── theme-provider.tsx     # Theme context
│   │   │   └── mode-toggle.tsx        # Dark mode toggle
│   │   ├── lib/                       # Utility functions
│   │   ├── validation/                # Zod schemas
│   │   ├── views/                     # Page components
│   │   └── styles/                    # CSS files
│   └── resources/
│       └── screens-config.json         # Screen configuration
├── test/                              # Backend tests
e2e-tests/                             # E2E testing suite
├── tests/                             # Playwright tests
├── package.json                       # Node.js dependencies
└── playwright.config.js               # Test configuration
```

## 🔒 Role-Based Access Control (RBAC)

The application features a comprehensive **RBAC system** with:

- **Screen-level permissions** (Read/Write per screen)
- **Role-based access control** (Administrator/User roles)
- **Dynamic UI filtering** (Dashboard tiles and menu items)
- **Service-level enforcement** with clear error messages
- **Configuration-driven setup** via `screens-config.json`

### Permission Matrix Example:
| Screen | Administrator | User |
|--------|---------------|------|
| Task List | Read + Write | Read + Write |
| Reference | Read + Write | Read only |
| Functional Areas | Read + Write | No access |
| Permissions | Read + Write | No access |
| Users | Read + Write | No access |
| Settings | Read + Write | Read only |
| Analytics | Read + Write | Read only |
| Reports | Read + Write | Read only |

**See [RBAC_PERMISSIONS.md](RBAC_PERMISSIONS.md) for complete documentation.**

## 🔧 Integration Patterns

### Framework Design Patterns

### 1. Configuration-Driven Screens
```json
{
  "title": "Task List",
  "link": "/task-list",
  "icon": "vaadin:tasks",
  "defaultPermissions": {
    "ADMINISTRATOR": { "canRead": true, "canWrite": true },
    "USER": { "canRead": true, "canWrite": true }
  }
}
```

### 2. Permission Enforcement
```java
@Override
@Transactional
public Entity save(Entity entity) {
    userPermissionService.requireWritePermission("Screen Name");
    return repository.save(entity);
}
```

### 3. Dynamic UI Filtering
```typescript
// Dashboard tiles filtered by user permissions
const tiles = await DashboardConfigService.getTilesForDashboard();
// Menu items filtered by same permissions
const menuItems = await DashboardConfigService.getTilesForMenu();
```

### 4. E2E Testing Integration
```xml
<!-- Maven profile for automated E2E testing -->
<profile>
  <id>e2e-test</id>
  <build>
    <plugins>
      <plugin>
        <groupId>com.github.eirslett</groupId>
        <artifactId>frontend-maven-plugin</artifactId>
        <executions>
          <execution>
            <id>run-e2e-tests</id>
            <goals><goal>npm</goal></goals>
            <configuration>
              <arguments>test</arguments>
              <workingDirectory>e2e-tests</workingDirectory>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</profile>
```

## 📚 Framework Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Framework setup and customization
- **[RBAC & Permissions](RBAC_PERMISSIONS.md)** - Permission system architecture
- **[Integration Guide](INTEGRATION_GUIDE.md)** - How to integrate Vaadin with shadcn/ui
- **[Testing Strategy](TESTING.md)** - E2E testing approach for hybrid applications

## 🤝 Using This Framework

**As a Reference:**
- Study the integration patterns
- Copy specific implementation approaches
- Use as a starting point for similar projects

**As a Framework:**
- Fork and customize for your needs
- Extend the RBAC system
- Add your own screens and components

**Contributing:**
Contributions to improve the demonstration are welcome! Focus on:
- Better integration examples
- Additional component showcases
- Performance optimizations
- Documentation improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Vaadin](https://vaadin.com/) - Full-stack Java framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful React components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives<!-- Updated Sun Aug 17 18:30:47 EDT 2025 -->
