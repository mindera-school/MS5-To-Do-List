package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TaskTagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.util.List;

public interface TaskTagsRepository  extends JpaRepository<TaskTagsEntity, Integer> {
}
