package school.mindera.toDoListAPI.service;

import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.InvalidTaskException;
import school.mindera.toDoListAPI.exceptions.user.InvalidUserException;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.repositories.TasksRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
        Optional<UsersEntity> user = usersRepository.findById(newTask.getUserId());
        Optional<TasksEntity> parent = Optional.ofNullable(null);

        SimpleDateFormat formatData = new SimpleDateFormat("dd/MM/yyyy");
        Date date;
        if(!isNull(newTask.getDate())) {
            try {
                date = formatData.parse(newTask.getDate());
            } catch (Exception e) {
                throw new InvalidTaskException("Date is not valid");
            }
        }else{
            date = null;
        }

        if (!isNull(newTask.getParentId())) {
            parent = tasksRepository.findById(newTask.getParentId());
        }
        if (user.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }
        if (!isNull(newTask.getParentId()) && parent.isEmpty()) {
            throw new InvalidTaskException("invalid task");
        }

        TasksEntity task = new TasksEntity();
        task.setTitle(newTask.getTitle());
        task.setDescription(newTask.getDescription());

        task.setEndDate(date);
        task.setUserId(user.get());
        task.setParentId(parent.isEmpty() ? null : parent.get());
        task.setPosition(newTask.getPosition());
        task.setDone(false);
        task.setFavorite(false);
        task.setDisabled(false);

        TasksEntity savedTask = tasksRepository.save(task);

        return ResponseEntity.ok(Converter.toDTOTaskPreview(savedTask));
    }

    public ResponseEntity<DTOUpdateTask> updateTask(Integer taskId, DTOUpdateTask updateTask) {
        Optional<TasksEntity> task = tasksRepository.findById(taskId);

        if (task.isEmpty()) {
            throw new InvalidTaskException("Invalid Task");
        }

        TasksEntity updatedTask = setTaskUpdate(task.get(), updateTask);

        tasksRepository.save(updatedTask);

        return ResponseEntity.ok(Converter.toDTOUpdateTask(updatedTask));
    }

    public ResponseEntity<List<DTOUpdatePosition>> updatePosition(Integer userId, List<DTOUpdatePosition> updateTasks) {
        List<TasksEntity> updatedTasks = new ArrayList<>();

        updateTasks.forEach((task) -> {
            Optional<TasksEntity> dataBaseTask = tasksRepository.findById(task.getTaskId());

            if(dataBaseTask.get().getUserId().getUserId() != userId){
                throw new InvalidTaskException("Not Valid User");
            }

            if(dataBaseTask.isEmpty()){
                throw new InvalidTaskException("Not Valid Task");
            }

            TasksEntity updatedTask = setTaskPosition(dataBaseTask.get(), task);

            updatedTasks.add(updatedTask);
        });

        tasksRepository.saveAll(updatedTasks);

        List<DTOUpdatePosition> updatedTasksDTOs = updatedTasks.stream()
                .map(Converter::toDTOUpdatePosition)
                .toList();

        return ResponseEntity.ok(updatedTasksDTOs);
    }

    private TasksEntity setTaskUpdate(TasksEntity task, DTOUpdateTask updateTask){
        SimpleDateFormat formatData = new SimpleDateFormat("dd/MM/yyyy");
        Date date;
        try {
            date = formatData.parse(updateTask.getDate());
        } catch (Exception e) {
            throw new InvalidTaskException("Date is not valid");
        }

        task.setTitle(updateTask.getTitle());
        task.setDescription(updateTask.getDescription());
        task.setDone(updateTask.getIsDone());
        task.setEndDate(date);
        task.setFavorite(updateTask.getIsFavorite());
        task.setDisabled(updateTask.getDisabled());

        return task;
    }

    private TasksEntity setTaskPosition(TasksEntity task, DTOUpdatePosition updateTask){
        if(!isNull(updateTask.getParentId())) {
            Optional<TasksEntity> parent = tasksRepository.findById(updateTask.getParentId());
            if (parent.isEmpty()) {
                throw new InvalidTaskException("Parent is not valid");
            }
            task.setParentId(parent.get());
        }else {
            task.setParentId(null);
        }
        task.setPosition(updateTask.getPosition());

        return task;
    }
}
