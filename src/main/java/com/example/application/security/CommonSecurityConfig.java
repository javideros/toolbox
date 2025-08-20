package com.example.application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Common security configuration that enables method-level security.
 * <p>
 * This configuration provides foundational security capabilities that are shared across all authentication mechanisms
 * in the application. It enables:
 * <ul>
 * <li>Spring Security's method-level security annotations</li>
 * <li>A {@link CurrentUser} for accessing information about the current user, using the application's security
 * model</li>
 * </ul>
 * </p>
 * <p>
 * Method security allows the use of the following annotations throughout the application:
 * <ul>
 * <li>{@link org.springframework.security.access.prepost.PreAuthorize @PreAuthorize} - Controls method access based on
 * expressions evaluated before method execution</li>
 * <li>{@link org.springframework.security.access.prepost.PostAuthorize @PostAuthorize} - Controls method access based
 * on expressions evaluated after method execution</li>
 * <li>{@link org.springframework.security.access.prepost.PreFilter @PreFilter} - Filters method arguments before method
 * execution</li>
 * <li>{@link org.springframework.security.access.prepost.PostFilter @PostFilter} - Filters method return values after
 * method execution</li>
 * </ul>
 * </p>
 * <p>
 * All authenticated principals must implement {@link AppUserPrincipal}, allowing security expressions to access user
 * information with the pattern: {@code authentication.principal.appUser.userId}
 * </p>
 * <p>
 * Example usage in methods: <!-- spotless:off -->
 * <pre>
 * {@code
 * // Method security
 * @PreAuthorize("authentication.principal.appUser.userId == #document.ownerId")
 * public void updateDocument(Document document) { ... }
 *
 * @PostAuthorize("returnObject.createdBy == authentication.principal.appUser.userId")
 * public Document getDocument(long id) { ... }
 * }
 * </pre>
 * <!-- spotless:on -->
 * </p>
 *
 * @see AppUserPrincipal The principal interface that all authenticated users implement
 * @see CurrentUser Utility for accessing the current user information
 * @see org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
 */
@EnableMethodSecurity
@Configuration
class CommonSecurityConfig {

    /**
     * Provides access to the currently authenticated user's information.
     * <p>
     * This method creates a {@link CurrentUser} service that can be used throughout the application to safely access
     * information about the currently authenticated user. The service uses the provided
     * {@link SecurityContextHolderStrategy} to retrieve the security context and extract user details from the
     * authentication principal.
     * </p>
     * <p>
     * The {@link CurrentUser} service provides both optional access via {@link CurrentUser#get()} for cases where
     * authentication may not be present, and required access via {@link CurrentUser#require()} for endpoints that
     * mandate authentication. It expects all authenticated principals to implement {@link AppUserPrincipal}.
     * </p>
     *
     * @param securityContextHolderStrategy
     *            the strategy for accessing the security context
     * @return a {@link CurrentUser} service for accessing current user information
     * @see AppUserPrincipal The principal interface that all authenticated users must implement
     * @see CurrentUser The service class for accessing current user information
     */
    @Bean
    public CurrentUser currentUser(SecurityContextHolderStrategy securityContextHolderStrategy) {
        return new CurrentUser(securityContextHolderStrategy);
    }

    @Autowired
    private CsrfTokenRepository csrfTokenRepository;

    /**
     * Configures comprehensive security headers for the application.
     * Includes CSP, HSTS, XSS protection, and other security measures.
     */
    @Bean
    public void configureSecurityHeaders(HttpSecurity http) throws Exception {
        http.headers(headers -> headers
            // Content Security Policy - restrictive but allows Vaadin functionality
            .contentSecurityPolicy("default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: https:; " +
                "font-src 'self' data:; " +
                "connect-src 'self'; " +
                "frame-ancestors 'none'").and()
            
            // Prevent clickjacking
            .frameOptions().deny()
            
            // Prevent MIME type sniffing
            .contentTypeOptions().and()
            
            // XSS Protection
            .addHeaderWriter(new XXssProtectionHeaderWriter())
            
            // Referrer Policy
            .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN).and()
            
            // HSTS for HTTPS enforcement
            .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                .maxAgeInSeconds(31536000) // 1 year
                .includeSubDomains(true))
        )
        // CSRF Protection with custom repository
        .csrf(csrf -> csrf.csrfTokenRepository(csrfTokenRepository));
    }
}
