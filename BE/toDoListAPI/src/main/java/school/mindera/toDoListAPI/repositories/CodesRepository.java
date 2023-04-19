package school.mindera.toDoListAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import school.mindera.toDoListAPI.entities.CodesEntity;

public interface CodesRepository  extends JpaRepository<CodesEntity, Integer> {

}
