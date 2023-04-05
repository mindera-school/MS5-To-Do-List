package school.mindera.toDoListAPI.exceptions.comments;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import school.mindera.toDoListAPI.exceptions.ErrorResponse;

import java.util.Date;

@ControllerAdvice
public class CommentsExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {CommentNotFoundException.class})
    public ResponseEntity handleCommentNotFound(RuntimeException e){
        ErrorResponse response = ErrorResponse.builder()
                .code(40)
                .type("comment")
                .timestamp(new Date())
                .message(e.getMessage())
                .build();

        return new ResponseEntity(response, HttpStatus.valueOf(404));
    }
}
