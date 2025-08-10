package com.example.application.config;

import com.example.application.functionalarea.domain.FunctionalArea;
import com.example.application.functionalarea.service.FunctionalAreaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final FunctionalAreaService functionalAreaService;

    public DataInitializer(FunctionalAreaService functionalAreaService) {
        this.functionalAreaService = functionalAreaService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        try {
            if (functionalAreaService.count() == 0) {
                log.info("Initializing functional area data...");
                
                createFunctionalArea("FI", "Financial", "Financial operations and accounting");
                createFunctionalArea("DE", "Delivery", "Package delivery and logistics");
                createFunctionalArea("WH", "Warehouse", "Inventory management and storage");
                createFunctionalArea("CS", "Customer Service", "Customer support and relations");
                createFunctionalArea("OP", "Operations", "Daily operational activities");
                createFunctionalArea("HR", "Human Resources", "Staff management and administration");
                createFunctionalArea("IT", "Information Technology", "Technology support and systems");
                createFunctionalArea("SE", "Security", "Facility and cargo security");
                createFunctionalArea("QA", "Quality Assurance", "Quality control and compliance");
                createFunctionalArea("MN", "Maintenance", "Equipment and facility maintenance");
                
                log.info("Functional area data initialized. Total count: {}", functionalAreaService.count());
            } else {
                log.info("Functional area data already exists. Count: {}", functionalAreaService.count());
            }
        } catch (Exception e) {
            log.error("Failed to initialize functional area data: {}", e.getMessage(), e);
            throw new RuntimeException("Data initialization failed", e);
        }
    }

    private void createFunctionalArea(String code, String name, String description) {
        FunctionalArea area = new FunctionalArea();
        area.setCode(code);
        area.setName(name);
        area.setDescription(description);
        functionalAreaService.save(area);
    }
}