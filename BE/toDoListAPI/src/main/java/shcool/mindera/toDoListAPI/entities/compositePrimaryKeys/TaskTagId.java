package shcool.mindera.toDoListAPI.entities.compositePrimaryKeys;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
public class TaskTagId implements Serializable {
    private Integer taskId;
    private Integer tagId;

    public boolean equals(TaskTagId taskTagId){
        return (Objects.equals(this.taskId, taskTagId.taskId)) && (Objects.equals(this.tagId, taskTagId.tagId));
    }
}
