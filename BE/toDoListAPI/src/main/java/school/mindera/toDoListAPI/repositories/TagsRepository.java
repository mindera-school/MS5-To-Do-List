package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.TagsEntity;

public interface TagsRepository  extends JpaRepository<TagsEntity, Integer> {
}
