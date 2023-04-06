package school.mindera.toDoListAPI.service;


import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TaskTagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.comments.CommentNotFoundException;
import school.mindera.toDoListAPI.exceptions.tags.TagAlreadyInUseException;
import school.mindera.toDoListAPI.exceptions.tags.TagNotFoundException;
import school.mindera.toDoListAPI.exceptions.tasks.TaskNotFoundException;
import school.mindera.toDoListAPI.exceptions.user.InvalidUserException;
import school.mindera.toDoListAPI.model.Converter;
import school.mindera.toDoListAPI.model.DTONewTag;
import school.mindera.toDoListAPI.model.DTOTag;
import school.mindera.toDoListAPI.repositories.TagsRepository;
import school.mindera.toDoListAPI.repositories.TaskTagsRepository;
import school.mindera.toDoListAPI.repositories.TasksRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.*;

@Service
public class TagService {
    private final TagsRepository tagsRepository;
    private final UsersRepository usersRepository;
    private final TasksRepository tasksRepository;
    private final TaskTagsRepository taskTagsRepository;

    public TagService(TagsRepository tagsRepository, UsersRepository usersRepository, TasksRepository tasksRepository, TaskTagsRepository taskTagsRepository) {
        this.tagsRepository = tagsRepository;
        this.usersRepository = usersRepository;
        this.tasksRepository = tasksRepository;
        this.taskTagsRepository = taskTagsRepository;
    }

    public ResponseEntity<List<DTOTag>> createTag(List<DTONewTag> newTag) {
        checkToAssociateTags(newTag);

        List<DTONewTag> toCreate = new ArrayList<>();
        List<TagsEntity> toSaveTags = new ArrayList<>();
        Optional<TasksEntity> task = tasksRepository.findById(newTag.get(0).getTaskId());

        if (task.isEmpty()) {
            throw new TagNotFoundException("Invalid task on create Tag");
        }

        newTag.forEach((e) -> {
            Optional<UsersEntity> user = usersRepository.findById(e.getUserId());
            Optional<TagsEntity> verifierTag = tagsRepository.findByNameAndUserId(e.getName(), e.getUserId());

            if (user.isEmpty()) {
                throw new TagNotFoundException("Invalid User on create Tag");
            }
            if (verifierTag.isEmpty()) {
                toCreate.add(e);
                return;
            }

            TagsEntity tag = verifierTag.get();

            toSaveTags.add(tag);
        });

        toSaveTags.addAll(createNewTags(toCreate));
        associateTasks(task.get(), toSaveTags);
        List<DTOTag> savedTags = Converter.toDTOTags(toSaveTags);

        return ResponseEntity.ok(savedTags);
    }

    public List<TagsEntity> createNewTags(List<DTONewTag> tags) {
        List<TagsEntity> tagsToAdd = new ArrayList<>();

        tags.forEach((e) -> {
            Optional<UsersEntity> user = usersRepository.findById(e.getUserId());

            if (user.isEmpty()) {
                throw new InvalidUserException("User is not Valid on Tag - " + e.getName());
            }

            TagsEntity newTag = new TagsEntity();
            newTag.setName(e.getName());
            newTag.setColor(e.getColor());
            newTag.setUserId(user.get());

            tagsToAdd.add(newTag);
        });

        tagsRepository.saveAll(tagsToAdd);
        return tagsToAdd;
    }

    public void checkToAssociateTags(List<DTONewTag> tags) {
        Set<String> set = new HashSet<>();
        tags.forEach((tag) -> {
            if (!set.add(tag.getName())) {
                throw new TagAlreadyInUseException("Cannot add similar or duplicate tags. Tag name: " + tag.getName());
            }
        });
    }

    public void associateTasks(TasksEntity task, List<TagsEntity> tags) {
        List<TaskTagsEntity> savedTaskTags = new ArrayList<>();

        for (int i = 0; i < tags.size(); i++) {
            TaskTagsEntity taskTags = new TaskTagsEntity();
            taskTags.setTask(task);
            taskTags.setTag(tags.get(i));

            if (taskTagsRepository.exists(Example.of(taskTags))) {
                throw new TagAlreadyInUseException("This tag is already associated on this task");
            }

            savedTaskTags.add(taskTags);
        }

        taskTagsRepository.saveAll(savedTaskTags);
    }

    public ResponseEntity<List<DTOTag>> getUserTags(Integer userId) {
        if (!usersRepository.existsById(userId)) {
            throw new TagNotFoundException("Invalid user");
        }

        List<TagsEntity> temp = tagsRepository.findTagsByUserId(userId);

        List<DTOTag> tags = new ArrayList<>();
        temp.forEach(e -> tags.add(new DTOTag(e.getTagId(), e.getName(), e.getColor())));

        return ResponseEntity.ok(tags);
    }

    public ResponseEntity<List<DTOTag>> getTaskTags(Integer taskId) {

        Optional<TasksEntity> task = tasksRepository.findById(taskId);
        if (task.isEmpty()) {
            throw new TagNotFoundException("Invalid task");
        }
        List<TagsEntity> tagsE = task.get().getTags();
        List<DTOTag> tags = new ArrayList<>();
        tagsE.forEach(e -> tags.add(new DTOTag(e.getTagId(), e.getName(), e.getColor())));
        return ResponseEntity.ok(tags);
    }

    public void removeTag(Integer taskId, Integer tagId) {
        taskTagsRepository.deleteByTaskAndTagId(taskId, tagId);
    }

    public ResponseEntity<List<DTOTag>> updateTags(Integer taskId, List<DTONewTag> tagsToUpdate) {
        Optional<TasksEntity> task = tasksRepository.findById(taskId);

        if (task.isEmpty()) {
            throw new TagNotFoundException("Task is not valid");
        }

        List<TagsEntity> taskTags = task.get().getTags();

        if (tagsToUpdate.isEmpty()) {
            taskTags.forEach((e) -> taskTagsRepository.deleteByTaskAndTagId(taskId, e.getTagId()));
            return ResponseEntity.ok(new ArrayList<>());
        }

        checkToAssociateTags(tagsToUpdate);

        List<DTONewTag> toCreate = new ArrayList<>();
        List<TagsEntity> toKeep = new ArrayList<>();
        List<Integer> toDelete = new ArrayList<>();

        List<TagsEntity> updatedTags = new ArrayList<>();

        tagsToUpdate.forEach((e) -> {
            DTONewTag tagDTO = new DTONewTag(e.getName(), e.getColor(), e.getUserId(), taskId);
            boolean found = false;

            for (TagsEntity taskTag : taskTags) {
                if (e.getName().equalsIgnoreCase(taskTag.getName())) {
                    toKeep.add(taskTag);
                    found = true;
                    break;
                }
            }
            if (!found) {
                toCreate.add(tagDTO);
            }
        });

        taskTags.forEach((e) -> {
            boolean found = false;
            for (DTONewTag newTag : tagsToUpdate) {
                if (newTag.getName().equalsIgnoreCase(e.getName())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                toDelete.add(e.getTagId());
            }
        });

        toDelete.forEach((e) -> taskTagsRepository.deleteByTaskAndTagId(taskId, e));
        List<TagsEntity> createdNewTags = createNewTags(toCreate);
        associateTasks(task.get(), createdNewTags);
        updatedTags.addAll(toKeep);
        updatedTags.addAll(createdNewTags);

        List<DTOTag> savedTags = Converter.toDTOTags(updatedTags);
        return ResponseEntity.ok(savedTags);
    }

}
