package com.taskmanager.controller;

import com.taskmanager.model.Task;
import com.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    @PostMapping
    public Task add(@RequestBody Task t) {
        return service.addTask(t.getDescription());
    }

    @PutMapping("/{id}")
    public Task toggle(@PathVariable Long id) {
        return service.toggleTask(id);
    }

    // ✅ New endpoint to extract all tasks
    @GetMapping("/extract")
    public List<Task> extractAll() {
        return service.extractAllTasks();
    }
}
