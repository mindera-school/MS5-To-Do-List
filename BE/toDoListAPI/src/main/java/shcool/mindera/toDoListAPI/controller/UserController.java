package shcool.mindera.toDoListAPI.controller;
import org.springframework.web.bind.annotation.*;
import shcool.mindera.toDoListAPI.model.*;
import shcool.mindera.toDoListAPI.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/todo/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public DTOLoggedUser logIn(@RequestBody DTOLogin login){
        return null;
    }

    @PostMapping("/register")
    public void register(@RequestBody DTORegister register){
        //save user
    }

    //tags
    @GetMapping("/tags")
    public List<DTOTag> getTags(){
        return null;
    }

    //groups
    @PostMapping("/new-groups")
    public void createGroup(@RequestBody DTONewGroup newGroup){
        //save group
    }
    @GetMapping("/groups")
    public List<DTOGroup> getGroups(@PathVariable Integer userId){
        return null;
    }

}
