package school.mindera.toDoListAPI.controller;

import org.springframework.http.MediaType;
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
        return userService.register(register);
    }

    @PatchMapping("/{userId}/profile-image")
    public void changeProfileImage(@PathVariable Integer userId, @RequestBody DTOChangeImg changeImg) {
        userService.changeUserProfileImg(userId, changeImg);
    }

    @PatchMapping("/forgot_password")
    public void forgotPassword(@RequestBody DTOForgotPassword newPassword) {
        // Nice to Have
    }
<<<<<<< Updated upstream
=======

    @PostMapping("forgot-password/{userId}")
    public void forgotPassword(@PathVariable Integer userId){

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<DTOLoggedUser> editUser(@PathVariable Integer userId, @RequestBody DTOEditUser newInfo){
        return userService.editUserInfo(userId, newInfo);
    }
>>>>>>> Stashed changes
}
