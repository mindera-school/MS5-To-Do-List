package school.mindera.toDoListAPI.model;

import school.mindera.toDoListAPI.entities.TagsEntity;
import school.mindera.toDoListAPI.entities.TasksEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Converter {
    public static DTOTaskPreview toDTOTaskPreview(TasksEntity task){
        Integer parentId = null;

        if (task.getParentId() !=  null){
            parentId = task.getParentId().getTaskId();
        }
        DTOTaskPreview preview = new DTOTaskPreview();
        preview.setTaskId(task.getTaskId());
        preview.setTitle(task.getTitle());
        preview.setDate(task.getEndDate().toString());
        preview.setIsDone(task.isDone());
        preview.setIsFavorite(task.isFavorite());
        preview.setPosition(task.getPosition());
        preview.setParentId(parentId);
        preview.setExpired(task.getEndDate().after(new Date()));
        preview.setTags(toDTOTagList(task.getTags()));
        preview.setTaskURL("http://localhost:8086/todo/tasks/" + task.getTaskId());

        return preview;
    }

    public static List<DTOTag> toDTOTagList(List<TagsEntity> tagsEntities){
        if (tagsEntities == null){
            return new ArrayList<>();
        }

        List<DTOTag> tags = new ArrayList<>();
        tagsEntities.forEach(e-> new DTOTag(e.getTagId(),e.getName(),e.getColor()));
        return tags;
    }
}
