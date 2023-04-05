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
import school.mindera.toDoListAPI.exceptions.tags.TagNotFoundException;
import school.mindera.toDoListAPI.model.DTONewTag;
import school.mindera.toDoListAPI.model.DTOTag;
import school.mindera.toDoListAPI.repositories.TagsRepository;
import school.mindera.toDoListAPI.repositories.TaskTagsRepository;
import school.mindera.toDoListAPI.repositories.TasksRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public ResponseEntity<DTOTag> createTag(DTONewTag newTag){
        Optional<UsersEntity> user = usersRepository.findById(newTag.getUserId());
        Optional<TagsEntity> verifierTag = tagsRepository.findByNameAndUserId(newTag.getName(), newTag.getUserId());
        Optional<TasksEntity> task = tasksRepository.findById(newTag.getTaskId());

        if (task.isEmpty()){
            throw new TagNotFoundException("Invalid task on create");
        }
        if (verifierTag.isPresent()){
            associateTask(task.get(),verifierTag.get());
            return ResponseEntity.ok(new DTOTag(verifierTag.get().getTagId(),verifierTag.get().getName(),verifierTag.get().getColor()));
        }
        if(user.isEmpty()){
            throw new TagNotFoundException("Invalid User on create");
        }

        TagsEntity tag = new TagsEntity();
        tag.setName(newTag.getName());
        tag.setColor(newTag.getColor());
        tag.setUserId(user.get());
        tag.setTags(taskTagsRepository.findAll());

        TagsEntity savedTag = tagsRepository.save(tag);

        associateTask(task.get() ,savedTag);

        return ResponseEntity.ok(new DTOTag(savedTag.getTagId(), savedTag.getName(), savedTag.getColor()));
    }

    public void associateTask(TasksEntity task, TagsEntity tag){

        TaskTagsEntity taskTags = new TaskTagsEntity();
        taskTags.setTask(task);
        taskTags.setTag(tag);

        if(taskTagsRepository.exists(Example.of(taskTags))){
            throw new RuntimeException();
        }

        taskTagsRepository.save(taskTags);
    }

    public ResponseEntity<List<DTOTag>> getUserTags(Integer userId){
        if (!usersRepository.existsById(userId)){
            throw new TagNotFoundException("Invalid user");
        }

        List<TagsEntity> temp = tagsRepository.findTagsByUserId(userId);

        List<DTOTag> tags = new ArrayList<>();
        temp.forEach(e  -> tags.add(new DTOTag(e.getTagId(),e.getName(),e.getColor())));

        return ResponseEntity.ok(tags);
    }

    public ResponseEntity<List<DTOTag>> getTaskTags(Integer taskId){

       Optional<TasksEntity> task = tasksRepository.findById(taskId);
       if (task.isEmpty()){
           throw new TagNotFoundException("Invalid task");
       }
       List<TagsEntity> tagsE = task.get().getTags();
       List<DTOTag> tags = new ArrayList<>();
       tagsE.forEach(e-> tags.add(new DTOTag(e.getTagId(),e.getName(),e.getColor())));
       return ResponseEntity.ok(tags);
    }

    public void removeTag(Integer taskId, Integer tagId){
        taskTagsRepository.deleteByTaskAndTagId(taskId,tagId);
    }
}
