package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;

import java.util.List;
import java.util.Optional;

public interface TasksRepository  extends JpaRepository<TasksEntity, Integer> {
    Optional<List<TasksEntity>> findByUserId(UsersEntity userId);
    Optional<List<TasksEntity>> findByParentId(TasksEntity parentId);
}
