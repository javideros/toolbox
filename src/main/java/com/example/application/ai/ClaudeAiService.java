package com.example.application.ai;

import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaudeAiService {

    private final AnthropicChatModel chatModel;
    private final McpCoordinator mcpCoordinator;

    public ClaudeAiService(AnthropicChatModel chatModel, McpCoordinator mcpCoordinator) {
        this.chatModel = chatModel;
        this.mcpCoordinator = mcpCoordinator;
    }

    public String chat(String userMessage) {
        try {
            String projectContext = mcpCoordinator.getFullProjectContext();
            
            SystemMessage systemMessage = new SystemMessage(
                "You are an AI assistant for a Vaadin + shadcn/ui framework. " +
                "Help with code analysis, suggestions, and framework guidance.\n\n" +
                "Project Context:\n" + projectContext
            );

            UserMessage userMsg = new UserMessage(userMessage);
            Prompt prompt = new Prompt(List.of(systemMessage, userMsg));
            ChatResponse response = chatModel.call(prompt);
            
            return response.getResult().getOutput().getContent();
        } catch (Exception e) {
            if (e.getMessage().contains("x-api-key header is required")) {
                return "⚠️ **Claude AI Not Available**\n\n" +
                       "To use Claude AI chat, you need to:\n" +
                       "1. Get an API key from https://console.anthropic.com\n" +
                       "2. Set environment variable: `export ANTHROPIC_API_KEY=your_key_here`\n" +
                       "3. Restart the application\n\n" +
                       "**Meanwhile, here's the project context:**\n\n" +
                       mcpCoordinator.getFullProjectContext();
            }
            return "Error: " + e.getMessage();
        }
    }

    public String analyzeCode(String code, String context) {
        String analysisPrompt = String.format(
            "Analyze this code:\n\nContext: %s\n\nCode:\n```\n%s\n```\n\n" +
            "Provide: quality assessment, improvements, framework suggestions",
            context, code
        );
        return chat(analysisPrompt);
    }
}