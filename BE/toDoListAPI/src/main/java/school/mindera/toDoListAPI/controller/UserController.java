package school.mindera.toDoListAPI.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/todo/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<DTOLoggedUser> logIn(@RequestBody DTOLogin login) {
        return userService.logIn(login);
    }

    @PostMapping("/register")
    public ResponseEntity<DTOLoggedUser> register(@RequestBody DTORegister register) {
        DTOLoggedUser loggedUser = userService.register(register);
        return ResponseEntity.ok(loggedUser);
    }
    @PatchMapping("/{userId}/profile-image")
    public void changeProfileImage(@PathVariable Integer userId, @RequestBody DTOChangeImg changeImg){
        userService.changeUserProfileImg(userId, changeImg);
    }
}
