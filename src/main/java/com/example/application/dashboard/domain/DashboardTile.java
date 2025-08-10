package com.example.application.dashboard.domain;

public class DashboardTile {
    private Long id;
    private String title;
    private String description;
    private String link;
    private String icon;
    private boolean enabled;
    private boolean showInMenu;
    private boolean showInDashboard;
    private boolean adminOnly;
    private int order;

    public DashboardTile() {}

    public DashboardTile(Long id, String title, String description, String link, String icon, boolean enabled, boolean showInMenu, boolean showInDashboard, boolean adminOnly, int order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
        this.icon = icon;
        this.enabled = enabled;
        this.showInMenu = showInMenu;
        this.showInDashboard = showInDashboard;
        this.adminOnly = adminOnly;
        this.order = order;
    }

    // Basic properties
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getOrder() { return order; }
    public void setOrder(int order) { this.order = order; }

    // Display flags
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    public boolean isShowInMenu() { return showInMenu; }
    public void setShowInMenu(boolean showInMenu) { this.showInMenu = showInMenu; }

    public boolean isShowInDashboard() { return showInDashboard; }
    public void setShowInDashboard(boolean showInDashboard) { this.showInDashboard = showInDashboard; }

    public boolean isAdminOnly() { return adminOnly; }
    public void setAdminOnly(boolean adminOnly) { this.adminOnly = adminOnly; }
}