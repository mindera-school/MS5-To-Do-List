package shcool.mindera.toDoListAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shcool.mindera.toDoListAPI.entities.GroupsEntity;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

@Repository
public interface GroupsRepository extends JpaRepository<GroupsEntity, Integer> {

    List<GroupsEntity> findByName(String name);
    List<GroupsEntity> findByUserId(Integer userId);

}
