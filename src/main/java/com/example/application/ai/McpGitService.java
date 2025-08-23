package com.example.application.ai;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class McpGitService {

    private final String projectRoot = System.getProperty("user.dir");

    public String getGitContext() {
        StringBuilder context = new StringBuilder();
        
        try {
            context.append("## Git Information\n");
            context.append(getGitStatus());
            context.append("\n## Recent Commits\n");
            context.append(getRecentCommits());
            context.append("\n## Branch Info\n");
            context.append(getBranchInfo());
            
        } catch (Exception e) {
            context.append("Error reading git info: ").append(e.getMessage());
        }
        
        return context.toString();
    }

    private String getGitStatus() {
        return executeGitCommand("git status --porcelain");
    }

    private String getRecentCommits() {
        return executeGitCommand("git log --oneline -5");
    }

    private String getBranchInfo() {
        return executeGitCommand("git branch -v");
    }

    private String executeGitCommand(String command) {
        try {
            ProcessBuilder pb = new ProcessBuilder(command.split(" "));
            pb.directory(new java.io.File(projectRoot));
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            process.waitFor();
            return output.toString();
        } catch (Exception e) {
            return "Git command failed: " + e.getMessage();
        }
    }
}