package com.example.application.permissions.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PermissionServiceTest {

    @Test
    void savePermission_validation_test() {
        PermissionService service = new PermissionService(null, null);
        
        assertThatThrownBy(() -> service.savePermission(null, "Dashboard", true, false))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Role ID cannot be null");
            
        assertThatThrownBy(() -> service.savePermission(1L, null, true, false))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Screen name cannot be null or empty");
            
        assertThatThrownBy(() -> service.savePermission(1L, "", true, false))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Screen name cannot be null or empty");
    }
}