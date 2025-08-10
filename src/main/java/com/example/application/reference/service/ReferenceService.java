package com.example.application.reference.service;

import com.example.application.reference.domain.ReferenceTable;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@BrowserCallable
public class ReferenceService {

    private final JpaRepository<ReferenceTable, Long> repository;

    public ReferenceService(@Autowired(required = false) @Qualifier("h2ReferenceRepository") JpaRepository<ReferenceTable, Long> h2Repository,
                           @Autowired(required = false) @Qualifier("DB2ReferenceRepository") JpaRepository<ReferenceTable, Long> db2Repository) {
        this.repository = h2Repository != null ? h2Repository : db2Repository;
    }

    public List<ReferenceTable> list() {
        return repository.findAll();
    }

    public long getTotalCount() {
        return repository.count();
    }

    public ReferenceTable save(ReferenceTable entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Reference with id " + id + " not found", e);
        }
    }
}