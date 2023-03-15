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

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<DTOTag>> getTagsByTaskId(@PathVariable Integer taskId){
        return tagService.getTaskTags(taskId);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<DTOTag>> getTasksByUserId(@PathVariable Integer userId){
        return tagService.getUserTags(userId);
    }

    @PostMapping("new-tag")
    public ResponseEntity<DTOTag> createTag(@RequestBody DTONewTag newTag){
        return tagService.createTag(newTag);
    }
    @DeleteMapping("/{taskId}/{tagId}")
    public void removeTag(@PathVariable Integer taskId,@PathVariable Integer tagId){
        tagService.removeTag(taskId,tagId);
    }
}
