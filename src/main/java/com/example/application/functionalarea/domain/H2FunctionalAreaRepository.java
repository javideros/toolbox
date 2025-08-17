package com.example.application.functionalarea.domain;

import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

@Repository("h2FunctionalAreaRepository")
@Profile("h2")
@Primary
public interface H2FunctionalAreaRepository extends FunctionalAreaRepository {
    
    // Spring Data JPA derived methods are more efficient than native queries for simple existence checks
    boolean existsByName(String name);
    boolean existsByCode(String code);
    boolean existsByNameAndIdNot(String name, Long id);
    boolean existsByCodeAndIdNot(String code, Long id);
}