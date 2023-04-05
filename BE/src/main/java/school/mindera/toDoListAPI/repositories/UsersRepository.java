package school.mindera.toDoListAPI.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import school.mindera.toDoListAPI.entities.UsersEntity;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<UsersEntity, Integer> {

    Optional<UsersEntity> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
