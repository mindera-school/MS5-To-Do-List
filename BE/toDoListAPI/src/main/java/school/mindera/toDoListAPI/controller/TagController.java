package school.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTONewTag;
import school.mindera.toDoListAPI.model.DTOTag;

import java.util.List;

@RestController
@RequestMapping("todo/tags")
public class TagController {
    @GetMapping("/task/{taskId}")
    public List<DTOTag> getTagsByTaskId(@PathVariable Integer taskId){
        return null;
    }
    @GetMapping("/user/{userId}")
    public List<DTOTag>getTasksByUserId(@PathVariable Integer userId){
        return null;
    }

    @PostMapping("new-tag")
    public void createTag(@RequestBody DTONewTag newTag){
        //saveTag
    }
}
