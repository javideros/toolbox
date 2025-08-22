package com.example.application.ai;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class McpCodeAnalysisService {

    private final String projectRoot = System.getProperty("user.dir");

    public String getProjectContext() {
        StringBuilder context = new StringBuilder();
        
        try {
            // Add project structure
            context.append("## Project Structure\n");
            context.append(getProjectStructure());
            
            // Add key configuration files
            context.append("\n## Key Files\n");
            context.append(getKeyFileContents());
            
            // Add recent changes summary
            context.append("\n## Framework Info\n");
            context.append("Vaadin 24 + shadcn/ui + Spring Boot 3 + React + TypeScript\n");
            
        } catch (Exception e) {
            context.append("Error reading project context: ").append(e.getMessage());
        }
        
        return context.toString();
    }

    private String getProjectStructure() throws IOException {
        StringBuilder structure = new StringBuilder();
        Path srcPath = Paths.get(projectRoot, "src");
        
        if (Files.exists(srcPath)) {
            try (Stream<Path> paths = Files.walk(srcPath, 3)) {
                paths.filter(Files::isDirectory)
                     .forEach(path -> {
                         String relativePath = srcPath.relativize(path).toString();
                         if (!relativePath.isEmpty()) {
                             structure.append("- ").append(relativePath).append("/\n");
                         }
                     });
            }
        }
        
        return structure.toString();
    }

    private String getKeyFileContents() {
        StringBuilder content = new StringBuilder();
        
        // Add package.json info
        try {
            Path packageJson = Paths.get(projectRoot, "package.json");
            if (Files.exists(packageJson)) {
                content.append("### package.json dependencies:\n");
                String packageContent = Files.readString(packageJson);
                content.append(extractDependencies(packageContent)).append("\n");
            }
        } catch (IOException e) {
            content.append("Could not read package.json\n");
        }

        // Add pom.xml info
        try {
            Path pomXml = Paths.get(projectRoot, "pom.xml");
            if (Files.exists(pomXml)) {
                content.append("### Maven dependencies:\n");
                content.append("Spring Boot 3, Vaadin 24, Spring AI, H2/PostgreSQL\n");
            }
        } catch (Exception e) {
            content.append("Could not read pom.xml\n");
        }
        
        return content.toString();
    }

    private String extractDependencies(String packageJson) {
        // Simple extraction of key dependencies
        StringBuilder deps = new StringBuilder();
        if (packageJson.contains("@vaadin")) deps.append("- Vaadin components\n");
        if (packageJson.contains("react")) deps.append("- React\n");
        if (packageJson.contains("typescript")) deps.append("- TypeScript\n");
        if (packageJson.contains("tailwindcss")) deps.append("- Tailwind CSS\n");
        if (packageJson.contains("shadcn")) deps.append("- shadcn/ui\n");
        return deps.toString();
    }

    public String analyzeFile(String filePath) {
        try {
            Path path = Paths.get(projectRoot, filePath);
            if (Files.exists(path) && Files.isRegularFile(path)) {
                String content = Files.readString(path);
                return String.format("File: %s\n\nContent:\n%s", filePath, content);
            }
            return "File not found: " + filePath;
        } catch (IOException e) {
            return "Error reading file: " + e.getMessage();
        }
    }
}