package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * REST controller for AI chat functionality.
 * Provides endpoints for sending messages to AI providers and querying project context.
 */
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private MultiAiService multiAiService;
    
    @Autowired
    private McpCoordinator mcpCoordinator;

    /**
     * Sends a message to the specified AI provider.
     * 
     * @param request contains the message and provider selection
     * @return AI response or generic error message
     */
    @PostMapping("/message")
    public String sendMessage(@RequestBody ChatRequest request) {
        try {
            AiProvider provider = AiProvider.valueOf(request.provider());
            String response = multiAiService.chat(request.message(), provider);
            if (response != null && (response.toLowerCase().contains("exception")
                || response.toLowerCase().contains("error")
                || response.toLowerCase().contains("stacktrace"))) {
                logger.warn("AI provider returned error-like response: {}", response);
                return "Unable to process your request. Please try again later.";
            }
            return response;
        } catch (Exception e) {
            logger.error("Exception occurred while processing message", e);
            return "Unable to process your request. Please try again later.";
        }
    }

    @PostMapping("/analyze")
    public String analyzeCode(@RequestBody AnalyzeRequest request) {
        try {
            AiProvider provider = AiProvider.valueOf(request.provider());
            String response = multiAiService.analyzeCode(request.code(), request.context(), provider);
            if (response != null && (response.toLowerCase().contains("exception")
                    || response.toLowerCase().contains("error")
                    || response.toLowerCase().contains("stacktrace"))) {
                logger.warn("AI provider returned error-like response: {}", response);
                return "Unable to analyze code. Please try again later.";
            }
            // For security, avoid returning unchecked provider output directly.
            if (isSafeResponse(response)) {
                logger.info("AI provider response (safe): {}", response);
                return "Code analysis completed successfully.";
            } else {
                logger.warn("Provider response rejected: {}", response);
                return "Unable to analyze code. Please try again later.";
            }
        } catch (Exception e) {
            logger.error("Exception occurred while analyzing code", e);
            return "Unable to analyze code. Please try again later.";
        }
    }
    
    public record ChatRequest(String message, String provider) {}
    public record AnalyzeRequest(String code, String context, String provider) {}
    
    @PostMapping("/query-db")
    public String queryDatabase(@RequestBody String query) {
        try {
            return mcpCoordinator.queryDatabase(query);
        } catch (Exception e) {
            return "Unable to query database. Please try again later.";
        }
    }
    
    @GetMapping("/context/{type}")
    public String getContext(@PathVariable String type) {
        try {
            return mcpCoordinator.getSpecificContext(type);
        } catch (Exception e) {
            return "Unable to retrieve context information.";
        }
    }
    /**
     * Checks if the AI provider response is safe to return to the user.
     * Filters out common problematic patterns, and can be extended as needed.
     * @param response Provider response text
     * @return true if response is safe to return
     */
    private boolean isSafeResponse(String response) {
        if (response == null || response.trim().isEmpty()) {
            return false;
        }
        String r = response.toLowerCase();
        // Filter common error/info exposure patterns
        if (r.contains("exception") || r.contains("error") || r.contains("stacktrace")) {
            return false;
        }
        // Filter likely stacktrace lines
        if (r.matches(".*\\bat\\s+[a-zA-Z0-9_\\$.]+\\(.*\\).*")) {
            return false;
        }
        // Filter file paths, SQL, or other sensitive indicators (basic patterns, can be extended)
        if (r.contains(".java:") || r.contains(".py:") || r.contains("select ") || r.contains("from ")) {
            return false;
        }
        return true;
    }
}