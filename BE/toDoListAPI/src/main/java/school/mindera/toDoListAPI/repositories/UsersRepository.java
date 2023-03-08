package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.UsersEntity;

public interface UsersRepository extends JpaRepository<UsersEntity, Integer> {
}
