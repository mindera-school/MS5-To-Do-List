package school.mindera.toDoListAPI.controller;

import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.DTOGroup;
import school.mindera.toDoListAPI.model.DTONewGroup;

import java.util.List;

@RestController
@RequestMapping("todo/groups")
public class GroupController {
    @PostMapping("/new-group")
    public void createGroup(@RequestBody DTONewGroup newGroup){
        //save group
    }
    @GetMapping("/groups")
    public List<DTOGroup> getGroups(@PathVariable Integer userId){
        return null;
    }
}
