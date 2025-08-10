package com.example.application.taskmanagement.domain;

import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link Task} entities.
 * <p>
 * This repository provides CRUD operations and query capabilities for tasks.
 * It is active when neither H2 nor DB2 profiles are enabled, serving as the default repository.
 * </p>
 * 
 * @see Task The entity managed by this repository
 * @see JpaRepository For basic CRUD operations
 * @see JpaSpecificationExecutor For dynamic query capabilities
 */
@Repository
@Profile("!h2 & !db2")
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    /**
     * Retrieves a slice of all tasks with pagination support.
     * <p>
     * This method returns a {@link Slice} instead of a {@link org.springframework.data.domain.Page}
     * for better performance when the total count is not needed, as it only performs a select query
     * without an additional count query.
     * </p>
     * 
     * @param pageable the pagination information
     * @return a slice containing the requested tasks
     */
    Slice<Task> findAllBy(Pageable pageable);
}
