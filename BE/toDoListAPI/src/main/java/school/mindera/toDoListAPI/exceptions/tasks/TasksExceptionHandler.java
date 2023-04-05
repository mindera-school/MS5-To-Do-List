package school.mindera.toDoListAPI.exceptions.tasks;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import school.mindera.toDoListAPI.exceptions.ErrorResponse;

import java.util.Date;

@ControllerAdvice
public class TasksExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {TaskNotFoundException.class})
    public ResponseEntity handleTaskNotFoundException(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(20)
                .type("task")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(404));
    }
}
