package com.example.application.reference.domain;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("h2ReferenceRepository")
@Profile("h2")
public interface H2ReferenceRepository extends JpaRepository<ReferenceTable, Long> {

    // Spring Data JPA derived methods are more efficient than native queries
    List<ReferenceTable> findByCategory(String category);
    
    // Use built-in count() method instead of native query
    // long count(); // Already available from JpaRepository
}