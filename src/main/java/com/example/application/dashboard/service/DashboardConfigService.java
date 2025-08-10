package com.example.application.dashboard.service;

import com.example.application.dashboard.domain.DashboardTile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.security.RolesAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@BrowserCallable
public class DashboardConfigService {

    private static final Logger log = LoggerFactory.getLogger(DashboardConfigService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String configFile = "dashboard-config.json";
    private List<DashboardTile> cachedTiles;

    @PostConstruct
    private void loadConfiguration() {
        try {
            ClassPathResource resource = new ClassPathResource(configFile);
            cachedTiles = objectMapper.readValue(resource.getInputStream(), 
                new TypeReference<List<DashboardTile>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to load dashboard configuration", e);
        }
    }

    public List<DashboardTile> getAllTiles() {
        return getTilesForDashboard();
    }
    
    public List<DashboardTile> getTilesForDashboard() {
        boolean isAdmin = isCurrentUserAdmin();
        log.debug("Dashboard tiles - isAdmin: {}", isAdmin);
        
        List<DashboardTile> result = cachedTiles.stream()
            .filter(DashboardTile::isEnabled)
            .filter(DashboardTile::isShowInDashboard)
            .filter(tile -> {
                boolean allowed = !tile.isAdminOnly() || isAdmin;
                log.debug("Tile: {}, adminOnly: {}, allowed: {}", tile.getTitle(), tile.isAdminOnly(), allowed);
                return allowed;
            })
            .sorted((a, b) -> Integer.compare(a.getOrder(), b.getOrder()))
            .collect(Collectors.toList());
            
        log.debug("Returning {} dashboard tiles", result.size());
        return result;
    }
    
    public List<DashboardTile> getTilesForMenu() {
        boolean isAdmin = isCurrentUserAdmin();
        log.debug("Menu tiles - isAdmin: {}", isAdmin);
        
        List<DashboardTile> result = cachedTiles.stream()
            .filter(DashboardTile::isEnabled)
            .filter(DashboardTile::isShowInMenu)
            .filter(tile -> {
                boolean allowed = !tile.isAdminOnly() || isAdmin;
                log.debug("Menu Tile: {}, adminOnly: {}, allowed: {}", tile.getTitle(), tile.isAdminOnly(), allowed);
                return allowed;
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

    @RolesAllowed("ADMIN")
    public List<DashboardTile> getAllTilesForAdmin() {
        return cachedTiles;
    }

    @RolesAllowed("ADMIN")
    public void saveDashboardConfiguration(List<DashboardTile> tiles) {
        Path configPath = getConfigFilePath();
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(configPath.toFile(), tiles);
        } catch (AccessDeniedException e) {
            throw new RuntimeException("Access denied when saving dashboard configuration. Check file permissions.", e);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save dashboard configuration", e);
        }
    }
    
    private Path getConfigFilePath() {
        return Paths.get("src/main/resources/" + configFile);
    }
}