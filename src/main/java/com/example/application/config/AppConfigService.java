package com.example.application.config;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@BrowserCallable
@AnonymousAllowed
public class AppConfigService {

    @Value("${app.name:Toolbox}")
    private String appName;

    public String getAppName() {
        return appName;
    }
}