package school.mindera.toDoListAPI.exceptions.tags;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class TagAlreadyInUseException extends RuntimeException{
    public TagAlreadyInUseException(String message){super(message);}
}
