package shcool.mindera.toDoListAPI.service;

import org.springframework.stereotype.Service;
import shcool.mindera.toDoListAPI.repository.ToDoRepository;

@Service
public class UserService {
    private final ToDoRepository repository;

    public UserService(ToDoRepository repository) {
        this.repository = repository;
    }
}
