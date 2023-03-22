package school.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTOComment;
import school.mindera.toDoListAPI.model.DTONewComment;
import school.mindera.toDoListAPI.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/todo/comments")
public class CommentController {
    CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{taskId}")
    public List<DTOComment> getGroups(@PathVariable Integer taskId){
        return null;
    }

    @PostMapping("/new-comment")
    public DTOComment createComment(@RequestBody DTONewComment newComment){
        return null;
    }
}
