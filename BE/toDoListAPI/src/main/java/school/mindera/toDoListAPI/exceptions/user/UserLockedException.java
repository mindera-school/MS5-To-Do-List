package school.mindera.toDoListAPI.exceptions.user;

public class UserLockedException  extends RuntimeException{
    public UserLockedException(String message) {
        super(message);
    }
}

