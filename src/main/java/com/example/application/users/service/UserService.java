package com.example.application.users.service;

import com.example.application.users.domain.User;
import com.example.application.users.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@BrowserCallable
@AnonymousAllowed
public class UserService extends CrudRepositoryService<User, Long, UserRepository> {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    protected UserRepository getRepository() {
        return repository;
    }

    @Transactional(readOnly = true)
    public java.util.Optional<com.example.application.users.domain.User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Transactional
    public long count() {
        return repository.count();
    }
}