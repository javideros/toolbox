package com.example.application.config;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.service.FunctionalAreaService;
import com.example.application.permissions.service.PermissionService;
import com.example.application.roles.service.RoleService;
import com.example.application.users.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class DataInitializerTest {

    @Mock
    private FunctionalAreaService functionalAreaService;
    
    @Mock
    private RoleService roleService;
    
    @Mock
    private UserService userService;
    
    @Mock
    private PermissionService permissionService;
    
    @Mock
    private ScreensConfigService screensConfigService;

    private DataInitializer dataInitializer;

    @BeforeEach
    void setUp() {
        dataInitializer = new DataInitializer(functionalAreaService, roleService, userService, permissionService, screensConfigService);
    }

    @Test
    void initializes_data_when_no_functional_areas_exist() throws Exception {
        when(roleService.count()).thenReturn(0L);
        when(userService.count()).thenReturn(0L);
        when(functionalAreaService.count()).thenReturn(0L);
        when(permissionService.count()).thenReturn(0L);
        when(roleService.findByName("ADMINISTRATOR")).thenReturn(java.util.Optional.empty());

        dataInitializer.run();

        verify(roleService, times(2)).save(any());
        verify(userService, times(2)).save(any());
        verify(functionalAreaService, times(10)).save(any(FunctionalArea.class));
        // Permissions won't be created because no admin role is found
        verify(permissionService, never()).save(any());
    }

    @Test
    void skips_initialization_when_data_already_exists() throws Exception {
        when(roleService.count()).thenReturn(2L);
        when(userService.count()).thenReturn(2L);
        when(functionalAreaService.count()).thenReturn(5L);
        when(permissionService.count()).thenReturn(10L);

        dataInitializer.run();

        verify(roleService, never()).save(any());
        verify(userService, never()).save(any());
        verify(functionalAreaService, never()).save(any(FunctionalArea.class));
        verify(permissionService, never()).save(any());
    }

    @Test
    void creates_correct_functional_areas() throws Exception {
        when(roleService.count()).thenReturn(0L);
        when(userService.count()).thenReturn(0L);
        when(functionalAreaService.count()).thenReturn(0L);
        when(permissionService.count()).thenReturn(0L);
        when(roleService.findByName("ADMINISTRATOR")).thenReturn(java.util.Optional.empty());
        ArgumentCaptor<FunctionalArea> captor = ArgumentCaptor.forClass(FunctionalArea.class);

        dataInitializer.run();

        verify(functionalAreaService, times(10)).save(captor.capture());
        
        var savedAreas = captor.getAllValues();
        assertThat(savedAreas).hasSize(10);
        
        var fiArea = savedAreas.stream()
            .filter(area -> "FI".equals(area.getCode()))
            .findFirst()
            .orElseThrow();
        
        assertThat(fiArea.getCode()).isEqualTo("FI");
        assertThat(fiArea.getName()).isEqualTo("Financial");
        assertThat(fiArea.getDescription()).isEqualTo("Financial operations and accounting");
    }

    @Test
    void throws_runtime_exception_when_service_fails() {
        when(roleService.count()).thenReturn(0L);
        lenient().when(roleService.save(any()))
            .thenThrow(new RuntimeException("Database error"));

        assertThatThrownBy(() -> dataInitializer.run())
            .isInstanceOf(RuntimeException.class)
            .hasMessage("Data initialization failed");
    }
}