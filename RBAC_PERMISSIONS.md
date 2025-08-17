# Role-Based Access Control (RBAC) & Screen Modularity

## 🎯 Overview

The Toolbox application implements a comprehensive **Role-Based Access Control (RBAC)** system with **modular screen architecture**. This system provides granular control over user access to different application screens and their operations.

## 🏗️ Architecture Components

### 1. **Screen Modularity**

Each screen in the application is treated as an independent module with:
- **Unique identifier** and routing
- **Independent permissions** (Read/Write)
- **Configurable visibility** (Dashboard/Menu)
- **Role-based access control**

```json
{
  "id": 1,
  "title": "Task List",
  "link": "/task-list",
  "icon": "vaadin:tasks",
  "defaultPermissions": {
    "ADMINISTRATOR": { "canRead": true, "canWrite": true },
    "USER": { "canRead": true, "canWrite": true }
  }
}
```

### 2. **RBAC Permission Model**

#### **Roles**
- **ADMINISTRATOR**: Full system access
- **USER**: Limited access based on permissions
- **Extensible**: Additional roles can be added

#### **Permissions**
- **READ**: View screen and data
- **WRITE**: Modify, create, delete data
- **Screen-level**: Permissions applied per screen
- **Role-based**: Different permissions per role

#### **Permission Matrix**

| Screen | ADMINISTRATOR | USER |
|--------|---------------|------|
| Task List | Read + Write | Read + Write |
| Reference | Read + Write | Read only |
| Functional Areas | Read + Write | No access |
| Roles | Read + Write | No access |
| Permissions | Read + Write | No access |
| Users | Read + Write | No access |
| Settings | Read + Write | Read only |
| Analytics | Read + Write | Read only |
| Reports | Read + Write | Read only |

## 🔧 Configuration System

### **Single Source of Truth: `screens-config.json`**

```json
{
  "screens": [
    {
      "id": 1,
      "title": "Task List",
      "description": "Manage and track your tasks",
      "link": "/task-list",
      "icon": "vaadin:tasks",
      "enabled": true,
      "showInMenu": true,
      "showInDashboard": true,
      "order": 1,
      "defaultPermissions": {
        "ADMINISTRATOR": { "canRead": true, "canWrite": true },
        "USER": { "canRead": true, "canWrite": true }
      }
    }
  ]
}
```

### **Configuration Properties**

```properties
# Enable/disable default permissions loading
app.permissions.load-default-config=true

# Configuration file location
app.permissions.config-file=screens-config.json
```

## 🚀 System Components

### **Backend Services**

#### **1. ScreensConfigService**
- Loads screen configuration from JSON
- Provides screen definitions and default permissions
- Configurable via application properties

#### **2. PermissionService**
- Manages user permissions in database
- Provides CRUD operations for permissions
- Returns DTOs to avoid serialization issues

#### **3. UserPermissionService**
- Checks current user's permissions
- Enforces write permission requirements
- Integrates with Spring Security context

#### **4. DashboardConfigService**
- Converts screen configs to dashboard tiles
- Applies permission-based filtering
- Provides both dashboard and menu items

### **Frontend Components**

#### **1. Dashboard**
- Shows tiles based on user permissions
- Dynamic filtering per user role
- Consistent with sidebar menu

#### **2. Sidebar Menu**
- Permission-filtered navigation
- Synchronized with dashboard tiles
- Real-time permission updates

#### **3. Permissions Management Screen**
- Admin interface for permission control
- Role-based permission matrix
- Real-time validation (Write requires Read)

## 🔒 Permission Enforcement

### **UI Level**
- **Dashboard tiles**: Hidden if no READ permission
- **Menu items**: Hidden if no READ permission
- **Consistent experience**: Same screens in both places

### **Service Level**
- **Read operations**: Controlled by `@RolesAllowed`
- **Write operations**: Enforced by `UserPermissionService`
- **Error handling**: Clear messages for permission violations

### **Example: Write Permission Check**
```java
@Override
@Transactional
public FunctionalArea save(FunctionalArea entity) {
    userPermissionService.requireWritePermission("Functional Areas");
    return repository.save(entity);
}
```

## 👥 User Experience

### **Administrator User**
- ✅ **Full access** to all 9 screens
- ✅ **Read + Write** permissions everywhere
- ✅ **Permission management** capabilities
- ✅ **User and role management**

