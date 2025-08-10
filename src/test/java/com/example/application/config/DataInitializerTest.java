package com.example.application.config;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.service.FunctionalAreaService;
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

@ExtendWith(MockitoExtension.class)
class DataInitializerTest {

    @Mock
    private FunctionalAreaService functionalAreaService;

    private DataInitializer dataInitializer;

    @BeforeEach
    void setUp() {
        dataInitializer = new DataInitializer(functionalAreaService);
    }

    @Test
    void initializes_data_when_no_functional_areas_exist() throws Exception {
        when(functionalAreaService.count()).thenReturn(0L);

        dataInitializer.run();

        verify(functionalAreaService, times(10)).save(any(FunctionalArea.class));
    }

    @Test
    void skips_initialization_when_data_already_exists() throws Exception {
        when(functionalAreaService.count()).thenReturn(5L);

        dataInitializer.run();

        verify(functionalAreaService, never()).save(any(FunctionalArea.class));
    }

    @Test
    void creates_correct_functional_areas() throws Exception {
        when(functionalAreaService.count()).thenReturn(0L);
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
        when(functionalAreaService.count()).thenReturn(0L);
        when(functionalAreaService.save(any(FunctionalArea.class)))
            .thenThrow(new RuntimeException("Database error"));

        assertThatThrownBy(() -> dataInitializer.run())
            .isInstanceOf(RuntimeException.class)
            .hasMessage("Data initialization failed");
    }
}