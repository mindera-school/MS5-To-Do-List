package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.CommentsEntity;

public interface CommentsRepository extends JpaRepository<CommentsEntity, Integer> {
}
