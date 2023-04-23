package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.CodesEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;

import java.util.Optional;

public interface CodesRepository  extends JpaRepository<CodesEntity, Integer> {
    Optional<CodesEntity> findCodesEntityByCodeIdCode(String code);
}
