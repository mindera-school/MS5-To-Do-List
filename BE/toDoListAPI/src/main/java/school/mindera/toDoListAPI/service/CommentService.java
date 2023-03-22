package school.mindera.toDoListAPI.service;

import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.repositories.CommentsRepository;
import school.mindera.toDoListAPI.repositories.TasksRepository;

@Service
public class CommentService {
    private CommentsRepository commentsRepository;
    private TasksRepository tasksRepository;

    public CommentService(CommentsRepository commentsRepository, TasksRepository tasksRepository) {
        this.commentsRepository = commentsRepository;
        this.tasksRepository = tasksRepository;
    }


}
