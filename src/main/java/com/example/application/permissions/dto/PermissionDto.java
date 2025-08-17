package com.example.application.permissions.dto;

public class PermissionDto {
    private Long id;
    private Long roleId;
    private String roleName;
    private String screenName;
    private boolean canRead;
    private boolean canWrite;

    public PermissionDto() {}

    public PermissionDto(Long id, Long roleId, String roleName, String screenName, boolean canRead, boolean canWrite) {
        this.id = id;
        this.roleId = roleId;
        this.roleName = roleName;
        this.screenName = screenName;
        this.canRead = canRead;
        this.canWrite = canWrite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public boolean isCanRead() {
        return canRead;
    }

    public void setCanRead(boolean canRead) {
        this.canRead = canRead;
    }

    public boolean isCanWrite() {
        return canWrite;
    }

    public void setCanWrite(boolean canWrite) {
        this.canWrite = canWrite;
    }
}