package school.mindera.toDoListAPI.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidTaskException extends RuntimeException{
    public InvalidTaskException(String message) {
        super(message);
    }
}
