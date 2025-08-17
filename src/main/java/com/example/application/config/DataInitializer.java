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

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final FunctionalAreaService functionalAreaService;
    private final RoleService roleService;
    private final UserService userService;
    private final PermissionService permissionService;
    private final ScreensConfigService screensConfigService;

    public DataInitializer(FunctionalAreaService functionalAreaService, RoleService roleService, UserService userService, PermissionService permissionService, ScreensConfigService screensConfigService) {
        this.functionalAreaService = functionalAreaService;
        this.roleService = roleService;
        this.userService = userService;
        this.permissionService = permissionService;
        this.screensConfigService = screensConfigService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        try {
            initializeRoles();
            if (functionalAreaService.count() == 0) {
                log.info("Initializing functional area data...");
                
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
                
                log.info("Functional area data initialized. Total count: {}", functionalAreaService.count());
            } else {
                log.info("Functional area data already exists. Count: {}", functionalAreaService.count());
            }
            initializeUsers();
            initializePermissions();
        } catch (Exception e) {
            log.error("Failed to initialize data: {}", e.getMessage(), e);
            throw new RuntimeException("Data initialization failed", e);
        }
    }

    private void initializeRoles() {
        if (roleService.count() == 0) {
            log.info("Initializing role data...");
            
            createRole("ADMINISTRATOR", "System administrator with full access");
            createRole("USER", "Regular user with limited access");
            
            log.info("Role data initialized. Total count: {}", roleService.count());
        } else {
            log.info("Role data already exists. Count: {}", roleService.count());
        }
    }

    private void initializeUsers() {
        if (userService.count() == 0) {
            log.info("Initializing user data...");
            
            createUser("alice", "Alice Administrator", "alice@example.com", "ADMINISTRATOR");
            createUser("ursula", "Ursula User", "ursula@example.com", "USER");
            
            log.info("User data initialized. Total count: {}", userService.count());
        } else {
            log.info("User data already exists. Count: {}", userService.count());
        }
    }

    private void createRole(String name, String description) {
        Role role = new Role(name, description);
        roleService.save(role);
    }

    @Transactional
    private void createUser(String username, String fullName, String email, String roleName) {
        User user = new User(username, fullName, email);
        
        // Get the saved role from database
        try {
            var savedRoles = roleService.list(org.springframework.data.domain.Pageable.unpaged(), null);
            savedRoles.stream()
                .filter(role -> roleName.equals(role.getName()))
                .findFirst()
                .ifPresent(role -> user.getRoles().add(role));
        } catch (Exception e) {
            log.warn("Could not assign role {} to user {}: {}", roleName, username, e.getMessage());
        }
        
        userService.save(user);
    }

    @Transactional
    private void initializePermissions() {
        if (permissionService.count() == 0) {
            log.info("Initializing permission data...");
            
            if (screensConfigService.isLoadDefaultConfig()) {
                initializePermissionsFromConfig();
            } else {
                initializeDefaultPermissions();
            }
            
            log.info("Permission data initialized. Total count: {}", permissionService.count());
        } else {
            log.info("Permission data already exists. Count: {}", permissionService.count());
        }
    }
    
    private void initializePermissionsFromConfig() {
        log.info("Loading permissions from configuration file...");
        
        try {
            var screens = screensConfigService.getScreens();
            var adminRole = roleService.findByName("ADMINISTRATOR");
            var userRole = roleService.findByName("USER");
            
            for (var screen : screens) {
                // Set permissions for ADMINISTRATOR role
                if (adminRole.isPresent()) {
                    var adminPermission = screen.getDefaultPermissions().get("ADMINISTRATOR");
                    if (adminPermission != null) {
                        permissionService.savePermission(adminRole.get().getId(), screen.getTitle(), 
                            adminPermission.isCanRead(), adminPermission.isCanWrite());
                    }
                }
                
                // Set permissions for USER role
                if (userRole.isPresent()) {
                    var userPermission = screen.getDefaultPermissions().get("USER");
                    if (userPermission != null) {
                        permissionService.savePermission(userRole.get().getId(), screen.getTitle(), 
                            userPermission.isCanRead(), userPermission.isCanWrite());
                    }
                }
            }
            
            log.info("Loaded permissions for {} screens from configuration", screens.size());
        } catch (Exception e) {
            log.error("Failed to load permissions from configuration: {}", e.getMessage());
            initializeDefaultPermissions();
        }
    }
    
    private void initializeDefaultPermissions() {
        log.info("Loading default permissions (fallback)...");
        
        try {
            var adminRole = roleService.findByName("ADMINISTRATOR");
                
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

    private void createFunctionalArea(String code, String name, String description) {
        FunctionalArea area = new FunctionalArea();
        area.setCode(code);
        area.setName(name);
        area.setDescription(description);
        functionalAreaService.save(area);
    }
}