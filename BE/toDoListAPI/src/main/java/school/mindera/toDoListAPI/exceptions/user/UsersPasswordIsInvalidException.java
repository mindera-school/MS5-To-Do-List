package school.mindera.toDoListAPI.exceptions.user;

public class UsersPasswordIsInvalidException extends RuntimeException{
    public UsersPasswordIsInvalidException(String message) {
        super(message);
    }
}