### **Regular User (Default)**
- ✅ **Limited access** based on permissions
- ✅ **Read-only** access to most screens
- ❌ **No access** to admin screens (Roles, Permissions, Users)
- 🚨 **Clear error messages** when attempting unauthorized operations

### **Custom Permissions**
- ✅ **Granular control** per screen per role
- ✅ **Real-time updates** when permissions change
- ✅ **Validation rules** (Write requires Read)
- ✅ **Persistent storage** in database

## 🛠️ Adding New Screens

### **1. Update Configuration**
Add new screen to `screens-config.json`:
```json
{
  "id": 10,
  "title": "New Screen",
  "description": "Description of new screen",
  "link": "/new-screen",
  "icon": "vaadin:new-icon",
  "enabled": true,
  "showInMenu": true,
  "showInDashboard": true,
  "order": 10,
  "defaultPermissions": {
    "ADMINISTRATOR": { "canRead": true, "canWrite": true },
    "USER": { "canRead": true, "canWrite": false }
  }
}
```

### **2. Implement Service**
Add permission checks to service methods:
```java
@Override
@Transactional
public Entity save(Entity entity) {
    userPermissionService.requireWritePermission("New Screen");
    return repository.save(entity);
}
```

### **3. Automatic Integration**
- ✅ **Dashboard tile** appears automatically
- ✅ **Menu item** added automatically
- ✅ **Permissions** initialized from config
- ✅ **RBAC enforcement** applied automatically

## 🔄 Permission Workflow

### **1. System Startup**
1. Load `screens-config.json`
2. Create default roles (ADMINISTRATOR, USER)
3. Initialize permissions from configuration
4. Create test users with role assignments

### **2. User Login**
1. Authenticate user credentials
2. Load user roles from database
3. Calculate effective permissions
4. Filter UI components based on permissions

### **3. Permission Changes**
1. Admin modifies permissions via UI
2. Changes saved to database immediately
3. User's next page load reflects new permissions
4. Dashboard and menu update automatically

## 🎛️ Configuration Options

### **Enable Default Config Loading**
```properties
app.permissions.load-default-config=true
```

### **Disable for Manual Setup**
```properties
app.permissions.load-default-config=false
```

### **Custom Configuration File**
```properties
app.permissions.config-file=custom-screens.json
```

## 🧪 Testing

### **Automated E2E Testing**

The system includes comprehensive Playwright-based E2E tests:

**Run all E2E tests:**
```bash
./mvnw verify -Ph2,e2e-test
# or
./run-e2e-tests.sh
```

**Test Coverage:**
- **Authentication Tests**: Login flows for admin and user roles
- **Permission Tests**: Screen access validation based on RBAC rules
- **UI Filtering Tests**: Dashboard tiles and menu items visibility
- **Access Control Tests**: Proper "Access Denied" handling

**Test Files:**
- `e2e-tests/tests/auth.spec.js` - Authentication and basic navigation
- `e2e-tests/tests/permissions.spec.js` - RBAC validation and access control

### **Default Test Users**
- **admin** (ADMINISTRATOR): Full access to all screens
- **user** (USER): Limited access based on default permissions

### **Manual Testing Scenarios**
1. **Login as admin** → Verify all tiles/menu items visible
2. **Login as user** → Verify limited access
3. **Modify permissions** → Verify real-time updates
4. **Test write operations** → Verify permission enforcement
5. **Test error messages** → Verify clear feedback

## 📊 Benefits

### **Security**
- ✅ **Granular access control** at screen level
- ✅ **Separation of read/write** permissions
- ✅ **Service-level enforcement** prevents bypassing
- ✅ **Clear audit trail** of permission changes

### **Maintainability**
- ✅ **Single configuration file** for all screens
- ✅ **Automatic UI updates** when config changes
- ✅ **Consistent permission model** across application
- ✅ **Easy to add new screens** and permissions

### **User Experience**
- ✅ **Intuitive permission management** interface
- ✅ **Real-time feedback** on permission changes
- ✅ **Clear error messages** for unauthorized actions
- ✅ **Consistent UI behavior** across all screens

This RBAC system provides enterprise-grade security with developer-friendly configuration and user-friendly management interfaces.