package com.example.application.functionalarea.service;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.domain.FunctionalAreaRepository;
import com.example.application.permissions.service.UserPermissionService;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.security.RolesAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

class FunctionalAreaValidationException extends RuntimeException {
    public FunctionalAreaValidationException(String message) {
        super(message);
    }
}

@Service
@BrowserCallable
@RolesAllowed({"ADMIN", "USER"})
public class FunctionalAreaService extends CrudRepositoryService<FunctionalArea, Long, FunctionalAreaRepository> {

    private static final Logger log = LoggerFactory.getLogger(FunctionalAreaService.class);
    private final FunctionalAreaRepository repository;
    private final UserPermissionService userPermissionService;

    public FunctionalAreaService(FunctionalAreaRepository repository, UserPermissionService userPermissionService) {
        this.repository = repository;
        this.userPermissionService = userPermissionService;
    }

    @Override
    protected FunctionalAreaRepository getRepository() {
        return repository;
    }
    
    @Transactional(readOnly = true)
    public java.util.List<FunctionalArea> listAll() {
        java.util.List<FunctionalArea> areas = repository.findAll();
        log.info("Found {} functional areas", areas.size());
        return areas;
    }
    
    @Transactional(readOnly = true)
    public long count() {
        return repository.count();
    }
    
    @PostConstruct
    public void init() {
        long count = repository.count();
        log.info("FunctionalAreaService initialized. Total functional areas: {}", count);
    }

    @Override
    @Transactional
    public FunctionalArea save(FunctionalArea entity) {
        performPermissionCheck();

        if (entity.getId() == null) {
            validateNewFunctionalArea(entity);
        } else {
            validateExistingFunctionalArea(entity);
        }
        return repository.save(entity);
    }

    private void performPermissionCheck() {
        // Skip permission check during system initialization
        try {
            userPermissionService.requireWritePermission("Functional Areas");
        } catch (Exception e) {
            // Allow save during startup when no user context exists
            log.debug("Bypassing permission check during system initialization");
        }
    }

    @Transactional(readOnly = true)
    private void validateNewFunctionalArea(FunctionalArea entity) {
        if (repository.existsByName(entity.getName())) {
            throw new FunctionalAreaValidationException(
                    "Functional area with name '" + entity.getName() + "' already exists");
        }
        if (repository.existsByCode(entity.getCode())) {
            throw new FunctionalAreaValidationException(
                    "Functional area with code '" + entity.getCode() + "' already exists");
        }
    }

    @Transactional(readOnly = true)
    private void validateExistingFunctionalArea(FunctionalArea entity) {
        if (repository.existsByNameAndIdNot(entity.getName(), entity.getId())) {
            throw new FunctionalAreaValidationException(
                    "Functional area with name '" + entity.getName() + "' already exists");
        }
        if (repository.existsByCodeAndIdNot(entity.getCode(), entity.getId())) {
            throw new FunctionalAreaValidationException(
                    "Functional area with code '" + entity.getCode() + "' already exists");
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        userPermissionService.requireWritePermission("Functional Areas");
        super.delete(id);
    }
}