package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TaskTagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.util.List;

public interface TaskTagsRepository  extends JpaRepository<TaskTagsEntity, Integer> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM TaskTagsEntity t WHERE t.task.taskId = :taskId AND t.tag.tagId = :tagId")
    public void deleteByTaskAndTagId(@Param("taskId") Integer taskId,@Param("tagId") Integer tagId);
}
