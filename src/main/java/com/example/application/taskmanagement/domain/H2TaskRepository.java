package com.example.application.taskmanagement.domain;

import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Profile("h2")
@Primary
public interface H2TaskRepository extends TaskRepository {

    Slice<Task> findAllBy(Pageable pageable);
    
    // H2 specific queries if needed
    @Query("SELECT t FROM Task t WHERE t.description LIKE %?1%")
    Slice<Task> findByDescriptionContainingH2(String description, Pageable pageable);
}