package com.example.application.functionalarea.service;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.domain.FunctionalAreaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FunctionalAreaServiceTest {

    @Mock
    private FunctionalAreaRepository repository;

    private FunctionalAreaService service;

    @BeforeEach
    void setUp() {
        service = new FunctionalAreaService(repository);
    }

    @Test
    @Transactional
    void listAll_returns_all_functional_areas() {
        var area1 = createFunctionalArea(1L, "FI", "Financial");
        var area2 = createFunctionalArea(2L, "IT", "Information Technology");
        when(repository.findAll()).thenReturn(List.of(area1, area2));

        var result = service.listAll();

        assertThat(result).hasSize(2).containsExactly(area1, area2);
    }

    @Test
    @Transactional
    void count_returns_repository_count() {
        when(repository.count()).thenReturn(5L);

        var result = service.count();

        assertThat(result).isEqualTo(5L);
    }

    @Test
    @Transactional
    void save_new_entity_succeeds_when_unique() {
        var newArea = createFunctionalArea(null, "FI", "Financial");
        when(repository.existsByName("Financial")).thenReturn(false);
        when(repository.existsByCode("FI")).thenReturn(false);
        when(repository.save(newArea)).thenReturn(createFunctionalArea(1L, "FI", "Financial"));

        var result = service.save(newArea);

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository).save(newArea);
    }

    @Test
    @Transactional
    void save_new_entity_throws_exception_when_name_exists() {
        var newArea = createFunctionalArea(null, "FI", "Financial");
        when(repository.existsByName("Financial")).thenReturn(true);

        assertThatThrownBy(() -> service.save(newArea))
            .isInstanceOf(FunctionalAreaValidationException.class)
            .hasMessage("Functional area with name 'Financial' already exists");
    }

    @Test
    @Transactional
    void save_new_entity_throws_exception_when_code_exists() {
        var newArea = createFunctionalArea(null, "FI", "Financial");
        when(repository.existsByName("Financial")).thenReturn(false);
        when(repository.existsByCode("FI")).thenReturn(true);

        assertThatThrownBy(() -> service.save(newArea))
            .isInstanceOf(FunctionalAreaValidationException.class)
            .hasMessage("Functional area with code 'FI' already exists");
    }

    @Test
    @Transactional
    void save_existing_entity_succeeds_when_unique() {
        var existingArea = createFunctionalArea(1L, "FI", "Financial");
        when(repository.existsByNameAndIdNot("Financial", 1L)).thenReturn(false);
        when(repository.existsByCodeAndIdNot("FI", 1L)).thenReturn(false);
        when(repository.save(existingArea)).thenReturn(existingArea);

        var result = service.save(existingArea);

        assertThat(result).isEqualTo(existingArea);
        verify(repository).save(existingArea);
    }

    @Test
    @Transactional
    void save_existing_entity_throws_exception_when_name_exists() {
        var existingArea = createFunctionalArea(1L, "FI", "Financial");
        when(repository.existsByNameAndIdNot("Financial", 1L)).thenReturn(true);

        assertThatThrownBy(() -> service.save(existingArea))
            .isInstanceOf(FunctionalAreaValidationException.class)
            .hasMessage("Functional area with name 'Financial' already exists");
    }

    private FunctionalArea createFunctionalArea(Long id, String code, String name) {
        var area = new FunctionalArea();
        area.setId(id);
        area.setCode(code);
        area.setName(name);
        area.setDescription(name + " operations");
        return area;
    }
}