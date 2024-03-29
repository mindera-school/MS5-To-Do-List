package school.mindera.toDoListAPI.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTONewTag;
import school.mindera.toDoListAPI.model.DTOTag;
import school.mindera.toDoListAPI.service.TagService;

import java.util.List;

@RestController
@RequestMapping("/todo/tags")
public class TagController {
    TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    // Must be (" /tasks/{taskId} ")
    @GetMapping("/v1/task/{taskId}")
    public ResponseEntity<List<DTOTag>> getTagsByTaskId(@PathVariable Integer taskId){
        return tagService.getTaskTags(taskId);
    }

    // Must be (" /users/{userId} ")
    @GetMapping("/v1/users/{userId}")
    public ResponseEntity<List<DTOTag>> getTasksByUserId(@PathVariable Integer userId){
        return tagService.getUserTags(userId);
    }

    // Must be ("   ")
    @PostMapping("/v1")
    public ResponseEntity<List<DTOTag>> createTag(@RequestBody List<DTONewTag> newTag){
        return tagService.createTag(newTag);
    }

    // Must be (" /tasks/{taskId}/users/{userId} ")
    @DeleteMapping("/{taskId}/{tagId}")
    public void removeTag(@PathVariable Integer taskId,@PathVariable Integer tagId){
        tagService.removeTag(taskId,tagId);
    }

    // Must be (" /tasks/{taskId} ")
    @PutMapping("/v1/{taskId}")
    public ResponseEntity<List<DTOTag>> updateTags(@PathVariable Integer taskId, @RequestBody List<DTONewTag> newTags){
        return tagService.updateTags(taskId, newTags);
    }
}