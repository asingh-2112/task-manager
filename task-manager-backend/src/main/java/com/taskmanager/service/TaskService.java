package com.taskmanager.service;

import com.taskmanager.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final List<Task> taskList = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public List<Task> getAllTasks() {
        return taskList;
    }

    public Task addTask(String description) {
        Task task = new Task(description);
        task.setId(idCounter.getAndIncrement());
        taskList.add(task);
        return task;
    }

    public Task toggleTask(Long id) {
        for (Task task : taskList) {
            if (task.getId().equals(id)) {
                task.setCompleted(!task.isCompleted());
                return task;
            }
        }
        throw new RuntimeException("Task not found with ID: " + id);
    }

    // ✅ New function to extract all tasks
    public List<Task> extractAllTasks() {
        // Create a copy to avoid external modifications
        return new ArrayList<>(taskList);
    }
}
