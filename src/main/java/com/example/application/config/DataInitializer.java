package com.example.application.config;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.service.FunctionalAreaService;
import com.example.application.permissions.service.PermissionService;
import com.example.application.roles.domain.Role;
import com.example.application.roles.service.RoleService;
import com.example.application.users.domain.User;
import com.example.application.users.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.example.application.config.ScreensConfigService.ScreenConfig;
import com.example.application.config.ScreensConfigService.PermissionConfig;

/**
 * Initializes application data on startup including roles, users, functional areas, and permissions.
 * This component runs once when the application starts and populates the database with default data
 * if it doesn't already exist.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final FunctionalAreaService functionalAreaService;
    private final RoleService roleService;
    private final UserService userService;
    private final PermissionService permissionService;
    private final ScreensConfigService screensConfigService;

    /**
     * Constructor for DataInitializer with required services.
     * 
     * @param functionalAreaService service for managing functional areas
     * @param roleService service for managing roles
     * @param userService service for managing users
     * @param permissionService service for managing permissions
     * @param screensConfigService service for screen configuration
     */
    public DataInitializer(FunctionalAreaService functionalAreaService, RoleService roleService, UserService userService, PermissionService permissionService, ScreensConfigService screensConfigService) {
        this.functionalAreaService = functionalAreaService;
        this.roleService = roleService;
        this.userService = userService;
        this.permissionService = permissionService;
        this.screensConfigService = screensConfigService;
    }

    /**
     * Runs the data initialization process on application startup.
     * Initializes roles, functional areas, users, and permissions if they don't exist.
     * 
     * @param args command line arguments (not used)
     * @throws RuntimeException if initialization fails
     */
    @Override
    @Transactional
    public void run(String... args) {
        try {
            initializeRoles();
            initializeFunctionalAreas();
            initializeUsers();
            initializePermissions();
        } catch (Exception e) {
            log.error("Failed to initialize data: {}", e.getMessage(), e);
            throw new RuntimeException("Data initialization failed", e);
        }
    }

    /**
     * Generic method to initialize data if it doesn't exist.
     * 
     * @param count current count of entities
     * @param entityName name of the entity type for logging
     * @param initializer runnable that performs the initialization
     * @param countSupplier supplier that returns the final count
     */
    private void initializeIfEmpty(long count, String entityName, Runnable initializer, java.util.function.Supplier<Long> countSupplier) {
        if (count == 0) {
            log.info("Initializing {} data...", entityName);
            initializer.run();
            log.info("{} data initialized. Total count: {}", capitalize(entityName), countSupplier.get());
        } else {
            log.info("{} data already exists. Count: {}", capitalize(entityName), count);
        }
    }

    /**
     * Initializes default system roles if none exist.
     * Creates ADMINISTRATOR and USER roles with appropriate descriptions.
     */
    private void initializeRoles() {
        initializeIfEmpty(roleService.count(), "role", () -> {
            createRole("ADMINISTRATOR", "System administrator with full access");
            createRole("USER", "Regular user with limited access");
        }, roleService::count);
    }

    /**
     * Initializes default system users if none exist.
     * Creates sample administrator and regular user accounts.
     */
    private void initializeUsers() {
        initializeIfEmpty(userService.count(), "user", () -> {
            createUser("alice", "Alice Administrator", "alice@example.com", "ADMINISTRATOR");
            createUser("ursula", "Ursula User", "ursula@example.com", "USER");
        }, userService::count);
    }

    /**
     * Capitalizes the first letter of a string.
     * 
     * @param str the string to capitalize
     * @return capitalized string or original if null/empty
     */
    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    /**
     * Creates and saves a new role.
     * 
     * @param name the role name
     * @param description the role description
     */
    private void createRole(String name, String description) {
        Role role = new Role(name, description);
        roleService.save(role);
    }

    /**
     * Creates a new user and assigns them to the specified role.
     * 
     * @param username the username for login
     * @param fullName the user's full display name
     * @param email the user's email address
     * @param roleName the name of the role to assign to the user
     */
    @Transactional
    private void createUser(String username, String fullName, String email, String roleName) {
        User user = new User(username, fullName, email);
        
        // Get the saved role from database
        try {
            List<Role> savedRoles = roleService.list(org.springframework.data.domain.Pageable.unpaged(), null);
            savedRoles.stream()
                .filter(role -> roleName.equals(role.getName()))
                .findFirst()
                .ifPresent(role -> user.getRoles().add(role));
        } catch (Exception e) {
            log.warn("Could not assign role {} to user {}: {}", roleName, username, e.getMessage());
        }
        
        userService.save(user);
    }

    /**
     * Initializes default functional areas if none exist.
     * Creates predefined business functional areas like Financial, Delivery, Warehouse, etc.
     */
    private void initializeFunctionalAreas() {
        initializeIfEmpty(functionalAreaService.count(), "functional area", () -> {
            createFunctionalArea("FI", "Financial", "Financial operations and accounting");
            createFunctionalArea("DE", "Delivery", "Package delivery and logistics");
            createFunctionalArea("WH", "Warehouse", "Inventory management and storage");
            createFunctionalArea("CS", "Customer Service", "Customer support and relations");
            createFunctionalArea("OP", "Operations", "Daily operational activities");
            createFunctionalArea("HR", "Human Resources", "Staff management and administration");
            createFunctionalArea("IT", "Information Technology", "Technology support and systems");
            createFunctionalArea("SE", "Security", "Facility and cargo security");
            createFunctionalArea("QA", "Quality Assurance", "Quality control and compliance");
            createFunctionalArea("MN", "Maintenance", "Equipment and facility maintenance");
        }, functionalAreaService::count);
    }

    /**
     * Initializes system permissions if none exist.
     * Uses either configuration file or default fallback permissions.
     */
    @Transactional
    private void initializePermissions() {
        initializeIfEmpty(permissionService.count(), "permission", () -> {
            if (screensConfigService.isLoadDefaultConfig()) {
                initializePermissionsFromConfig();
            } else {
                initializeDefaultPermissions();
            }
        }, permissionService::count);
    }
    
    /**
     * Loads permissions from the screens configuration file.
     * Sets up role-based permissions for each configured screen.
     */
    private void initializePermissionsFromConfig() {
        log.info("Loading permissions from configuration file...");

        try {
            List<ScreenConfig> screens = screensConfigService.getScreens();
            java.util.Optional<Role> adminRole = roleService.findByName("ADMINISTRATOR");
            java.util.Optional<Role> userRole = roleService.findByName("USER");

            for (ScreenConfig screen : screens) {
                setPermissionsForRole(screen, adminRole, "ADMINISTRATOR");
                setPermissionsForRole(screen, userRole, "USER");
            }

            log.info("Loaded permissions for {} screens from configuration", screens.size());
        } catch (Exception e) {
            log.error("Failed to load permissions from configuration: {}", e.getMessage());
            initializeDefaultPermissions();
        }
    }

    /**
     * Sets permissions for a specific role on a screen based on configuration.
     * 
     * @param screen the screen configuration containing permission settings
     * @param roleOpt optional role to set permissions for
     * @param roleName the name of the role for permission lookup
     */
    private void setPermissionsForRole(ScreenConfig screen, java.util.Optional<Role> roleOpt, String roleName) {
        if (roleOpt.isPresent()) {
            PermissionConfig permission = screen.getDefaultPermissions().get(roleName);
            if (permission != null) {
                permissionService.savePermission(
                        roleOpt.get().getId(),
                        screen.getTitle(),
                        permission.isCanRead(),
                        permission.isCanWrite());
            }
        }
    }
    
    /**
     * Initializes default fallback permissions when configuration loading fails.
     * Grants full access to all screens for the ADMINISTRATOR role.
     */
    private void initializeDefaultPermissions() {
        log.info("Loading default permissions (fallback)...");
        
        try {
            java.util.Optional<Role> adminRole = roleService.findByName("ADMINISTRATOR");
                
            if (adminRole.isPresent()) {
                String[] screens = {"Task List", "Functional Areas", "Users", "Roles", "Permissions", "Analytics", "Reports", "Settings", "Reference"};
                for (String screen : screens) {
                    permissionService.savePermission(adminRole.get().getId(), screen, true, true);
                }
            }
        } catch (Exception e) {
            log.warn("Could not initialize default permissions: {}", e.getMessage());
        }
    }

    /**
     * Creates and saves a new functional area.
     * 
     * @param code the unique code for the functional area
     * @param name the display name of the functional area
     * @param description the description of the functional area's purpose
     */
    private void createFunctionalArea(String code, String name, String description) {
        FunctionalArea area = new FunctionalArea();
        area.setCode(code);
        area.setName(name);
        area.setDescription(description);
        functionalAreaService.save(area);
    }
}