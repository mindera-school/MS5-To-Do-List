package school.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTOGroup;
import school.mindera.toDoListAPI.model.DTONewComment;
import java.util.List;

@RestController
@RequestMapping("todo/comments")
public class CommentController {

    @GetMapping("/{taskId}")
    public List<DTOGroup> getGroups(@PathVariable Integer taskId){
        return null;
    }
    @PostMapping("/new-comment")
    public void createComment(@RequestBody DTONewComment newComment){
        //save comment
    }
}
