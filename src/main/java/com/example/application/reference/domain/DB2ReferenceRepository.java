package com.example.application.reference.domain;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("DB2ReferenceRepository")
@Profile("db2")
public interface DB2ReferenceRepository extends JpaRepository<ReferenceTable, Long> {

    @Query(value = "SELECT id, code, description, category FROM ${app.database.schema}.reference_table WHERE category = ?1", nativeQuery = true)
    List<ReferenceTable> findByCategoryNative(String category);

    @Query(value = "SELECT COUNT(*) FROM ${app.database.schema}.reference_table", nativeQuery = true)
    Long countAllNative();
}