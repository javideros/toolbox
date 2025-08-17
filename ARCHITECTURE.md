# Architecture Overview

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│                 │    │                 │    │                 │
│ React + TS      │◄──►│ Spring Boot     │◄──►│ H2 / DB2        │
│ shadcn/ui       │    │ Vaadin 24       │    │ JPA Entities    │
│ Tailwind CSS    │    │ Spring Security │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Component Integration

### Frontend Stack
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety across the frontend
- **shadcn/ui** - Accessible, customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Vaadin React Components** - Server-side rendered components

### Backend Stack
- **Spring Boot 3.x** - Application framework and dependency injection
- **Vaadin 24** - Full-stack framework with React frontend integration
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **H2/DB2** - Database support with profile-based configuration

## Key Integration Patterns

### 1. Hybrid Component Architecture
```typescript
// shadcn/ui components alongside Vaadin components
<div className="flex gap-4">
  <Button variant="outline">shadcn/ui Button</Button>
  <VaadinButton theme="primary">Vaadin Button</VaadinButton>
</div>
```

### 2. RBAC Permission System
```java
@PreAuthorize("@userPermissionService.hasWritePermission('Screen Name')")
@PermitAll // Required for Vaadin endpoints
public void secureMethod() { }
```

### 3. Configuration-Driven Screens
```json
{
  "screens": [
    {
      "title": "Task List",
      "link": "/task-list",
      "icon": "vaadin:tasks",
      "defaultPermissions": {
        "ADMINISTRATOR": { "canRead": true, "canWrite": true }
      }
    }
  ]
}
```

## Security Architecture

### Authentication Flow
1. User login via Spring Security
2. Session-based authentication
3. Role assignment from database
4. Permission evaluation per screen

### Authorization Layers
- **UI Level**: Dashboard tiles and menu items filtered by permissions
- **Service Level**: Method-level security with `@PreAuthorize`
- **Endpoint Level**: Vaadin endpoint security annotations

## Data Flow

### Request Processing
```
User Action → React Component → Vaadin Service → Spring Service → JPA Repository → Database
```

### Permission Check Flow
```
Service Method → @PreAuthorize → UserPermissionService → Database → Allow/Deny
```

## Testing Strategy

### Backend Testing
- **Unit Tests**: Service layer testing with JUnit 5
- **Integration Tests**: Repository and security testing
- **Test Profiles**: H2 in-memory database for testing

### Frontend Testing
- **E2E Tests**: Playwright-based end-to-end testing
- **User Flows**: Authentication, permissions, CRUD operations
- **Cross-browser**: Chrome, Firefox, Safari testing

### CI/CD Pipeline
- **Automated Testing**: Backend + E2E tests on every PR
- **Security Scanning**: CodeQL analysis for vulnerabilities
- **Dependency Updates**: Automated via Dependabot

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **CSS Optimization**: Tailwind CSS purging

### Backend Optimization
- **Connection Pooling**: Database connection management
- **Caching**: Spring Cache for frequently accessed data
- **Lazy Loading**: JPA entity relationships

## Deployment Architecture

### Development
```
Local Development → H2 Database → Hot Reload → Live Testing
```

### Production
```
Build Pipeline → Production JAR → DB2 Database → Container Deployment
```

### Environment Profiles
- **dev**: H2 database, debug logging, hot reload
- **prod**: DB2 database, optimized builds, security hardening
- **test**: H2 database, test data, E2E testing