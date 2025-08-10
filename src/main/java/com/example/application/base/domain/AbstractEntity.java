package com.example.application.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.MappedSuperclass;
import org.jspecify.annotations.Nullable;
import org.springframework.data.util.ProxyUtils;

@MappedSuperclass
public abstract class AbstractEntity<ID> {

    private transient int cachedHashCode;
    private transient boolean hashCodeCalculated = false;

    @JsonIgnore
    public abstract @Nullable ID getId();

    @Override
    public String toString() {
        try {
            var id = getId();
            return "%s{id=%s}".formatted(getClass().getSimpleName(), id != null ? id : "<null>");
        } catch (Exception e) {
            return "Entity{id=<error>}";
        }
    }

    @Override
    public int hashCode() {
        // Hashcode should never change during the lifetime of an object. Because of
        // this we can't use getId() to calculate the hashcode. Unless you have sets
        // with lots of entities in them, returning the same hashcode should not be a
        // problem.
        if (!hashCodeCalculated) {
            cachedHashCode = ProxyUtils.getUserClass(getClass()).hashCode();
            hashCodeCalculated = true;
        }
        return cachedHashCode;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof AbstractEntity<?> other)) return false;
        
        // Cache class lookups to avoid redundant ProxyUtils calls
        var thisClass = ProxyUtils.getUserClass(getClass());
        var otherClass = ProxyUtils.getUserClass(other.getClass());
        if (!thisClass.equals(otherClass)) return false;
        
        var id = getId();
        return id != null && id.equals(other.getId());
    }

}
