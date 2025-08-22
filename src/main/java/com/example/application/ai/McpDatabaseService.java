package com.example.application.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

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
                    Integer count = jdbcTemplate.queryForObject(
                        "SELECT COUNT(*) FROM " + tableName, Integer.class
                    );
                    stats.append("- ").append(tableName).append(": ").append(count).append(" records\n");
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
            // Security: Only allow SELECT queries
            if (!query.trim().toUpperCase().startsWith("SELECT")) {
                return "Only SELECT queries are allowed for security reasons";
            }
            
            List<Map<String, Object>> results = jdbcTemplate.queryForList(query);
            
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
            return "Query error: " + e.getMessage();
        }
    }
}