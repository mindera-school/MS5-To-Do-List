package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.GroupsEntity;

public interface GroupsRepository  extends JpaRepository<GroupsEntity, Integer> {
}
