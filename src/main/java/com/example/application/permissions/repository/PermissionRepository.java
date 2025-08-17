package com.example.application.permissions.repository;

import com.example.application.permissions.domain.Permission;
import com.example.application.roles.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long>, JpaSpecificationExecutor<Permission> {
    List<Permission> findByRole(Role role);
    Optional<Permission> findByRoleAndScreenName(Role role, String screenName);
}