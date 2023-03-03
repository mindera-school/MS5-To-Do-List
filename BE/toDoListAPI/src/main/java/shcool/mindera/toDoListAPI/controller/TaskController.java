package shcool.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import shcool.mindera.toDoListAPI.model.DTOGroup;
import shcool.mindera.toDoListAPI.model.DTONewComment;
import shcool.mindera.toDoListAPI.model.DTONewTask;
import shcool.mindera.toDoListAPI.model.DTOTask;
import shcool.mindera.toDoListAPI.service.TaskService;

import javax.swing.plaf.PanelUI;
import java.util.List;

@RestController
@RequestMapping("todo/tasks")
public class TaskController {
    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //tasks
    @GetMapping("/{userId}")
    public List<DTOTask> getTasks(@PathVariable Integer userId){
        return null;
    }
    @PostMapping("/new-task")
    public void createTask(@RequestBody DTONewTask newTask){
        //save Task
    }

    //comments
    @GetMapping("/comments")
    public List<DTOGroup> getGroups(@PathVariable Integer taskId){
        return null;
    }
    @PostMapping("/comments/new")
    public void createComment(@RequestBody DTONewComment newComment){
        //save comment
    }

}
