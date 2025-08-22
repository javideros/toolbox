package com.example.application.ai;

import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.ai.azure.openai.AzureOpenAiChatModel;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MultiAiService {

    @Autowired(required = false)
    private AnthropicChatModel anthropicChatModel;
    
    @Autowired(required = false)
    private AzureOpenAiChatModel azureChatModel;
    
    @Autowired
    private McpCoordinator mcpCoordinator;

    public String chat(String userMessage, AiProvider provider) {
        try {
            ChatModel chatModel = getChatModel(provider);
            if (chatModel == null) {
                return getProviderNotAvailableMessage(provider);
            }

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
            return getErrorMessage(provider, e);
        }
    }

    private ChatModel getChatModel(AiProvider provider) {
        return switch (provider) {
            case CLAUDE -> anthropicChatModel;
            case AZURE_OPENAI -> azureChatModel;
        };
    }

    private String getProviderNotAvailableMessage(AiProvider provider) {
        return switch (provider) {
            case CLAUDE -> "⚠️ **Claude AI Not Available**\n\n" +
                          "To use Claude AI:\n" +
                          "1. Get API key from https://console.anthropic.com\n" +
                          "2. Set: `export ANTHROPIC_API_KEY=your_key_here`\n" +
                          "3. Restart application\n\n" +
                          "**Project Context:**\n\n" + mcpCoordinator.getFullProjectContext();
            case AZURE_OPENAI -> "⚠️ **Azure OpenAI Not Available**\n\n" +
                               "To use Azure OpenAI:\n" +
                               "1. Set: `export SPRING_AI_AZURE_OPENAI_API_KEY=your_key`\n" +
                               "2. Set: `export SPRING_AI_AZURE_OPENAI_ENDPOINT=your_endpoint`\n" +
                               "3. Restart application\n\n" +
                               "**Project Context:**\n\n" + mcpCoordinator.getFullProjectContext();
        };
    }

    private String getErrorMessage(AiProvider provider, Exception e) {
        if (e.getMessage().contains("api-key") || e.getMessage().contains("authentication")) {
            return getProviderNotAvailableMessage(provider);
        }
        return "Error with " + provider.getDisplayName() + ": " + e.getMessage();
    }

    public String analyzeCode(String code, String context, AiProvider provider) {
        String analysisPrompt = String.format(
            "Analyze this code:\n\nContext: %s\n\nCode:\n```\n%s\n```\n\n" +
            "Provide: quality assessment, improvements, framework suggestions",
            context, code
        );
        return chat(analysisPrompt, provider);
    }
}