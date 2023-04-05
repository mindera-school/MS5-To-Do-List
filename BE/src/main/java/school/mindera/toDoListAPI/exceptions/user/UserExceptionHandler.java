package school.mindera.toDoListAPI.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import school.mindera.toDoListAPI.exceptions.ErrorResponse;

import java.util.Date;

@ControllerAdvice
public class UserExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {InvalidUserException.class})
    public ResponseEntity handleInvalidUser(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(13)
                .type("user")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(400));
    }

    @ExceptionHandler(value = {UserAlreadyExistsException.class})
    public ResponseEntity handleUserAlreadyExists(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(11)
                .type("user")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(409));
    }

    @ExceptionHandler(value = {UserWrongCredentials.class})
    public ResponseEntity handleUserWrongCredentials(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(10)
                .type("user")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(401));
    }

    @ExceptionHandler(value = {UserNotAuthorizedException.class})
    public ResponseEntity handleUserNotAuthorized(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(12)
                .type("user")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(401));
    }
}
