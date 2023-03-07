package school.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTOGroup;
import school.mindera.toDoListAPI.model.DTONewGroup;
import school.mindera.toDoListAPI.service.GroupService;

import java.util.List;

@RestController
@RequestMapping("/todo/groups")
public class GroupController {
    GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/new-group")
    public DTOGroup createGroup(@RequestBody DTONewGroup newGroup){
        return null;
    }

    @GetMapping("/groups")
    public List<DTOGroup> getGroups(@PathVariable Integer userId){
        return null;
    }
}
