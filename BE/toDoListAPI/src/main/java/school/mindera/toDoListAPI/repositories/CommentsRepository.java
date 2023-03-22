package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.CommentsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.util.Optional;
import java.util.List;

public interface CommentsRepository extends JpaRepository<CommentsEntity, Integer> {

    Optional<List<CommentsEntity>> getCommentsByTask(TasksEntity task);
}
