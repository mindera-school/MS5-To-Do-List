package school.mindera.toDoListAPI.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.service.TaskService;
import school.mindera.toDoListAPI.model.*;
import java.util.List;

@RestController
@RequestMapping("/todo/tasks")
public class TaskController {
    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{userId}")
    public List<DTOTask> getTasks(@PathVariable Integer userId){
        return null;
    }

    @PostMapping("/new-task")
    public DTOTask createTask(@RequestBody DTONewTask newTask){
        return null;
    }
}
