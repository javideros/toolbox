package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ClaudeAiService claudeAiService;

    @PostMapping("/message")
    public String sendMessage(@RequestBody String message) {
        return claudeAiService.chat(message);
    }

    @PostMapping("/analyze")
    public String analyzeCode(@RequestParam String code, @RequestParam String context) {
        return claudeAiService.analyzeCode(code, context);
    }
}