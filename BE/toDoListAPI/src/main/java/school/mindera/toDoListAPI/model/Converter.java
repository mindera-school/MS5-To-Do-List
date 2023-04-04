package school.mindera.toDoListAPI.model;

import school.mindera.toDoListAPI.entities.CommentsEntity;
import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.util.Objects.isNull;

public class Converter {
    public static DTOTaskPreview toDTOTaskPreview(TasksEntity task){
        Integer parentId = null;

        if (task.getParentId() !=  null){
            parentId = task.getParentId().getTaskId();
        }

        DTOTaskPreview preview = new DTOTaskPreview();
        preview.setTaskId(task.getTaskId());
        preview.setTitle(task.getTitle());

        SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
        preview.setDate(formatDate.format(task.getEndDate()));
        preview.setIsDone(task.isDone());
        preview.setIsFavorite(task.isFavorite());
        preview.setPosition(task.getPosition());
        preview.setParentId(parentId);
        preview.setTags(toDTOTagList(task.getTags()));
        preview.setTaskURL("http://localhost:8086/todo/tasks/" + task.getTaskId());

        return preview;
    }

    public static DTOTaskDetails toDTOTaskDetails(TasksEntity task){
        Integer parentId = null;

        if (task.getParentId() !=  null){
            parentId = task.getParentId().getTaskId();
        }

        DTOTaskDetails taskDetails = new DTOTaskDetails();
        taskDetails.setTaskId(task.getTaskId());
        taskDetails.setTitle(task.getTitle());
        taskDetails.setDate(task.getEndDate());
        taskDetails.setIsDone(task.isDone());
        taskDetails.setIsFavorite(task.isFavorite());
        taskDetails.setPosition(task.getPosition());
        taskDetails.setParentId(parentId);
        taskDetails.setExpired(task.getEndDate().after(new Date()));
        taskDetails.setTags(toDTOTagList(task.getTags()));
        taskDetails.setDescription(task.getDescription());
        taskDetails.setCommentsURL("http://localhost:8086/todo/comments/" + task.getTaskId());

        return taskDetails;
    }

    public static DTOUpdateTask toDTOUpdateTask(TasksEntity task){
        DTOUpdateTask taskDTO = new DTOUpdateTask();

        taskDTO.setTitle(task.getTitle());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setIsDone(task.isDone());

        SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
        taskDTO.setDate(formatDate.format(task.getEndDate()));
        taskDTO.setIsFavorite(task.isFavorite());
        taskDTO.setDisabled(task.isDisabled());

        return taskDTO;
    }

    public static DTOUpdatePosition toDTOUpdatePosition(TasksEntity task){
        DTOUpdatePosition taskDTO = new DTOUpdatePosition();

        taskDTO.setTaskId(task.getTaskId());
        taskDTO.setPosition(task.getPosition());
        taskDTO.setParentId((isNull(task.getParentId()) ? null : task.getParentId().getTaskId()));

        return taskDTO;
    }

    public static List<DTOTag> toDTOTagList(List<TagsEntity> tagsEntities){
        if (tagsEntities == null){
            return new ArrayList<>();
        }

        List<DTOTag> tags = new ArrayList<>();
        tagsEntities.forEach(e-> new DTOTag(e.getTagId(),e.getName(),e.getColor()));
        return tags;
    }

    public static DTOComment toDTOComment(CommentsEntity commentEntity){
        DTOComment comment = new DTOComment();
        comment.setCommentId(commentEntity.getCommentId());
        comment.setDescription(commentEntity.getDescription());
        comment.setTaskId(commentEntity.getTaskId().getTaskId());

        return comment;
    }
}
