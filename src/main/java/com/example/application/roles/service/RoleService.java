package com.example.application.roles.service;

import com.example.application.roles.domain.Role;
import com.example.application.roles.dto.RoleDto;
import com.example.application.roles.repository.RoleRepository;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@BrowserCallable
@RolesAllowed({"ADMIN", "USER"})
public class RoleService extends CrudRepositoryService<Role, Long, RoleRepository> {

    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    @Override
    protected RoleRepository getRepository() {
        return repository;
    }

    @Transactional(readOnly = true)
    @RolesAllowed({"ADMIN", "USER"})
    public java.util.Optional<Role> findByName(String name) {
        return repository.findByName(name);
    }

    @Transactional(readOnly = true)
    @RolesAllowed({"ADMIN", "USER"})
    public java.util.List<RoleDto> getAllRoles() {
        return repository.findAll().stream()
            .map(role -> new RoleDto(role.getId(), role.getName(), role.getDescription()))
            .toList();
    }

    @Transactional
    public long count() {
        return repository.count();
    }
}