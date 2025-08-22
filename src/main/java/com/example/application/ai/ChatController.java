package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MultiAiService multiAiService;
    
    @Autowired
    private McpCoordinator mcpCoordinator;

    @PostMapping("/message")
    public String sendMessage(@RequestBody ChatRequest request) {
        AiProvider provider = AiProvider.valueOf(request.provider());
        return multiAiService.chat(request.message(), provider);
    }

    @PostMapping("/analyze")
    public String analyzeCode(@RequestBody AnalyzeRequest request) {
        AiProvider provider = AiProvider.valueOf(request.provider());
        return multiAiService.analyzeCode(request.code(), request.context(), provider);
    }
    
    public record ChatRequest(String message, String provider) {}
    public record AnalyzeRequest(String code, String context, String provider) {}
    
    @PostMapping("/query-db")
    public String queryDatabase(@RequestBody String query) {
        return mcpCoordinator.queryDatabase(query);
    }
    
    @GetMapping("/context/{type}")
    public String getContext(@PathVariable String type) {
        return mcpCoordinator.getSpecificContext(type);
    }
}