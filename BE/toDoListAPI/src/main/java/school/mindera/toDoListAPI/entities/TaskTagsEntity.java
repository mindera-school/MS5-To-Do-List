package school.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import school.mindera.toDoListAPI.entities.compositePrimaryKeys.TaskTagId;
import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "task_tags")
public class TaskTagsEntity {

    @EmbeddedId
    private TaskTagId id;

    @ManyToOne
    @MapsId("taskId")
    @JoinColumn(name = "task_id")
    private TasksEntity task;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id")
    private TagsEntity tag;
}
