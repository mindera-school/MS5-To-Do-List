package shcool.mindera.toDoListAPI.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shcool.mindera.toDoListAPI.service.GroupsService;
import shcool.mindera.toDoListAPI.service.UserService;

@RestController
@RequestMapping("/todo/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
