package com.example.application.permissions.service;

import com.example.application.users.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserPermissionService {

    private final UserService userService;
    private final PermissionService permissionService;

    public UserPermissionService(UserService userService, PermissionService permissionService) {
        this.userService = userService;
        this.permissionService = permissionService;
    }

    public boolean hasWritePermission(String screenName) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null) return false;
            
            String username = auth.getName();
            var user = userService.findByUsername(username);
            if (user.isEmpty()) return false;
            
            // Check permissions for all user roles
            return user.get().getRoles().stream()
                .flatMap(role -> permissionService.findByRoleId(role.getId()).stream())
                .anyMatch(permission -> screenName.equals(permission.getScreenName()) && permission.isCanWrite());
        } catch (Exception e) {
            return false;
        }
    }

    public void requireWritePermission(String screenName) {
        if (!hasWritePermission(screenName)) {
            throw new SecurityException("You do not have write permission for " + screenName + " screen");
        }
    }
}