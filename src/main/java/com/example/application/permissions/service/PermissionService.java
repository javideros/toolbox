package com.example.application.permissions.service;

import com.example.application.permissions.domain.Permission;
import com.example.application.permissions.dto.PermissionDto;
import com.example.application.permissions.repository.PermissionRepository;
import com.example.application.roles.domain.Role;
import com.example.application.roles.service.RoleService;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@BrowserCallable
@RolesAllowed({"ADMIN", "USER"})
public class PermissionService extends CrudRepositoryService<Permission, Long, PermissionRepository> {

    private final PermissionRepository repository;
    private final RoleService roleService;

    public PermissionService(PermissionRepository repository, RoleService roleService) {
        this.repository = repository;
        this.roleService = roleService;
    }

    @Override
    protected PermissionRepository getRepository() {
        return repository;
    }

    @Transactional(readOnly = true)
    public List<Permission> findByRole(Role role) {
        return repository.findByRole(role);
    }

    @Transactional(readOnly = true)
    @RolesAllowed({"ADMIN", "USER"})
    public List<PermissionDto> findByRoleId(Long roleId) {
        if (roleId == null) {
            return java.util.Collections.emptyList();
        }
        return repository.findAll().stream()
            .filter(permission -> permission.getRole() != null && 
                                 permission.getRole().getId() != null && 
                                 permission.getRole().getId().equals(roleId))
            .map(permission -> new PermissionDto(
                permission.getId(),
                permission.getRole().getId(),
                permission.getRole().getName(),
                permission.getScreenName(),
                permission.isCanRead(),
                permission.isCanWrite()
            ))
            .toList();
    }

    @Transactional
    @RolesAllowed("ADMIN")
    public Permission savePermission(Long roleId, String screenName, boolean canRead, boolean canWrite) {
        if (roleId == null) {
            throw new IllegalArgumentException("Role ID cannot be null");
        }
        if (screenName == null || screenName.trim().isEmpty()) {
            throw new IllegalArgumentException("Screen name cannot be null or empty");
        }
        
        Role role = roleService.get(roleId)
            .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));
        
        // Check if permission already exists
        Permission permission = repository.findByRoleAndScreenName(role, screenName)
            .orElse(new Permission());
        
        permission.setRole(role);
        permission.setScreenName(screenName);
        permission.setCanRead(canRead);
        permission.setCanWrite(canWrite);
        
        return repository.save(permission);
    }

    @Override
    @Transactional
    public Permission save(Permission permission) {
        // This method should not be used directly from frontend
        return super.save(permission);
    }

    @Transactional
    public long count() {
        return repository.count();
    }
}