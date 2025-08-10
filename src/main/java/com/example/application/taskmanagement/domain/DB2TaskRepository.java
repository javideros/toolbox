package com.example.application.taskmanagement.domain;

import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Profile("db2")
public interface DB2TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    Slice<Task> findAllBy(Pageable pageable);
    
    // DB2 specific queries if needed
    @Query("SELECT t FROM Task t WHERE t.description LIKE CONCAT('%', ?1, '%')")
    Slice<Task> findByDescriptionContaining(String description, Pageable pageable);
}