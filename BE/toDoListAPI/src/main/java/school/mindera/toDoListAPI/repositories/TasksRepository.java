package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;

import java.util.List;

public interface TasksRepository  extends JpaRepository<TasksEntity, Integer> {
    List<TasksEntity> findByUserId(UsersEntity userId);
}
