package com.example.application.dashboard.service;

import com.example.application.dashboard.domain.DashboardTile;
import com.example.application.permissions.service.PermissionService;
import com.example.application.users.service.UserService;
import com.example.application.config.ScreensConfigService;
import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.security.RolesAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@BrowserCallable
@RolesAllowed({"ADMIN", "USER"})
public class DashboardConfigService {

    private static final Logger log = LoggerFactory.getLogger(DashboardConfigService.class);
    private List<DashboardTile> cachedTiles;
    private final PermissionService permissionService;
    private final UserService userService;
    private final ScreensConfigService screensConfigService;

    public DashboardConfigService(PermissionService permissionService, UserService userService, ScreensConfigService screensConfigService) {
        this.permissionService = permissionService;
        this.userService = userService;
        this.screensConfigService = screensConfigService;
    }

    @PostConstruct
    private void loadConfiguration() {
        try {
            cachedTiles = screensConfigService.getScreens().stream()
                .map(screen -> {
                    DashboardTile tile = new DashboardTile();
                    tile.setId((long) screen.getId());
                    tile.setTitle(screen.getTitle());
                    tile.setDescription(screen.getDescription());
                    tile.setLink(screen.getLink());
                    tile.setIcon(screen.getIcon());
                    tile.setEnabled(screen.isEnabled());
                    tile.setShowInMenu(screen.isShowInMenu());
                    tile.setShowInDashboard(screen.isShowInDashboard());
                    tile.setOrder(screen.getOrder());
                    // Admin-only screens are those with no USER permissions
                    var userPermission = screen.getDefaultPermissions().get("USER");
                    tile.setAdminOnly(userPermission == null || (!userPermission.isCanRead() && !userPermission.isCanWrite()));
                    return tile;
                })
                .toList();
            log.info("Loaded {} dashboard tiles from screens configuration", cachedTiles.size());
        } catch (Exception e) {
            log.error("Failed to load dashboard configuration: {}", e.getMessage());
            cachedTiles = List.of();
        }
    }

    public List<DashboardTile> getAllTiles() {
        return getTilesForDashboard();
    }
    
    @RolesAllowed({"ADMIN", "USER"})
    public List<DashboardTile> getTilesForDashboard() {
        boolean isAdmin = isCurrentUserAdmin();
        log.debug("Dashboard tiles - isAdmin: {}", isAdmin);
        
        List<DashboardTile> result = cachedTiles.stream()
            .filter(DashboardTile::isEnabled)
            .filter(DashboardTile::isShowInDashboard)
            .filter(tile -> {
                // Check admin-only restriction first
                if (tile.isAdminOnly() && !isAdmin) {
                    return false;
                }
                
                // Check permission-based access
                boolean hasPermission = hasReadPermission(tile.getTitle());
                log.debug("Tile: {}, adminOnly: {}, hasPermission: {}", tile.getTitle(), tile.isAdminOnly(), hasPermission);
                return hasPermission;
            })
            .sorted((a, b) -> Integer.compare(a.getOrder(), b.getOrder()))
            .collect(Collectors.toList());
            
        log.debug("Returning {} dashboard tiles", result.size());
        return result;
    }
    
    @RolesAllowed({"ADMIN", "USER"})
    public List<DashboardTile> getTilesForMenu() {
        boolean isAdmin = isCurrentUserAdmin();
        log.debug("Menu tiles - isAdmin: {}", isAdmin);
        
        List<DashboardTile> result = cachedTiles.stream()
            .filter(DashboardTile::isEnabled)
            .filter(DashboardTile::isShowInMenu)
            .filter(tile -> {
                // Check admin-only restriction first
                if (tile.isAdminOnly() && !isAdmin) {
                    return false;
                }
                
                // Check permission-based access
                boolean hasPermission = hasReadPermission(tile.getTitle());
                log.debug("Menu Tile: {}, adminOnly: {}, hasPermission: {}", tile.getTitle(), tile.isAdminOnly(), hasPermission);
                return hasPermission;
            })
            .sorted((a, b) -> Integer.compare(a.getOrder(), b.getOrder()))
            .collect(Collectors.toList());
            
        log.debug("Returning {} menu tiles", result.size());
        return result;
    }
    
    private boolean isCurrentUserAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return false;
        
        return auth.getAuthorities().stream()
            .anyMatch(authority -> 
                "ADMIN".equals(authority.getAuthority()) || 
                "ROLE_ADMIN".equals(authority.getAuthority())
            );
    }
    
    private boolean hasReadPermission(String screenName) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null) return false;
            
            String username = auth.getName();
            var user = userService.findByUsername(username);
            if (user.isEmpty()) return false;
            
            // Check permissions for all user roles
            return user.get().getRoles().stream()
                .flatMap(role -> permissionService.findByRoleId(role.getId()).stream())
                .anyMatch(permission -> screenName.equals(permission.getScreenName()) && permission.isCanRead());
        } catch (Exception e) {
            log.warn("Error checking permission for screen {}: {}", screenName, e.getMessage());
            return false;
        }
    }

    @RolesAllowed("ADMIN")
    public List<DashboardTile> getAllTilesForAdmin() {
        return cachedTiles;
    }

    @RolesAllowed("ADMIN")
    public void saveDashboardConfiguration(List<DashboardTile> tiles) {
        throw new UnsupportedOperationException("Dashboard configuration is now managed through screens-config.json");
    }
}