package school.mindera.toDoListAPI.controller;

import org.springframework.http.ResponseEntity;
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

    @GetMapping("/preview/{userId}")
    public ResponseEntity<List<DTOTaskPreview>> getTasksPreview(@PathVariable Integer userId){
        return taskService.getTaskPreview(userId);
    }

    @GetMapping("/{taskId}/{userId}")
    public ResponseEntity<DTOTaskDetails> getTaskDetails(@PathVariable Integer taskId, @PathVariable Integer userId){
        return taskService.getTaskDetails(taskId, userId);
    }

    @GetMapping("/sub-tasks/{parentId}")
    public ResponseEntity<List<DTOTaskPreview>> getSubTasks(@PathVariable Integer parentId){
        return taskService.getSubTasks(parentId);
    }

    @PostMapping()
    public ResponseEntity<DTOTaskPreview> createTask(@RequestBody DTONewTask newTask){
        return taskService.addTask(newTask);
    }

    @PatchMapping()
    public ResponseEntity<DTOUpdateTask> updateTask(@RequestBody DTOUpdateTask updatedTask){
        return taskService.updateTask(updatedTask);
    }
}
