package com.taskmanager.controller;
import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskRepository repo;

    public TaskController(TaskRepository repo) { this.repo = repo; }

    @GetMapping public List<Task> getAll() { return repo.findAll(); }
    @PostMapping public Task add(@RequestBody Task t) {
        return repo.save(new Task(t.getDescription()));
    }
    @PutMapping("/{id}") public Task toggle(@PathVariable Long id) {
        Task t = repo.findById(id).orElseThrow();
        t.setCompleted(!t.isCompleted());
        return repo.save(t);
    }
}
