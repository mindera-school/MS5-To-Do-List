package school.mindera.toDoListAPI.exceptions.tags;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TagNotFoundException extends RuntimeException {
    public TagNotFoundException(String message) {super(message);}
}
