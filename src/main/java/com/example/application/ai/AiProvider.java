package com.example.application.ai;

public enum AiProvider {
    CLAUDE("Claude (Anthropic)", "claude-3-5-sonnet-20241022"),
    AZURE_OPENAI("Azure OpenAI", "gpt-4");

    private final String displayName;
    private final String defaultModel;

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