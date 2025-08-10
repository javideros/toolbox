package com.example.application.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Database configuration for different database profiles.
 * Provides profile-specific configurations for H2 and DB2 databases.
 */
@Configuration
public class DatabaseConfig {

    /**
     * Configuration for H2 database profile.
     * Active when 'h2' profile is enabled.
     */
    @Configuration
    @Profile("h2")
    public static class H2Config {
        // H2 specific configuration if needed
    }

    /**
     * Configuration for DB2 database profile.
     * Active when 'db2' profile is enabled.
     */
    @Configuration
    @Profile("db2")
    public static class DB2Config {
        // DB2 specific configuration if needed
    }
}