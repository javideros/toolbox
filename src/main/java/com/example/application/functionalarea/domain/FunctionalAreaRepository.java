package com.example.application.functionalarea.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionalAreaRepository extends JpaRepository<FunctionalArea, Long>, JpaSpecificationExecutor<FunctionalArea> {
    
    boolean existsByName(String name);
    boolean existsByCode(String code);
    boolean existsByNameAndIdNot(String name, Long id);
    boolean existsByCodeAndIdNot(String code, Long id);
}