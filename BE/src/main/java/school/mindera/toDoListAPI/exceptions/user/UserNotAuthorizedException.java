package school.mindera.toDoListAPI.exceptions.user;

public class UserNotAuthorizedException extends RuntimeException{
    public UserNotAuthorizedException(String message) {
        super(message);
    }
}
