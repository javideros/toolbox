package com.example.application.dashboard.service;

import com.example.application.dashboard.domain.DashboardTile;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@BrowserCallable
public class MenuConfigService {

    private final DashboardConfigService dashboardConfigService;

    public MenuConfigService(DashboardConfigService dashboardConfigService) {
        this.dashboardConfigService = dashboardConfigService;
    }

    public List<DashboardTile> getMenuItems() {
        return dashboardConfigService.getTilesForMenu();
    }
}