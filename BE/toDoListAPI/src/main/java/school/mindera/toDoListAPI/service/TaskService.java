package school.mindera.toDoListAPI.service;

import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.repositories.TasksRepository;

@Service
public class TaskService {
    private final TasksRepository tasksRepository;

    public TaskService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
}
