package com.example.application.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(1)
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Additional security headers not covered by Spring Security
        httpResponse.setHeader("X-Permitted-Cross-Domain-Policies", "none");
        httpResponse.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        httpResponse.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        httpResponse.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        httpResponse.setHeader("Permissions-Policy", 
            "geolocation=(), microphone=(), camera=(), payment=(), usb=(), " +
            "magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(self)");
        
        // Cache control for security-sensitive responses
        String servletPath = ((jakarta.servlet.http.HttpServletRequest) request).getServletPath();
        if (servletPath.contains("/api/") || servletPath.contains("/connect/")) {
            httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            httpResponse.setHeader("Pragma", "no-cache");
            httpResponse.setHeader("Expires", "0");
        }
        
        chain.doFilter(request, response);
    }
}