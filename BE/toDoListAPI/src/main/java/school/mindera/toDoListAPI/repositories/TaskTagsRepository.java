package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.TaskTagsEntity;

public interface TaskTagsRepository  extends JpaRepository<TaskTagsEntity, Integer> {
}
