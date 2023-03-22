package school.mindera.toDoListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.CommentsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.exceptions.InvalidTaskException;
import school.mindera.toDoListAPI.model.Converter;
import school.mindera.toDoListAPI.model.DTOComment;
import school.mindera.toDoListAPI.repositories.CommentsRepository;
import school.mindera.toDoListAPI.repositories.TasksRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentsRepository commentsRepository;
    private final TasksRepository tasksRepository;

    public CommentService(CommentsRepository commentsRepository, TasksRepository tasksRepository) {
        this.commentsRepository = commentsRepository;
        this.tasksRepository = tasksRepository;
    }

    public ResponseEntity<List<DTOComment>> getComments(Integer taskId){
        Optional<TasksEntity> task = tasksRepository.findById(taskId);

        if(task.isEmpty()){
            throw new InvalidTaskException("Invalid Task");
        }

        List<CommentsEntity> comments = task.get().getComments();

        if(comments.isEmpty()){
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<DTOComment> commentDTO = comments
                .stream()
                .map(Converter::toDTOComment)
                .toList();

        return ResponseEntity.ok(commentDTO);
    }
}
