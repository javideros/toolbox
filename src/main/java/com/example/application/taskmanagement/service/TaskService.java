package com.example.application.taskmanagement.service;

import com.example.application.taskmanagement.domain.Task;
import com.example.application.taskmanagement.domain.TaskRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;

class TaskCreationException extends RuntimeException {
    public TaskCreationException(String message) {
        super(message);
    }
}

@BrowserCallable
@PreAuthorize("isAuthenticated()")
// TODO: Remove workaround when https://github.com/vaadin/hilla/issues/3271 is resolved
public class TaskService {

    private final TaskRepository taskRepository;

    private final Clock clock;

    TaskService(TaskRepository taskRepository, Clock clock) {
        this.taskRepository = taskRepository;
        this.clock = clock;
    }

    @Transactional
    public void createTask(String description, @Nullable LocalDate dueDate) {
        if ("fail".equals(description)) {
            throw new TaskCreationException("Task creation failed for testing purposes");
        }
        var task = new Task();
        task.setDescription(description);
        task.setCreationDate(clock.instant());
        task.setDueDate(dueDate);
        taskRepository.saveAndFlush(task);
    }

    @Transactional(readOnly = true)
    public List<Task> list(Pageable pageable) {
        return taskRepository.findAllBy(pageable).getContent();
    }

}
