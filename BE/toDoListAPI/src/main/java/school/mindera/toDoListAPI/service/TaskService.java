package school.mindera.toDoListAPI.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.InvalidTaskException;
import school.mindera.toDoListAPI.exceptions.user.InvalidUserException;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.repositories.TasksRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.isNull;

@Service
public class TaskService {
    private final TasksRepository tasksRepository;
    private final UsersRepository usersRepository;

    public TaskService(TasksRepository tasksRepository, UsersRepository usersRepository) {
        this.tasksRepository = tasksRepository;
        this.usersRepository = usersRepository;
    }

    public ResponseEntity<List<DTOTaskPreview>> getTaskPreview(Integer userId) {
        Optional<UsersEntity> user = usersRepository.findById(userId);

        if (user.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }

        List<DTOTaskPreview> tasks = user.get().getTasks()
                .stream()
                .map(Converter::toDTOTaskPreview)
                .filter(task -> isNull(task.getParentId()))
                .toList();

        return ResponseEntity.ok(tasks);
    }

    public ResponseEntity<DTOTaskDetails> getTaskDetails(Integer taskId, Integer userId) {
        Optional<UsersEntity> user = usersRepository.findById(userId);
        Optional<TasksEntity> task = tasksRepository.findById(taskId);

        if (user.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }

        if (task.isEmpty()) {
            throw new InvalidTaskException("Invalid Task");
        }

        List<TasksEntity> tasks = user.get().getTasks();

        if (!tasks.contains(task.get())) {
            throw new InvalidTaskException("Invalid Task");
        }

        return ResponseEntity.ok(Converter.toDTOTaskDetails(task.get()));
    }

    public ResponseEntity<List<DTOTaskPreview>> getSubTasks(Integer parentId) {
        Optional<TasksEntity> task = tasksRepository.findById(parentId);

        if (task.isEmpty()) {
            throw new InvalidTaskException("Invalid Task");
        }

        Optional<List<TasksEntity>> subTasks = tasksRepository.findByParentId(task.get());

        if (subTasks.isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<DTOTaskPreview> dtos = new ArrayList<>();

        subTasks.get().forEach(subTask -> {
            DTOTaskPreview dto = Converter.toDTOTaskPreview(subTask);
            dtos.add(dto);
        });

        return ResponseEntity.ok(dtos);
    }

    public ResponseEntity<DTOTaskPreview> addTask(DTONewTask newTask) {
        Optional<TasksEntity> parent = tasksRepository.findById(newTask.getParentId());
        Optional<UsersEntity> user = usersRepository.findById(newTask.getUserId());

        if (user.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }

        TasksEntity task = new TasksEntity();
        task.setTitle(newTask.getTitle());
        task.setDescription(newTask.getDescription());
        task.setEndDate(newTask.getFinalDate());
        task.setUserId(user.get());
        task.setParentId(parent.get());
        task.setPosition(newTask.getPosition());
        task.setDone(false);
        task.setFavorite(false);
        task.setDisabled(false);

        TasksEntity savedTask = tasksRepository.save(task);

        return ResponseEntity.ok(Converter.toDTOTaskPreview(savedTask));
    }

    public ResponseEntity<DTOUpdateTask> updateTask(DTOUpdateTask updateTask){

        return ResponseEntity.ok(new DTOUpdateTask());
    }
}
