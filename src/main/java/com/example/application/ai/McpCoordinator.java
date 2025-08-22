package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class McpCoordinator {

    @Autowired
    private McpCodeAnalysisService codeService;
    
    @Autowired
    private McpDatabaseService databaseService;
    
    @Autowired
    private McpGitService gitService;

    public String getFullProjectContext() {
        StringBuilder fullContext = new StringBuilder();
        
        fullContext.append("# Complete Project Context\n\n");
        
        // Code analysis
        fullContext.append(codeService.getProjectContext()).append("\n");
        
        // Database schema
        fullContext.append(databaseService.getDatabaseContext()).append("\n");
        
        // Git information
        fullContext.append(gitService.getGitContext()).append("\n");
        
        return fullContext.toString();
    }

    public String queryDatabase(String query) {
        return databaseService.queryDatabase(query);
    }

    public String analyzeFile(String filePath) {
        return codeService.analyzeFile(filePath);
    }

    public String getSpecificContext(String contextType) {
        return switch (contextType.toLowerCase()) {
            case "code", "project" -> codeService.getProjectContext();
            case "database", "db", "schema" -> databaseService.getDatabaseContext();
            case "git", "repository", "repo" -> gitService.getGitContext();
            default -> "Available contexts: code, database, git";
        };
    }
}