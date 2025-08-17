package com.example.application.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ScreensConfigService {

    private static final Logger log = LoggerFactory.getLogger(ScreensConfigService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Value("${app.permissions.load-default-config:false}")
    private boolean loadDefaultConfig;
    
    @Value("${app.permissions.config-file:screens-config.json}")
    private String configFile;
    
    private ScreensConfig screensConfig;

    @PostConstruct
    private void loadConfiguration() {
        if (!loadDefaultConfig) {
            log.info("Default permissions configuration loading is disabled");
            return;
        }
        
        try {
            ClassPathResource resource = new ClassPathResource(configFile);
            screensConfig = objectMapper.readValue(resource.getInputStream(), ScreensConfig.class);
            log.info("Loaded screens configuration with {} screens", screensConfig.getScreens().size());
        } catch (IOException e) {
            log.error("Failed to load screens configuration from {}: {}", configFile, e.getMessage());
            screensConfig = new ScreensConfig();
        }
    }

    public boolean isLoadDefaultConfig() {
        return loadDefaultConfig;
    }

    public List<ScreenConfig> getScreens() {
        return screensConfig != null ? screensConfig.getScreens() : List.of();
    }

    public static class ScreensConfig {
        private List<ScreenConfig> screens = List.of();

        public List<ScreenConfig> getScreens() {
            return screens;
        }

        public void setScreens(List<ScreenConfig> screens) {
            this.screens = screens;
        }
    }

    public static class ScreenConfig {
        private int id;
        private String title;
        private String description;
        private String link;
        private String icon;
        private boolean enabled;
        private boolean showInMenu;
        private boolean showInDashboard;
        private int order;
        private Map<String, PermissionConfig> defaultPermissions = Map.of();

        // Getters and setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getLink() { return link; }
        public void setLink(String link) { this.link = link; }
        
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
        
        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }
        
        public boolean isShowInMenu() { return showInMenu; }
        public void setShowInMenu(boolean showInMenu) { this.showInMenu = showInMenu; }
        
        public boolean isShowInDashboard() { return showInDashboard; }
        public void setShowInDashboard(boolean showInDashboard) { this.showInDashboard = showInDashboard; }
        
        public int getOrder() { return order; }
        public void setOrder(int order) { this.order = order; }
        
        public Map<String, PermissionConfig> getDefaultPermissions() { return defaultPermissions; }
        public void setDefaultPermissions(Map<String, PermissionConfig> defaultPermissions) { this.defaultPermissions = defaultPermissions; }
    }

    public static class PermissionConfig {
        private boolean canRead;
        private boolean canWrite;

        public boolean isCanRead() { return canRead; }
        public void setCanRead(boolean canRead) { this.canRead = canRead; }
        
        public boolean isCanWrite() { return canWrite; }
        public void setCanWrite(boolean canWrite) { this.canWrite = canWrite; }
    }
}