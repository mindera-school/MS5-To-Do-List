package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DTOUpdateTask {
    private Integer taskId;
    private String description;
    private Integer parentId;
    private Integer position;
    private String title;
    private Boolean isDone;
    private String date;
    private Boolean expired;
    private Boolean isFavorite;
}
