package shcool.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shcool.mindera.toDoListAPI.entities.compositePrimaryKeys.TaskTagId;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "task_tags")
@IdClass(TaskTagId.class)
public class TaskTagsEntity {
    @Id
//    @ManyToOne
//    @JoinColumn(name = "taskTagsOfTasks")
    private Integer taskId;
    @Id
//    @ManyToOne
//    @JoinColumn(name = "taskTagsOfUsers")
    private Integer tagId;
}
