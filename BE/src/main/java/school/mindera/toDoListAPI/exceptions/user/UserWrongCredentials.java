package school.mindera.toDoListAPI.exceptions.user;

public class UserWrongCredentials extends RuntimeException{
    public UserWrongCredentials(String message) {
        super(message);
    }
}
