package school.mindera.toDoListAPI.controller;

import com.fasterxml.jackson.core.JsonParser;
import io.swagger.v3.core.util.Json;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.service.TaskService;
import school.mindera.toDoListAPI.model.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/todo/tasks")
public class TaskController {
    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Must be (" /users/{userId} ")
    @GetMapping("/preview/{userId}")
    public ResponseEntity<List<DTOTaskPreview>> getTasksPreview(@PathVariable Integer userId){
        return taskService.getTaskPreview(userId);
    }

    // Must be (" /tasks/{taskId}/users/{userId} ")
    @GetMapping("/v1/{taskId}/{userId}")
    public ResponseEntity<DTOTaskDetails> getTaskDetails(@PathVariable Integer taskId, @PathVariable Integer userId){
        return taskService.getTaskDetails(taskId, userId);
    }

    // Must be (" /tasks/{taskId} ")
    @GetMapping("/v1/{parentId}")
    public ResponseEntity<List<DTOTaskPreview>> getSubTasks(@PathVariable Integer parentId){
        return taskService.getSubTasks(parentId);
    }

    // Must be ("   ")
    @PostMapping("/v1")
    public ResponseEntity<DTOTaskPreview> createTask(@RequestBody DTONewTask newTask){
        return taskService.addTask(newTask);
    }

    // Must be (" /tasks/{taskId} ")
    @PatchMapping("/v1/{taskId}")
    public ResponseEntity<DTOUpdateTask> updateTask(@PathVariable Integer taskId, @RequestBody DTOUpdateTask updatedTask){
        return taskService.updateTask(taskId, updatedTask);
    }

    // Could be made in previous endpoint
    @PatchMapping("/v1/delete/{taskId}")
    public ResponseEntity<Object> disableTask(@PathVariable Integer taskId){
        return taskService.disabledTask(taskId);
    }


    // Must be (" /tasks ")
    @PatchMapping("/v1/change-position")
    public ResponseEntity<List<DTOUpdatePosition>> updateTaskPosition(@RequestBody List<DTOUpdatePosition> updatedTasks){
        return taskService.updatePosition(updatedTasks);
    }
}