# Vaadin + shadcn/ui Integration

A modern full-stack application demonstrating the integration of **Vaadin** (Java backend) with **shadcn/ui** (React frontend components) and **Tailwind CSS**.

## 🚀 Features

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

## 🛠️ Tech Stack

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

## 🚦 Quick Start

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

## 🎨 UI Components

This project showcases the integration of shadcn/ui components with Vaadin:

- **Button** - Multiple variants and sizes
- **Card** - Complete card system with header, content, footer
- **Dropdown Menu** - Accessible dropdown menus
- **Theme Toggle** - Dark/light mode switcher
- **Form Validation** - Zod-powered type-safe validation

## 🗄️ Database Profiles

**H2 (Development - Default):**
```bash
./mvnw spring-boot:run
```

**DB2 (Production):**
```bash
./mvnw spring-boot:run -Pdb2
```

## 📁 Project Structure

```
src/
├── main/
│   ├── java/                          # Backend Java code
│   │   ├── config/                     # Configuration classes
│   │   ├── security/                   # Security configuration
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
│   └── resources/                      # Application resources
└── test/                              # Test files
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
| Users | Read + Write | No access |

**See [RBAC_PERMISSIONS.md](RBAC_PERMISSIONS.md) for complete documentation.**

## 🔧 Key Integration Points

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

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed setup instructions and advanced configuration
- **[RBAC & Permissions](RBAC_PERMISSIONS.md)** - Complete guide to Role-Based Access Control and screen modularity

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Vaadin](https://vaadin.com/) - Full-stack Java framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful React components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives