package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TagsRepository  extends JpaRepository<TagsEntity, Integer> {
    @Query("SELECT t FROM TagsEntity t WHERE t.userId.userId = :userId")
    public List<TagsEntity> findTagsByUserId(@Param("userId") Integer userId);

    @Query("SELECT t FROM TagsEntity t WHERE t.userId.userId = :userId AND t.name = :name")
    public Optional<TagsEntity> findByNameAndUserId(@Param("name") String name,@Param("userId") Integer userId);
}
