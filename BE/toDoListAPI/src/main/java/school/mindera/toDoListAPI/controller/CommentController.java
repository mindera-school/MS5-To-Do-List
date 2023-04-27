package school.mindera.toDoListAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // Must be (" /tasks/{taskId} ")
    @GetMapping("/v1/{taskId}")
    public ResponseEntity<List<DTOComment>> getTaskComments(@PathVariable Integer taskId){
        return commentService.getComments(taskId);
    }

    // Must be ("   ")
    @PostMapping("/v1")
    public ResponseEntity<DTOComment> createComment(@RequestBody DTONewComment newComment){
        return commentService.createComment(newComment);
    }
}