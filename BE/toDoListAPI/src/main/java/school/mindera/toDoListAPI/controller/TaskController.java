package school.mindera.toDoListAPI.controller;

import com.fasterxml.jackson.core.JsonParser;
import io.swagger.v3.core.util.Json;
import org.springframework.boot.json.JacksonJsonParser;
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

    @GetMapping("/v1/{taskId}/{userId}")
    public ResponseEntity<DTOTaskDetails> getTaskDetails(@PathVariable Integer taskId, @PathVariable Integer userId){
        return taskService.getTaskDetails(taskId, userId);
    }

    @GetMapping("/v1/{parentId}")
    public ResponseEntity<List<DTOTaskPreview>> getSubTasks(@PathVariable Integer parentId){
        return taskService.getSubTasks(parentId);
    }

    @PostMapping()
    public ResponseEntity<DTOTaskPreview> createTask(@RequestBody DTONewTask newTask){
        return taskService.addTask(newTask);
    }

    @PatchMapping("/v1/{taskId}")
    public ResponseEntity<DTOUpdateTask> updateTask(@PathVariable Integer taskId, @RequestBody DTOUpdateTask updatedTask){
        return taskService.updateTask(updatedTask);
    }

    @PatchMapping("/v1/change-position/{userId}")
    public ResponseEntity<List<DTOUpdatePosition>> updateTask(@PathVariable Integer userId, @RequestBody List<DTOUpdatePosition> updatedTasks){
        return taskService.updatePosition(updatedTasks);
    }
}
