package com.example.application.permissions.domain;

import com.example.application.base.domain.AbstractEntity;
import com.example.application.roles.domain.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "permissions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"role_id", "screen_name"})
})
public class Permission extends AbstractEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @NotBlank
    @Column(name = "screen_name")
    private String screenName;

    @Column(name = "can_read")
    private boolean canRead = false;

    @Column(name = "can_write")
    private boolean canWrite = false;

    public Permission() {}

    public Permission(Role role, String screenName, boolean canRead, boolean canWrite) {
        this.role = role;
        this.screenName = screenName;
        this.canRead = canRead;
        this.canWrite = canWrite;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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