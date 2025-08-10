package com.example.application.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.MappedSuperclass;
import org.jspecify.annotations.Nullable;
import org.springframework.data.util.ProxyUtils;

@MappedSuperclass
public abstract class AbstractEntity<ID> {

    @JsonIgnore
    public abstract @Nullable ID getId();

    @Override
    public String toString() {
        return "%s{id=%s}".formatted(getClass().getSimpleName(), getId());
    }

    @Override
    public int hashCode() {
        // Hashcode should never change during the lifetime of an object. Because of
        // this we can't use getId() to calculate the hashcode. Unless you have sets
        // with lots of entities in them, returning the same hashcode should not be a
        // problem.
        return ProxyUtils.getUserClass(getClass()).hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || obj == this) {
            return obj == this;
        }

        if (!isSameClass(obj)) {
            return false;
        }

        if (!(obj instanceof AbstractEntity<?> other)) {
            return false;
        }
        
        var id = getId();
        return id != null && id.equals(other.getId());
    }
    
    private boolean isSameClass(Object obj) {
        var thisUserClass = ProxyUtils.getUserClass(getClass());
        var otherUserClass = ProxyUtils.getUserClass(obj);
        return thisUserClass == otherUserClass;
    }

}
