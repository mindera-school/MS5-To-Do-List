package school.mindera.toDoListAPI.exceptions.tasks;

public class TaskMissingDataException extends RuntimeException{
    public TaskMissingDataException(String message){super(message);}
}
