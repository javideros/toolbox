package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for AI chat functionality.
 * Provides endpoints for sending messages to AI providers and querying project context.
 */
@RestController
@RequestMapping("/api/chat")
public class ChatController {

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
            return multiAiService.chat(request.message(), provider);
        } catch (Exception e) {
            return "Unable to process your request. Please try again later.";
        }
    }

    @PostMapping("/analyze")
    public String analyzeCode(@RequestBody AnalyzeRequest request) {
        try {
            AiProvider provider = AiProvider.valueOf(request.provider());
            return multiAiService.analyzeCode(request.code(), request.context(), provider);
        } catch (Exception e) {
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
}