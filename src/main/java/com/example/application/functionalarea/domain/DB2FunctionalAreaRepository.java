package com.example.application.functionalarea.domain;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("DB2FunctionalAreaRepository")
@Profile("db2")
public interface DB2FunctionalAreaRepository extends FunctionalAreaRepository {
    
    @Query(value = "SELECT CASE WHEN EXISTS(SELECT 1 FROM ${app.database.schema}.functional_area WHERE name = ?1) THEN 1 ELSE 0 END", nativeQuery = true)
    int existsByNameNative(String name);
    
    @Query(value = "SELECT CASE WHEN EXISTS(SELECT 1 FROM ${app.database.schema}.functional_area WHERE code = ?1) THEN 1 ELSE 0 END", nativeQuery = true)
    int existsByCodeNative(String code);
    
    @Query(value = "SELECT CASE WHEN EXISTS(SELECT 1 FROM ${app.database.schema}.functional_area WHERE name = ?1 AND id != ?2) THEN 1 ELSE 0 END", nativeQuery = true)
    int existsByNameAndIdNotNative(String name, Long id);
    
    @Query(value = "SELECT CASE WHEN EXISTS(SELECT 1 FROM ${app.database.schema}.functional_area WHERE code = ?1 AND id != ?2) THEN 1 ELSE 0 END", nativeQuery = true)
    int existsByCodeAndIdNotNative(String code, Long id);
    
    default boolean existsByName(String name) {
        return existsByNameNative(name) > 0;
    }
    
    default boolean existsByCode(String code) {
        return existsByCodeNative(code) > 0;
    }
    
    default boolean existsByNameAndIdNot(String name, Long id) {
        return existsByNameAndIdNotNative(name, id) > 0;
    }
    
    default boolean existsByCodeAndIdNot(String code, Long id) {
        return existsByCodeAndIdNotNative(code, id) > 0;
    }
}