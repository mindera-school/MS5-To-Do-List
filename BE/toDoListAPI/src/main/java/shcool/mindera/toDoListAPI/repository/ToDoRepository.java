package shcool.mindera.toDoListAPI.repository;

import org.springframework.boot.jdbc.DatabaseDriver;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Repository
public class ToDoRepository {
    private Connection connection;
    private final String url = "jdbc:postgresql://localhost:5432/todo";

    public ToDoRepository() {
        try {
            this.connection = DriverManager.getConnection(this.url,"postgres","postgres");
        } catch (SQLException e) {
            System.out.println(e.getStackTrace());
        }
    }

}
