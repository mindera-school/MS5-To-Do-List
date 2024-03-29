package school.mindera.toDoListAPI.entities.compositePrimaryKeys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class TaskTagId implements Serializable {

    @Column(name = "taskId")
    private Integer taskId;

    @Column(name = "tagId")
    private Integer tagId;

}
