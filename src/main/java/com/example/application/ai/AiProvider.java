package com.example.application.ai;

/**
 * Enumeration of available AI providers for the chat system.
 * Each provider has a display name and default model configuration.
 */
public enum AiProvider {
    CLAUDE("Claude (Anthropic)", "claude-3-5-sonnet-20241022"),
    AZURE_OPENAI("Azure OpenAI", "gpt-4");

    private final String displayName;
    private final String defaultModel;

    /**
     * Constructor for AI provider.
     * 
     * @param displayName human-readable name for the provider
     * @param defaultModel default model identifier for this provider
     */
    AiProvider(String displayName, String defaultModel) {
        this.displayName = displayName;
        this.defaultModel = defaultModel;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDefaultModel() {
        return defaultModel;
    }
}