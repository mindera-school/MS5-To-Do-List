package school.mindera.toDoListAPI.exceptions.tasks;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(String message){super(message);}
}
