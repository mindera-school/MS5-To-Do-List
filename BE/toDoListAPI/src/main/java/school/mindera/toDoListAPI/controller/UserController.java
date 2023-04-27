package school.mindera.toDoListAPI.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.service.emailhandler.EmailSenderService;
import school.mindera.toDoListAPI.service.UserService;

@RestController
@RequestMapping("/todo/users")
public class UserController {
    private final UserService userService;
    private final EmailSenderService emailSenderService;

    public UserController(UserService userService, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.emailSenderService = emailSenderService;
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

    @PatchMapping("/reset-password")
    public ResponseEntity<DTOLoggedUser> forgotPassword(@RequestBody DTOChangePassword dtoChangePassword) {
        return userService.changePassword(dtoChangePassword);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<Object> forgotPassword(@RequestBody DTOChangePasswordEmail accountEmail) {
        return emailSenderService.sendEmail(accountEmail);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<DTOLoggedUser> editUser(@PathVariable Integer userId, @RequestBody DTOEditUser newInfo){
        return userService.editUserInfo(userId, newInfo);
    }
}
