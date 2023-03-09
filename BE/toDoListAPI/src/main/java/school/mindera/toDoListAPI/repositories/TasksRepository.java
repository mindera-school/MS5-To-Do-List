package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.TasksEntity;

public interface TasksRepository  extends JpaRepository<TasksEntity, Integer> {
}
