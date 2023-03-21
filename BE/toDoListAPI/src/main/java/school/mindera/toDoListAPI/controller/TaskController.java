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

    @PostMapping("/new-task")
    public ResponseEntity<DTOTaskPreview> createTask(@RequestBody DTONewTask newTask){
        return taskService.addTask(newTask);
    }

    @PatchMapping("/done-state/{taskId}")
    public void doneTask(@PathVariable Integer taskId){
        taskService.done(taskId);
    }

    @PatchMapping("/favorite-state/{taskId}")
    public void favoriteTask(@PathVariable Integer taskId){
        taskService.favorite(taskId);
    }

    @PatchMapping("/delete/{taskId}")
    public void disableTask(@PathVariable Integer taskId){
        taskService.disable(taskId);
    }

    @PatchMapping("/change-position/{userId}")
    public void changeTaskPosition(@PathVariable Integer userId, @RequestBody DTOChangePosition changePosition ){
        taskService.changePosition(userId,changePosition);
    }

    @PatchMapping("change-parent/{taskId}")
    public void changeTaskParent(@PathVariable Integer taskId, @RequestBody DTOChangeParent parent){
        taskService.changeParent(taskId,parent.getParentId());
    }

    @PatchMapping("/edit-task/{taskId}")
    public void editTask(@PathVariable Integer taskId, @RequestBody DTOEditTask editTask){
        taskService.editTask(editTask,taskId);
    }
}
