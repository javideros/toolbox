package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
@Service
public class McpDatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private DataSource dataSource;

    public String getDatabaseContext() {
        StringBuilder context = new StringBuilder();
        
        try {
            context.append("## Database Schema\n");
            context.append(getDatabaseSchema());
            
            context.append("\n## Table Statistics\n");
            context.append(getTableStatistics());
            
        } catch (Exception e) {
            context.append("Error reading database: ").append(e.getMessage());
        }
        
        return context.toString();
    }

    private String getDatabaseSchema() throws Exception {
        StringBuilder schema = new StringBuilder();
        
        DatabaseMetaData metaData = dataSource.getConnection().getMetaData();
        ResultSet tables = metaData.getTables(null, null, "%", new String[]{"TABLE"});
        
        while (tables.next()) {
            String tableName = tables.getString("TABLE_NAME");
            schema.append("### Table: ").append(tableName).append("\n");
            
            ResultSet columns = metaData.getColumns(null, null, tableName, "%");
            while (columns.next()) {
                String columnName = columns.getString("COLUMN_NAME");
                String dataType = columns.getString("TYPE_NAME");
                String nullable = columns.getString("IS_NULLABLE");
                schema.append("- ").append(columnName)
                      .append(" (").append(dataType).append(")")
                      .append(nullable.equals("YES") ? " NULL" : " NOT NULL")
                      .append("\n");
            }
            schema.append("\n");
        }
        
        return schema.toString();
    }

    private String getTableStatistics() {
        StringBuilder stats = new StringBuilder();
        
        try {
            List<String> tableNames = jdbcTemplate.queryForList(
                "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC'", 
                String.class
            );
            
            for (String tableName : tableNames) {
                try {
                    // Validate table name to prevent SQL injection
                    if (isValidTableName(tableName)) {
                        Integer count = jdbcTemplate.queryForObject(
                            "SELECT COUNT(*) FROM " + sanitizeTableName(tableName), Integer.class
                        );
                        stats.append("- ").append(tableName).append(": ").append(count).append(" records\n");
                    } else {
                        stats.append("- ").append(tableName).append(": Invalid table name\n");
                    }
                } catch (Exception e) {
                    stats.append("- ").append(tableName).append(": Error reading count\n");
                }
            }
        } catch (Exception e) {
            stats.append("Could not read table statistics\n");
        }
        
        return stats.toString();
    }

    public String queryDatabase(String query) {
        try {
            // Comprehensive security validation
            if (!isValidQuery(query)) {
                return "Only safe SELECT queries are allowed for security reasons";
            }
            
            // Additional pattern-based validation for extra security
            Pattern selectPattern = Pattern.compile("^SELECT \\* FROM ([a-zA-Z0-9_]+)$", Pattern.CASE_INSENSITIVE);
            Matcher matcher = selectPattern.matcher(query.trim());
            
            if (!matcher.matches()) {
                return "Only queries with format 'SELECT * FROM <table>' are allowed (no WHERE clauses for security)";
            }
            
            String tableName = matcher.group(1);
            
            // Whitelist table names against actual database tables
            List<String> allowedTables = jdbcTemplate.queryForList(
                "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC'",
                String.class
            );
            
            String validatedTableName = null;
            for (String allowedTable : allowedTables) {
                if (allowedTable.equalsIgnoreCase(tableName)) {
                    validatedTableName = allowedTable; // Use the exact table name from database
                    break;
                }
            }
                
            if (validatedTableName == null) {
                return "Table name is not recognized or allowed";
            }
            
            // Safe reconstruction with validated table name only
            String safeQuery = "SELECT * FROM " + validatedTableName;
            
            List<Map<String, Object>> results = jdbcTemplate.queryForList(safeQuery);
            
            if (results.isEmpty()) {
                return "Query returned no results";
            }
            
            StringBuilder result = new StringBuilder();
            result.append("Query Results (").append(results.size()).append(" rows):\n");
            
            // Limit to first 10 rows for readability
            int limit = Math.min(results.size(), 10);
            for (int i = 0; i < limit; i++) {
                result.append("Row ").append(i + 1).append(": ").append(results.get(i)).append("\n");
            }
            
            if (results.size() > 10) {
                result.append("... and ").append(results.size() - 10).append(" more rows");
            }
            
            return result.toString();
        } catch (Exception e) {
            return "Unable to execute query. Please check your syntax.";
        }
    }

    /**
     * Validates that the table name contains only safe characters.
     * 
     * @param tableName the table name to validate
     * @return true if the table name is safe to use
     */
    private boolean isValidTableName(String tableName) {
        return tableName != null && tableName.matches("^[a-zA-Z_][a-zA-Z0-9_]*$");
    }

    /**
     * Sanitizes table name by removing any potentially dangerous characters.
     * 
     * @param tableName the table name to sanitize
     * @return sanitized table name
     */
    private String sanitizeTableName(String tableName) {
        return tableName.replaceAll("[^a-zA-Z0-9_]", "");
    }

    /**
     * Validates that the query is safe to execute.
     * 
     * @param query the SQL query to validate
     * @return true if the query is safe
     */
    private boolean isValidQuery(String query) {
        if (query == null || query.trim().isEmpty()) {
            return false;
        }
        
        String upperQuery = query.trim().toUpperCase();
        
        // Only allow SELECT queries
        if (!upperQuery.startsWith("SELECT")) {
            return false;
        }
        
        // Block dangerous keywords
        String[] dangerousKeywords = {
            "DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", 
            "TRUNCATE", "EXEC", "EXECUTE", "--", "/*", "*/", ";"
        };
        
        for (String keyword : dangerousKeywords) {
            if (upperQuery.contains(keyword)) {
                return false;
            }
        }
        
        return true;
    }
}