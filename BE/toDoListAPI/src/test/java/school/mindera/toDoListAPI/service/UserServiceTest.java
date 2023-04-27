package school.mindera.toDoListAPI.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.user.InvalidUserException;
import school.mindera.toDoListAPI.exceptions.user.UserAlreadyExistsException;
import school.mindera.toDoListAPI.exceptions.user.UserWrongCredentials;
import school.mindera.toDoListAPI.exceptions.user.UsersPasswordIsInvalidException;
import school.mindera.toDoListAPI.model.DTOEditUser;
import school.mindera.toDoListAPI.model.DTOLoggedUser;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {
    private final Integer USER_ID = 1;
    private final String USERNAME = "b";

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserService userService;

    @Test
    void editUserInfoNullRawPasswordThrowsUsersPasswordIsInvalidException() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("b")
                .build();

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.ofNullable(new UsersEntity().builder()
                .firstName("b")
                .build())
        );

        Assertions.assertThrows(UsersPasswordIsInvalidException.class, () -> userService.editUserInfo(USER_ID, dtoEditUser));

        verify(usersRepository).findById(eq(USER_ID));
    }

    @Test
    void editUserInfoEmptyRawPasswordThrowsUsersPasswordIsInvalidException() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("b")
                .currentPassword("")
                .build();

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.ofNullable(new UsersEntity().builder()
                .firstName("b")
                .build())
        );

        Assertions.assertThrows(UsersPasswordIsInvalidException.class, () -> userService.editUserInfo(USER_ID, dtoEditUser));

        verify(usersRepository).findById(eq(USER_ID));
    }

    @Test
    void editUserInfoUserNotExistsException() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("b")
                .build();

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.empty());

        Assertions.assertThrows(InvalidUserException.class, () -> userService.editUserInfo(USER_ID, dtoEditUser));

        verify(usersRepository).findById(eq(USER_ID));
    }

    @Test
    void editUserInfoUsernameIsAlreadyInUseException() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("b")
                .username("b")
                .currentPassword("b")
                .build();

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.ofNullable(new UsersEntity().builder()
                .firstName("b")
                .password("b")
                .build())
        );

        Mockito.when(usersRepository.existsByUsername(eq(USERNAME))).thenReturn(true);

        Assertions.assertThrows(UserAlreadyExistsException.class, () -> userService.editUserInfo(USER_ID, dtoEditUser));
        Mockito.when(passwordEncoder.matches(any(), any())).thenReturn(true);

        verify(usersRepository).findById(eq(USER_ID));
    }

    @Test
    void editUserInfoUserPasswordDontMatchException() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("b")
                .username("b")
                .currentPassword("b")
                .build();

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.ofNullable(new UsersEntity().builder()
                .firstName("b")
                .password("b")
                .build())
        );

        Mockito.when(passwordEncoder.matches(any(), any())).thenReturn(false);

        Assertions.assertThrows(UserWrongCredentials.class, () -> userService.editUserInfo(USER_ID, dtoEditUser));

        verify(usersRepository).findById(eq(USER_ID));
    }

    @Test
    void editUserInfoSuccess() {
        final DTOEditUser dtoEditUser = new DTOEditUser().builder()
                .firstName("firstName")
                .username("Username")
                .currentPassword("currentPassword")
                .build();

        String email = "email";
        String profileImage = "image";

        Mockito.when(usersRepository.findById(eq(USER_ID))).thenReturn(Optional.ofNullable(new UsersEntity().builder()
                .userId(USER_ID)
                .email(email)
                .profileImage(profileImage)
                .firstName("b")
                .username("b")
                .password("b")
                .build())
        );

        Mockito.when(passwordEncoder.matches(any(), any())).thenReturn(true);

        final ResponseEntity<DTOLoggedUser> dtoLoggedUser = userService.editUserInfo(USER_ID, dtoEditUser);

        assertNotNull(dtoLoggedUser);
        assertEquals(HttpStatus.OK, dtoLoggedUser.getStatusCode());
        Assertions.assertEquals(toDTOLogged(dtoEditUser, USER_ID, email, profileImage), dtoLoggedUser.getBody());

        verify(usersRepository).findById(eq(USER_ID));
    }

    public static DTOLoggedUser toDTOLogged(DTOEditUser user, Integer userId, String email, String profileImage) {
        DTOLoggedUser loggedUser = DTOLoggedUser
                .builder()
                .userId(userId)
                .username(user.getUsername())
                .email(email)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .profileImage(profileImage)
                .tasksPreviewsURL("http://localhost:8086/todo/tasks/preview/" + userId)
                .build();

        return loggedUser;
    }
}
